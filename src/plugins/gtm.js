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
                this.logEvent('purchase', {
                    ecommerce: {
                        transaction_id: orderInfo.orderNumber,
                        value: orderInfo.totalAmount,
                        currency: 'KRW',
                        items: orderInfo.items.map(item => ({
                            item_id: item.id,
                            item_name: item.name,
                            price: item.price * item.quantity,
                            quantity: item.quantity
                        }))
                    }
                })
            }
        }
    }
}