const capitalizeFirstLetter = require("./common");

module.exports = (order) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = `${date.getFullYear()}`;
    const hour = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
  };
  return `<!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Delivered Email Template</title>
      <meta name="description" content="Delivered Email Template." />

      <style type="text/css">
        h2 {
          font-family: "Pacifico", cursive;
          cursor: pointer;
          user-select: none;
          font-size: 38px;
          margin-top: 0;
          padding: 0.4rem;
          font-weight: bold;
          background-color: deeppink;
        }
  
        img {
          position: relative;
          width: 34px;
          height: 34px;
          object-fit: cover;
        }

        .text-center {
          text-align: center !important;
        }

        .absolute {
          position: absolute;
        }

        .relative {
          position: relative;
        }

      </style>
    </head>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="
        background-image: linear-gradient(
          to right bottom,
          rgba(229, 94, 174, 0.6),
          rgba(201, 210, 149, 0.6)
        );
      "
      leftmargin="0"
    >
      <!--100% body table-->
      <div
        width="100%"
        style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: 'Open Sans', sans-serif;height: 1200px;
          over-flow: auto;
        "
      >
        <div
          style="
            background-color: #fff;
            max-width: 670px;
            margin: 0 auto;
            height: 1200px;
            over-flow: auto;
          "
        >
          <h2>
            <a
              style="text-decoration: none;color: white"
              href="https://shoestore-7857c.web.app/"
              title="logo"
              target="_blank"
            >
              Shoes Store
              <img
                src="https://res.cloudinary.com/h2kcloud/image/upload/v1659065926/ShoesStore/brandLogo_palmpf.png"
                alt="brandLogo"
              />
            </a>
          </h2>
  
          <div class="text-center">
            <img src="https://res.cloudinary.com/h2kcloud/image/upload/v1664613006/ShoesStore/check_j0r0o7.png" alt="123" />
          </div>
  
          <div style="padding: 0 1rem">
          <h3 class="text-center">
            <code style="color: #000;font-weight: bold; text-transform: uppercase; font-size: 23px;"
              >successful delivery</code
            >
          </h3>
  
          <p class="text-center"  style=" width: 75%; margin: 0 auto; color:  #6c757d; margin-top:3rem;margin-bottom:3rem;">
            <code style="color: cyan; font-weight: bold">Hi</code>
            <code style="font-weight: bold; color: deeppink;">${
              order.fullname
            }</code>, <br />
            <code style="color: #6c757d;width: 80%">
              Your order has been successfully delivered, please check the details
              below. Shoes Store would like to thank customers who have always
              supported the store during the past time.❤️
            </code>
          </p>
  
          <div style="padding: 0 1rem">
            <h4 style="text-transform: uppercase; margin-top:1.5rem;margin-bottom:1.5rem;font-size: 20px" >
              <code style="color: #6c757d; opacity: 0.75">Items Ordered</code>
            </h4>
            ${order.products.map(
              (product, index) => `<div
            style="border-bottom: 1px solid #dedede; display: flex; padding-bottom: 1rem;"
          >
            <div>
            <img
                style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; border: 1px solid #dee2e6"
                }}
                src=${
                  order.updateProduct[index].productDetail.find(
                    ({ color }) => color.color === product.selectedColor
                  )?.images[0]
                }
                alt="img"
              />

            </div>
            <div style="margin-left: 1.5rem;padding: 8px 0;">
              <span style="border-radius: 4px;background-color: #6c757d; color: #fff; padding: 4px 8px">${
                product._id.name
              }</span>
              <div>
              <span
              style="border-radius: 4px;background-color: cyan; color: #fff; padding: 4px 8px; display: inline-block; margin: 4px 0"
            >
              Quantity: ${product.selectedQuantity}
            </span>
              </div>
              <div>
                <span style="border-radius: 4px;background-color: deeppink; color: #fff; padding: 4px 8px;">Size: ${
                  product.selectedSize
                }</span>
              </div>
            </div>
            <div style="margin-left: auto">
              <span style="border-radius: 4px;background-color: orange; color: #fff; padding: 4px 8px; display: inline-block; margin-left: auto"> $${
                product.currentSalePrice *
                (1 - product.currentPromotionPercent / 100) *
                product.selectedQuantity
              } </span>
            </div>
          </div>`
            )}
  
            <div style="border-bottom: 1px solid #dedede; padding: 8px 0">
              <div class="pb-3">
                <div style="display: flex; justify-content: space-between;">
                  <code style="color: #6c757d";>Provisional Price</code>
                  <code style="color: orange;font-weight: bold; display: inline-block ;margin-left: auto"> $${(
                    order.total +
                    order.transportFee +
                    order.discount
                  ).toFixed(2)} </code>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <code style="color: #6c757d";>Transport Fee</code>
                  <code style="color: cyan; font-weight: bold; display: inline-block ;margin-left: auto"> $${
                    order.transportFee
                  } </code>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <code style="color: #6c757d";>Discount</code>
                  <code style="color: deeppink; font-weight: bold; display: inline-block; margin-left: auto">$${
                    order.discount
                  }</code>
                </div>
              </div>
            </div>
            <div style="display: flex; font-size: 15px; padding: 8px 0;border-bottom: 1px solid #dedede">
              <code style="color: #6c757d"; font-weight: bold;>Total Amount:</code>
              <div style="color: black; font-weight: bold; display: inline-block; margin-left: auto;">$${
                order.total
              }</div>
            </div>
  
            <div>
              <h4 style="text-transform: uppercase; margin-top:0.5rem;margin-bottom:0.5rem;font-size: 20px">
                <code style="color: #6c757d; opacity: 0.75">Payment Info</code>
              </h4>
  
              ${
                order.paymentMethod
                  ? `<div
              style="display:flex; justify-content: space-between; color: #6c757d; padding-bottom: 1rem;border-bottom: 1px solid #dedede;"
            >
              <div style="line-height: 34px;">
                <img
                  src="https://res.cloudinary.com/h2kcloud/image/upload/v1664592311/ShoesStore/MoMo_Logo.105c1788_gheqlp.png"
                  alt=""
                  style="object-fit: contain"
                />
                </div>
                <code style="color: #6c757d; margin-left:8px; line-height: 34px;"
                  >Momo (******${order.phone.slice(-4)})</code
                >
              <code style="font-weight:bold; color: #6c757d; display: inline-block; margin-left: auto; line-height: 34px">$${
                order.total
              }</code>
            </div>`
                  : `<div style="display:flex; justify-content: space-between; color: #6c757d; padding-bottom: 1rem;border-bottom: 1px solid #dedede;">
            <div>
              <img
                style="object-fit: contain"
                src="https://res.cloudinary.com/h2kcloud/image/upload/v1664592311/ShoesStore/delivery-logo.1196a392_pqxe1s.png"
                alt=""
              />
              </div>
              <code style="color: #6c757d; margin-left:8px; line-height: 34px">(Payment on delivery)</code>
            <code style="font-weight:bold; color: #6c757d; display: inline-block; margin-left: auto; line-height: 34px">$${order.total}</code>
          </div> `
              }
            
  
              <div
                 style="border-bottom: 1px solid #dedede; display: flex"
              >
                <div style="width: 50%; text-align:center;">
                  <h4 style="text-transform: uppercase; margin-top:0.5rem;margin-bottom:0.5rem;font-size: 20px">
                <code style="color: #6c757d; opacity: 0.75">Address Info</code>
              </h4>
                  <div>
                    <code class="text-secondary fw-bold">${
                      order.fullname
                    }</code>
                  </div>
                  <p class="mb-0">
                    <code class="text-secondary fw-bold"
                      >${order.address.split("#")[0]}</code
                    >
                  </p>

                  <div>
                  
                  <code style="font-weight:bold;color: deeppink"
                    >${order.phone}</code
                  >
                  </div>
  
  
                  <code style="font-weight:bold;color: cyan"
                    >${order.email}</code
                  >
                </div>
                <div style="width: 50%; text-align:center;">
                <h4 style="text-transform: uppercase; margin-top:0.5rem;margin-bottom:0.5rem;font-size: 20px">
                <code style="color: #6c757d; opacity: 0.75">Delivered Service</code>
              </h4>
                  <img
                    style="
                      width: 180px;
                      height: 100px;
                      object-fit: contain;
                      position: relative;
                    "
                    src="https://res.cloudinary.com/h2kcloud/image/upload/v1664592392/ShoesStore/GHN.0a33ac31_ffaktt.webp"
                    alt=""
                  />

                  <div>
                  <code>Order Date: ${formatDate(order.createdAt)}</code>
                  </div>
                  <div>
                  <code>Delivered Date: ${formatDate(order.updatedAt)}</code>
                  </div>
                </div>
              </div>
  
              <div style="width: 85%; margin: 1rem auto">
                <code style="color:#6c757d"
                  >If you need help with anything please don't hesitate to drop us
                  an phone email :</code
                >
                <code style="color: deeppink; font-weight: bold;">hieub1809236@student.ctu.edu.vn</code>
              </div>
            </div>
          </div>
          </div>
          <footer class="text-center py-2">
            <code style="font-weight:bold; color: #000;"
              >Shoes Store thank you very much.❤️</code
            >
          </footer>
        </div>
      </div>
    </body>
  </html>
  `;
};
