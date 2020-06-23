var express = require('express');
var http = require('https');
const request = require('request');
var router = express.Router();

var PAYPAL_CLIENT = 'ASKhDJR9NDAzcijJBPpPd3_5Q1xjrZxIaOblcizwvLu862d1MS9rzcyelzS3tOrod7kg1h4DbmAedzhr';
var PAYPAL_SECRET = 'ECd4O4V1d5ujDMEeTWiPjYAabJQaFLiMQTPG7mAlzZPkmlvC_3qGRJPkaeNWTukfgZjoglU-uJ9IgKpl';

var PAYPAL_SANDBOX = 'https://api.sandbox.paypal.com';

var PAYPAL_OAUTH_API = `${PAYPAL_SANDBOX}/v1/oauth2/token/`;
var PAYPAL_CLIENT_DATA = `${PAYPAL_SANDBOX}/v1/identity/generate-token`;
var PAYPAL_ORDER_API = `${PAYPAL_SANDBOX}/v2/checkout/orders/`;

router.post('/', function(req, response, next) {
  request({
    method: 'POST',
    uri: PAYPAL_OAUTH_API,
    headers: [
      {
        name: 'content-type',
        value: 'application/json'
      }
    ],
    auth: {
      user: PAYPAL_CLIENT,
      password: PAYPAL_SECRET
    },
    form: { grant_type : 'client_credentials'}
  }, function (error, res, body) {

    var result_json = JSON.parse(body)

    var ac_token = result_json.access_token;

    var client_data;

    getClientData(ac_token)
    .then((client_data_id) => {
        client_data = client_data_id;
        return createOrder(ac_token)
    }).then((order_data) =>{
        return response.send({client_token: client_data, order_id: order_data})
    });
  })
});

const getClientData = (access_token) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: PAYPAL_CLIENT_DATA,
            headers: [
                {
                  name: 'content-type',
                  value: 'application/json'
                }
            ], 
            auth: { bearer: access_token },
            body: {
                customer_id: "testttt"
            },
            json: true
          }, function (error, res, data) {
              if(!error){
                return resolve(data.client_token);
              } else{
                return reject(Error("Failed to retrieve client data."));
              }
          })
    });
}

const createOrder = (access_token) => {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: PAYPAL_ORDER_API,
            headers: [
                {
                  name: 'content-type',
                  value: 'application/json'
                }
            ], 
            auth: { bearer: access_token },
            body: {
                intent: "CAPTURE",
                payer: {
                    name: {
                        given_name: "Tse",
                        surname: "Sunny"
                    },
                    address: {
                        address_line_1: '123 ABC Street',
                        address_line_2: 'Apt 2',
                        admin_area_2: 'San Jose',
                        admin_area_1: 'CA',
                        postal_code: '95131',
                        country_code: 'US'
                    },
                    email_address: "customer@domain.com",
                    phone: {
                        phone_type: "MOBILE",
                        phone_number: {
                            national_number: "11231242343"
                        }
                    }
                },
                purchase_units: [
                    {
                        amount: {
                            value: '12.34',
                            currency_code: 'USD'
                        },
                        shipping: {
                            name: {
                                full_name: 'Sunny Tse'
                            },
                            address: {
                                address_line_1: '2211 N First Street',
                                address_line_2: 'Building 17',
                                admin_area_2: 'San Jose',
                                admin_area_1: 'CA',
                                postal_code: '95131',
                                country_code: 'US'
                            }
                        },
                    }
                ]
            },
            json: true
          }, function (error, res, data) {
              if(!error){
                return resolve(data.id);
              } else{
                return reject(Error("Failed to retrieve client data."));
              }
          })
    });
}

module.exports = router;
