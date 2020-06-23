# PayPal Advance Credit Card Payments

:point_right: [English](README.md)
:point_right: [简体中文](readme/README-zh_cn.md)

Advance Card Solution helps to create a customized checkout experience by adding card fields that align with your brand. This repository demonstrates the example of how to implement the solution by PayPal latest [Restful API](https://developer.paypal.com/docs/api/overview/). You can also take the referene from this [guideline](docs/paypal-advance-card-payment-en).

## Integration 
Generally, it takes 4 steps to implement card payment solution:
1. Get the API credential from [Restful API](https://developer.paypal.com/docs/business/get-started/#exchange-your-api-credentials-for-an-access-token)
2. Retrieve the ```data_client_token``` from [Generate Token API](https://developer.paypal.com/docs/business/checkout/advanced-card-payments/#step-2-generate-a-client-token-for-your-buyer)
3. Add the card form to the checkout payment page
4. Capture the payment order from the server-side call by [Capture API](https://developer.paypal.com/docs/api/orders/v2/#orders_capture)

### Installation
```sh
> npm install
```

### Run
```sh
> npm start
```
 After the project is compiled, please access to [http://localhost:3000/ucc-form](http://localhost:3000/ucc-form) to try the example.


