module.exports = (user, discount) => {
  function capitalizeFirstLetter(string = "") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
      <title>Discount Email Template</title>
      <meta name="description" content="Discount Email Template." />
  
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
          font-family: 'Open Sans', sans-serif;
          over-flow: auto;
        "
      >
        <div
          style="
            background-color: #fff;
            max-width: 670px;
            margin: 0 auto;
            over-flow: auto;
          "
        >
          <h2>
            <a
              style="text-decoration: none; color: white"
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
            <img
              style="width: 64px; height: 64px"
              src="https://res.cloudinary.com/h2kcloud/image/upload/v1664674884/ShoesStore/coupon_rbw8nk.png"
              alt="123"
            />
          </div>
  
          <div style="padding: 0 1rem">
            <h3 class="text-center">
              <code
                style="
                  color: #000;
                  font-weight: bold;
                  text-transform: uppercase;
                  font-size: 23px;
                "
                >Customer Gratitude</code
              >
            </h3>
  
            <p
              class="text-center"
              style="
                width: 90%;
                margin: 0 auto;
                color: #6c757d;
                margin-top: 3rem;
                margin-bottom: 3rem;
              "
            >
              <code style="color: cyan; font-weight: bold">Hi</code>
              <code style="font-weight: bold; color: deeppink">${capitalizeFirstLetter(
                user.firstname
              )} ${capitalizeFirstLetter(user.lastname)}</code> <br />
              <code style="color: #6c757d">
                You are one of the active members of ShoesStore. Today we send you
                this gift to thank you for always accompanying us during the past
                time. ShoeStore would like to sincerely thank and let's continue
                to accompany each other.❤️
              </code>
            </p>
  
            <div style="text-align: center">
              <code style="color: deeppink; font-weight: bold; font-size: 24px"
                >${discount.discountCode}</code
              >
            </div>
  
            <div
              style="text-align: center; margin-top: 1rem; margin-bottom: 1rem"
            >
              <code style="font-weight: bold; color: #6c757d">Expiry: </code>
              <code style="font-weight: bold; color: #000"
                >${formatDate(discount.startDate)}</code
              >
              <code style="padding: 0 1rem">-</code>
              <code style="font-weight: bold; color: #000"
                >${formatDate(discount.endDate)}</code
              >
            </div>
  
            <div style="text-align: center; width: 55%; margin: 3rem auto">
              <code style="color: #6c757d"
                >This discount code is limited. Use this gift to shop hot shoes at
                our Shoes Store website to get great deals.</code
              >
            </div>

            <div style="text-align: center; margin-bottom: 3rem">
            <a
              href="https://shoestore-7857c.web.app/"
              alt="https://shoestore-7857c.web.app/"
              style="
                color: #fff;
                font-weight: bold;
                text-transform: uppercase;
                background-color: cyan;
                text-decoration: none;
                box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                padding: 1rem 4rem;
                display: inline-block;
                border-radius: 4px;
              "
              >Shop now</a
            >
          </div>

          </div>
          <footer class="text-center" style="padding-bottom: 2rem">
            <code style="font-weight: bold; color: #000"
              >Shoes Store thank you very much.❤️</code
            >
          </footer>
        </div>
      </div>
    </body>
  </html>
  `;
};
