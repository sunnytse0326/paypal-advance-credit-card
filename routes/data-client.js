var express = require('express');
var http = require('https');
const request = require('request');
var router = express.Router();

var PAYPAL_CLIENT = 'ASKhDJR9NDAzcijJBPpPd3_5Q1xjrZxIaOblcizwvLu862d1MS9rzcyelzS3tOrod7kg1h4DbmAedzhr';
var PAYPAL_SECRET = 'ECd4O4V1d5ujDMEeTWiPjYAabJQaFLiMQTPG7mAlzZPkmlvC_3qGRJPkaeNWTukfgZjoglU-uJ9IgKpl';

var PAYPAL_SANDBOX = 'https://api.sandbox.paypal.com';

var PAYPAL_OAUTH_API = `${PAYPAL_SANDBOX}/v1/oauth2/token/`;
var PAYPAL_CLIENT_DATA = `${PAYPAL_SANDBOX}/v1/identity/generate-token`;

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

    getClientData(ac_token)
    .then((client_data_id) => {
        return response.send({client_token: client_data_id})
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

module.exports = router;
