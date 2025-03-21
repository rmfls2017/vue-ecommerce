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

            /**
             * logSignup 회원가입을 하는 사용자를 추적하기 위한 함수
             *
             * @param page 현재 사용자가 보고있는 page 의 정보, title 과 location 정보 필요
             * @param step 각 단계 별 사용자가 진입한 단계
             * @param method 회원가입 완료 시 어느 출처를 통해 가입됐는지 알기위함 (ex. google, facebook, kakao,,,)
             *
             * Signup-1: 회원가입 버튼을 눌러 모달이 바껴 회원가입 모달이 노출되는 경우
             * Signup-2: 일반회원가입 클릭을 누르는 경우
             * Signup-3: 간편가입 클릭을 누르는 경우
             * Signup Complete (last): 회원가입이 완료된 경우
             */
            logSignup(page, step, method) {
                this.logPageView(page)

                // 마지막 단계가 아닌 경우에는 일반 커스텀 이벤트 발생
                if (step !== 'last') {
                    this.logEvent(`Signup-${step}`)
                    return
                }

                // 커스텀 회원가입 이벤트 내용
                this.logEvent(`Signup Complete`)

                // 실제 GA 에서 수집되는 회원가입 이벤트 내용
                this.logEvent(`sign_up`, {
                    method: method
                })
            },

            /**
             * logSelling 팔아요 상품을 보는 사용자를 추적하기 위한 함수
             *
             * @param page 현재 사용자가 보고있는 page 의 정보, title 과 location 정보 필요
             * @param step 각 단계 별 사용자가 진입한 단계
             * @param orderInfo 주문 완료 단계에서 주문한 상품들의 정보를 알기위함
             *
             * Sell-1: 팔아요 상품 클릭 시
             * Sell-2: 주문하기 버튼 클릭 시
             * Sell-3: 배송지 입력 화면 진입 시
             * Sell-4: 결제하기 버튼 클릭 시
             * Sell Complete (last): 주문완료페이지 진입 시
             */
            logSelling(page, step, orderInfo) {
                this.logPageView(page)

                // 마지막 단계가 아닌 경우에는 일반 커스텀 이벤트 발생
                if (step !== 'last') {
                    this.logEvent(`Sell-${step}`)
                    return
                }

                const data = {
                    ecommerce: {
                        transaction_id: orderInfo.orderNumber,
                        value: orderInfo.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0),
                        currency: orderInfo.currency,
                        shipping: orderInfo.shippingPrice, // 주문 배송비
                        items: orderInfo.items.map(item => ({
                            item_id: item.id,
                            item_name: item.name,
                            price: item.unitPrice,
                            quantity: item.quantity,
                        }))
                    }
                }

                // 커스텀 주문완료 이벤트 내용
                this.logEvent(`Sell Complete`, ...data)

                // 실제 GA 에서 수집되는 이벤트 내용
                this.logEvent(`purchase`, ...data)
            },

            /**
             * logBuying 사줘요 상품을 보는 사용자를 추적하기 위한 함수
             *
             * @param page 현재 사용자가 보고있는 page 의 정보, title 과 location 정보 필요
             * @param step 각 단계 별 사용자가 진입한 단계
             * @param orderInfo 주문 완료 단계에서 주문한 상품들의 정보를 알기위함
             *
             * Buy-1: 사줘요 상품 클릭 시
             * Buy-2: 견적장성 클릭 시
             * Buy-3: 국가선택 화면 진입 시
             * Buy-4: 견적내용 작성 화면 진입 시
             * Buy-5: 결제하기 클릭 시
             * Buy Complete (last): 주문완료페이지 진입 시
             */
            logBuying(page, step, orderInfo) {
                this.logPageView(page)

                // 마지막 단계가 아닌 경우에는 일반 커스텀 이벤트 발생
                if (step !== 'last') {
                    this.logEvent(`Buy-${step}`)
                    return
                }

                const data = {
                    ecommerce: {
                        transaction_id: orderInfo.orderNumber,
                        value: orderInfo.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0),
                        currency: orderInfo.currency,
                        shipping: orderInfo.shippingPrice, // 주문 배송비
                        items: orderInfo.items.map(item => ({
                            item_id: item.id,
                            item_name: item.name,
                            price: item.unitPrice,
                            quantity: item.quantity,
                        }))
                    }
                }

                // 커스텀 주문완료 이벤트 내용
                this.logEvent(`Buy Complete`, ...data)

                // 실제 GA 에서 수집되는 이벤트 내용
                this.logEvent(`purchase`, ...data)
            },

            /**
             * logWanted 사용자가 사줘요를 요청할 때 작성되는 내용을 추적하기 위한 함수
             *
             * @param page 현재 사용자가 보고있는 page 의 정보, title 과 location 정보 필요
             * @param step 각 단계 별 사용자가 진입한 단계
             * @param wantedInfo 작성 완료 단계에서 작성한 정보를 알기 위한 데이터 (카테고리, 요청내용, 국가..)
             *
             * Wanted-1: 사줘요작성 버튼클릭
             * Wanted-2: 사줘요 요청 진입
             * Wanted-3: 요청내용 작성 진입
             * Wanted-4: 배송도착 국가 선택 진입
             * Wanted-5: 추가참고사진 업로드 진입
             * Wanted-6: 요청기간 설정 진입
             * Wanted Complete: 완료
             */
            logWanted(page, step, wantedInfo) {
                this.logPageView(page)

                if (step !== 'last') {
                    this.logEvent(`Wanted-${step}`)
                    return
                }

                const data = {
                    title: wantedInfo.title, // 상품명
                    description: wantedInfo.description, // 상품 설명
                    destination: wantedInfo.destination, // 배달 국가
                    category: wantedInfo.category, // 카테고리
                    duration: wantedInfo.duration, // 배송기간
                    referrer_url: wantedInfo.referrerURL, // 상품 구매 URL
                }

                this.logEvent(`Wanted Complete`, ...data)
            },

            /**
             * logUpload 사용자가 팔아요를 요청할 떄 작성되는 내용을 추적하기 위한 함수
             *
             * @param page 현재 사용자가 보고있는 page 의 정보, title 과 location 정보 필요
             * @param step 각 단계 별 사용자가 진입한 단계
             * @param uploadInfo 완료 단계에서 작성한 정보를 알기 위한 데이터
             *
             * Upload-1: 팔아요 등록버튼 클릭
             * Upload-2: 국가선택 진입
             * Upload-3: 브랜드/상품명 입력 진입
             * Upload-4: 상품제목 입력 진입
             * Upload-5: 상품사진 입력 진입
             * Upload-6: 상품 제안가 입력 진입
             * Upload Complete: 완료
             */
            logUpload(page, step, uploadInfo) {
                this.logPageView(page)

                if (step !== 'last') {
                    this.logEvent(`Upload-${step}`)
                    return
                }

                const data = {
                    departure: uploadInfo.departure,
                    category: uploadInfo.category,
                    product: {
                        name: uploadInfo.product.name,
                        brand: uploadInfo.product.brand,
                        category: uploadInfo.product.category,
                        type: uploadInfo.product.type,
                        display_name: uploadInfo.product.displayName, // 노출 상품명
                        description: uploadInfo.product.description,
                        tags: uploadInfo.product.tags, // 상품에서 검색될 태그명 (혹은, 유사한 데이터)
                        stock: uploadInfo.product.stock,
                        unit_price: uploadInfo.product.unitPrice,
                    }
                }

                this.logEvent(`Upload Complete`, ...data)
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