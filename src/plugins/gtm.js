export default {
    install(app) {
        window.dataLayer = window.dataLayer || [];

        // GTM 이벤트 푸시 헬퍼 함수
        const gtm = {
            logEvent(event, data = {}) {
                window.dataLayer.push({
                    event,
                    ...data
                });
            },

            // 페이지뷰 이벤트
            logPageView(pageTitle, pagePath) {
                this.logEvent('virtualPageView', {
                    pageTitle,
                    pagePath
                });
            },

            // 상품 조회 이벤트
            logProductView(product) {
                this.logEvent('virtualProductView', {
                    ecommerce: {
                        detail: {
                            products: [{
                                name: product.name,
                                id: product.id,
                                price: product.price,
                                category: product.category,
                            }]
                        }
                    }
                });
            },

            // 장바구니 담기 이벤트
            logAddToCart(product, quantity = 1) {
                this.logEvent('addToCart', {
                    ecommerce: {
                        add: {
                            products: [{
                                name: product.name,
                                id: product.id,
                                price: product.price,
                                category: product.category,
                                quantity: quantity
                            }]
                        }
                    }
                });
            },

            // 체크아웃 시작 이벤트
            logBeginCheckout(cart) {
                this.logEvent('beginCheckout', {
                    ecommerce: {
                        checkout: {
                            products: cart.map(item => ({
                                name: item.product.name,
                                id: item.product.id,
                                price: item.product.price,
                                category: item.product.category,
                                quantity: item.quantity
                            }))
                        }
                    }
                });
            }
        }

        app.config.globalProperties.$gtm = gtm;
    }
}