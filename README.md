# Sails Hook Payu

The hook allows communication with the API of the Polish Payu payment processor.

## Getting Started
Install it via npm:
```bash
npm install sails-hook-payu --save
```
Configure `config/payu.js` in your project:
```javascript
module.exports.payu = {
    clientId: '',
    clientSecret: '',
    posId: '',
    key: '',
    environment: 'production', // or test
    shopId: '',
    payuWhitelistProduction: [
        '185.68.12.10',
        '185.68.12.11',
        '185.68.12.12',
        '185.68.12.26',
        '185.68.12.27',
        '185.68.12.28',
    ],
    payuWhitelistTest: [
        '185.68.14.10',
        '185.68.14.11',
        '185.68.14.12',
        '185.68.14.26',
        '185.68.14.27',
        '185.68.14.28',
    ],
};
```
Use the built-in method:
```javascript
sails.hooks.payu.<method>()
```
## Available methods
- getShopData()
- getOrder(orderId)
- getOrderTransactions(orderId)
- createOrder(order)
- cancelOrder(orderId)
- refundOrder(orderId, amount, description)
    - amount(optional): empty means full refund
    - description(optional)
- verifyNotification(json, headers)

## License

[MIT](./LICENSE)
