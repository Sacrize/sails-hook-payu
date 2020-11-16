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
            }
        },
        initialize: function () {
            sails.log.info('Initializing hook (`sails-hook-payu`)');
            config = sails.config[this.configKey];
            _initPayu();
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
