module.exports = {
  payment: (request, response) => {
    //parameters
    const accessKey = process.env.ACCESSKEY;
    const secretKey = process.env.SECRETKEY;
    const orderInfo = process.env.ORDER_INFO;
    const partnerCode = process.env.PARTNERCODE;
    const redirectUrl = process.env.REDIRECTURL;
    const ipnUrl = process.env.IPNURL;
    const requestType = "payWithMethod";
    const amount = request.body.total;
    const orderId = request.body._id;
    const requestId = orderId;
    const extraData = "";
    const paymentCode = process.env.PAYMENTCODE;
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData +
      "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" +
      partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" +
      requestType;
    
    //signature
    const crypto = require("crypto");
    const signature = crypto
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
      res.on("data", (data) => {
        const {shortLink} = JSON.parse(data);
        response.status(200).json({shortLink});
      });
      res.on("end", () => {
        console.log("No more data in response.");
      });
    });

    req.on("error", (e) => {
      response.status(500).json({message: `problem with request: ${e.message}`})
    });
    req.write(requestBody);
    req.end();
  },
};
