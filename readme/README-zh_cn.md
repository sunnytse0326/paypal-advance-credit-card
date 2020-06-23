# PayPal 信用卡支付集成文档

[![npm version](https://badge.fury.io/js/avatar-bot-cli.svg)](https://badge.fury.io/js/paypal-acc-vault)
![build succeeded](https://img.shields.io/badge/build-succeeded-brightgreen.svg)
![Test passing](https://img.shields.io/badge/Tests-passing-brightgreen.svg)

:point_right: [English](README.md)<br>
:point_right: [简体中文](readme/README-zh_cn.md)

信用卡支付系统可以帮助商户建立一个自定义的购物车支付方法，去管理不同的支付品牌。这个例子会演示如何使用 PayPal 最新的[Restful API](https://developer.paypal.com/docs/api/overview/)。你也可以参考这份相关的文档[guideline](docs/paypal-advance-card-payment-en)。


## 集成方案
我们会透过4个主要步骤去集成整个信用卡支付方案：
1.由[Restful API](https://developer.paypal.com/docs/business/get-started/#exchange-your-api-credentials-for-an-access-token)去获取API访问令牌。
2.从[生成令牌API](https://developer.paypal.com/docs/business/checkout/advanced-card-payments/#step-2-generate-a-client-token-for-yourbuyer)中获取```data_client_token```。
3.将卡片表格添加到结帐付款页面
4.通过[Capture API](https://developer.paypal.com/docs/api/orders/v2/#orders_capture)从服务器端调用中捕获付款订单。

### 安装
```sh
> npm install
```

### 编译
```sh
> npm start
```
编译项目后，请访问[http://localhost:3000/ucc-form](http://localhost:3000/ucc-form)尝试该示例。


### 贡献
我们欢迎任何人使用或分享此示例，并欢迎创建测试用例或代码更改来贡献此示例项目。

