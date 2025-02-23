export default {
    install(app) {
        window.dataLayer = window.dataLayer || [];

        // GTM 이벤트 푸시 헬퍼 함수
        app.config.globalProperties.$gtm = {
            logEvent(event, data = {}) {
                window.dataLayer.push({
                    event,
                    ...data
                });
            },

            // AnonymousComponent 를 트랙킹하기 위한 이벤트 추적 함수
            logPageView(page) {
                // 배송대행의 단계별 page 이름을 설정 요청, ex) [배송대행] - 1단계, [배송대행] - 2단계, [배송대행] - 3단계
                // component 가 mount 되는 시점에 해당 이벤트를 호출할 수 있을지 - 훗타운 개발팀 확인 요청
                this.logEvent('page_view', {
                    send_page_view: false,
                    page_title: page.title || document.title,
                    page_location: page.location || location.href,
                })
            },

            // 상품 조회 이벤트
            logProductView(product) {
                this.logEvent('view_item', {
                    ecommerce: {
                        items: [{
                            item_name: product.name,
                            item_id: product.id,
                            price: product.price,
                            item_category: product.category,
                        }]
                    }
                });
            },

            // 체크아웃
            logBeginCheckout(product) {
                this.logEvent('begin_checkout', {
                    ecommerce: {
                        items: [{
                            item_id: product.id,
                            item_name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            item_category: product.category || '',
                            item_category2: product.category2 || '',
                            item_category3: product.category3 || '',
                            item_category4: product.category4 || '',
                            item_category5: product.category5 || '',
                        }]
                    }
                });
            },

            // 구매완료
            logPurchase(orderInfo) {
                const gradePrice = orderInfo.gradePrice || 0 // 등급할인가격
                const couponPrice = orderInfo.couponPrice || 0 // 쿠폰할인가격 (상품쿠폰할인인 경우에만)
                const pointPrice = orderInfo.pointPrice || 0 // 포인트할인가격

                const totalDiscount = gradePrice + couponPrice + pointPrice; // 할인금액의 총 합
                const totalOrderValue = orderInfo.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0); // 주문내역에 포함되어 있는 상품 가격과 수량의 총 합 (할인금액은 계산에서 제외)

                let items; // 주문 상품별 정보를 처리하기위해 미리 선언

                // 할인이 없는 경우 바로 기본 정보만 포함하여 처리
                if (totalDiscount === 0) {
                    items = orderInfo.items.map(item => ({
                        item_id: item.id,
                        item_name: item.name,
                        discount: 0,
                        price: item.unitPrice, // 주문 당시 상품 가격
                        quantity: item.quantity // 주문 당시 상품 갯수
                    }));
                } else {
                    items = orderInfo.items.map(item => {
                        const totalUnitPrice = item.unitPrice * item.quantity;
                        const ratio = totalUnitPrice / totalOrderValue;
                        const discount = Math.round(totalDiscount * ratio); // 주문의 전체 할인 금액별
                        const discountPerItem = Math.round(discount / item.quantity); //

                        return {
                            item_id: item.id,
                            item_name: item.name,
                            discount: discountPerItem,
                            price: item.unitPrice,
                            quantity: item.quantity,
                        }
                    })
                }

                this.logEvent('purchase', {
                    ecommerce: {
                        transaction_id: orderInfo.orderNumber,
                        value: totalOrderValue,
                        currency: 'KRW',
                        shipping: orderInfo.shippingPrice, // 주문 배송비
                        items: items
                    }
                })
            }
        }
    }
}