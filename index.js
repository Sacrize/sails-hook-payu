const Payu = require('nodejs-payu-sdk');

module.exports = function (sails) {

    let payu;
    let config;

    return {
        defaults: {
            __configKey__: {
                clientId: '',
                clientSecret: '',
                posId: '',
                key: '',
                environment: 'production',
                shopId: '',
                payuWhitelistTest: [
                    '185.68.14.10',
                    '185.68.14.11',
                    '185.68.14.12',
                    '185.68.14.26',
                    '185.68.14.27',
                    '185.68.14.28',
                ],
                payuWhitelistProduction: [
                    '185.68.12.10',
                    '185.68.12.11',
                    '185.68.12.12',
                    '185.68.12.26',
                    '185.68.12.27',
                    '185.68.12.28',
                ]
            }
        },
        initialize: function () {
            sails.log.info('Initializing hook (`sails-hook-payu`)');
            config = sails.config[this.configKey];
            _initPayu();
        },
        configure: function () {
          sails.config[this.configKey].payuWhitelist = sails.config[this.configKey].environment === 'test' ? sails.config[this.configKey].payuWhitelistTest : sails.config[this.configKey].payuWhitelistProduction;
        },
        routes: {
            before: {
                '/cb/payu': function (req, res, next) {
                    let headers = req.headers;
                    let whitelist = config.payuWhitelist;
                    if (!whitelist.includes(req.ip)) {
                        return;
                    }
                    if (_verifyNotification(req.body, headers)) {
                        sails.hooks.events.emit('payu-notification', { notification: req.body, });
                        sails.log.debug('Payu notification is valid', { body: req.body, });
                    } else {
                        sails.log.error(new Error('Payu notification is not valid'), { body: req.body, headers, });
                    }
                    res.ok();
                }
            }
        },
        getShopData: _getShopData,
        getOrder: _getOrder,
        getOrderTransactions: _getOrderTransactions,
        createOrder: _createOrder,
        cancelOrder: _cancelOrder,
        refundOrder: _refundOrder,
        verifyNotification: _verifyNotification,
    }

    function _initPayu() {
        payu = new Payu(config.clientId, config.clientSecret, config.posId, config.key, config.environment);
    }

    function _getShopData() {
        return payu.getShopData(config.shopId);
    }

    function _getOrder(orderId) {
        return payu.getOrder(orderId);
    }

    function _cancelOrder(orderId) {
        return payu.cancelOrder(orderId);
    }

    function _refundOrder(orderId, amount, description) {
        return payu.refundOrder(orderId, amount, description);
    }

    function _getOrderTransactions(orderId) {
        return payu.getOrderTransactions(orderId);
    }

    function _createOrder(order) {
        return payu.createOrder(order);
    }

    function _verifyNotification(json, headers) {
        return payu.verifyNotification(json, headers);
    }

}
