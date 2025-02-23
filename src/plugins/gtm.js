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
                // fixme: 배송대행의 단계별 page 이름을 설정, ex) [배송대행] - 1단계, [배송대행] - 2단계, [배송대행] - 3단계
                //   - component 가 mount 되는 시점에 해당 이벤트를 호출할 수 있을지?
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
                // fixme: 결제가 발생되는 시점에서 orderInfo 안에 속성값으로 ref 를 추가가능할지
                const prefixProductName = (orderInfo) => {
                    switch (orderInfo.ref) {
                        case 'buy':
                            return '[사줘요]';
                        case 'sell':
                            return '[팔아요]';
                        case 'delivery':
                            return '[배송대행]';
                        default:
                            return '';
                    }
                }

                this.logEvent('purchase', {
                    ecommerce: {
                        transaction_id: orderInfo.orderNumber,
                        value: orderInfo.items.reduce((acc, item) => acc += (item.unitPrice * item.quantity), 0),
                        currency: orderInfo.currency,
                        shipping: orderInfo.shippingPrice, // 주문 배송비
                        items: orderInfo.items.map(item => ({
                            item_id: item.id,
                            item_name: prefixProductName + item.name,
                            price: item.unitPrice,
                            quantity: item.quantity,
                        }))
                    }
                })
            }
        }
    }
}