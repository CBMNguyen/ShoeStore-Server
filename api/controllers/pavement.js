module.exports = {
  pavement: (request, response) => {
    //parameters
    var accessKey = process.env.ACCESSKEY;
    var secretKey = process.env.SECRETKEY;
    var orderInfo = process.env.ORDER_INFO;
    var partnerCode = process.env.PARTNERCODE;
    var redirectUrl = process.env.REDIRECTURL;
    var ipnUrl = process.env.IPNURL;
    var requestType = "payWithMethod";
    var amount = response.body.amount;
    var orderId = response.body.orderId;
    var requestId = orderId;
    var extraData = "";
    var paymentCode = process.env.PAYMENTCODE;
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData +
      "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" +
      partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" +
      requestType;

    //signature
    const crypto = require("crypto");
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Shoes Store",
      storeId: "ShoesStore2022",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });
    //Create the HTTPS objects
    const https = require("https");
    const options = {
      hostname: "test-payment.momo.vn",
      port: 443,
      path: "/v2/gateway/api/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
    };
    //Send the request and get the response
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      res.on("data", ({shortLink}) => {
        response.status(200).json({shortLink});
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    req.write(requestBody);
    req.end();
  },
};
