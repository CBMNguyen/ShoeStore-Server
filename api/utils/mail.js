module.exports = (password) => {
  return `
  <!DOCTYPE html>
  <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email Template</title>
      <meta name="description" content="Reset Password Email Template." />
      <style type="text/css">
        a:hover {
          text-decoration: underline !important;
        }
  
        h2 {
          font-family: "Pacifico", cursive;
          cursor: pointer;
          user-select: none;
          font-size: 38px
        }
  
        a, a:link {
          color: black !important;
          text-decoration: none !important;
        }
  
        img {
          position: relative;
          width: 34px;
          height: 34px;
          object-fit: cover;
        }
      </style>
    </head>
  
    <body
      marginheight="0"
      topmargin="0"
      marginwidth="0"
      style="background-image: linear-gradient(
        to right bottom,
        rgba(229, 94, 174, 0.6),
        rgba(201, 210, 149, 0.6)
      )"
      leftmargin="0"
    >
      <!--100% body table-->
      <table
        cellspacing="0"
        border="0"
        cellpadding="0"
        width="100%"
        style="
          @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
          font-family: 'Open Sans', sans-serif;
        "
      >
        <tr>
          <td>
            <table
              style="background-color: #f2f3f8; max-width: 670px; margin: 0 auto"
              width="100%"
              border="0"
              align="center"
              cellpadding="0"
              cellspacing="0"
            >
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <h2>
                    <a style="text-decoration: none;" href="https://shoestore-7857c.web.app/" title="logo" target="_blank">
                      Shoes Store
                      <img
                        src="https://res.cloudinary.com/h2kcloud/image/upload/v1659065926/ShoesStore/brandLogo_palmpf.png"
                        alt="brandLogo"
                      />
                    </a>
                  </h2>
                </td>
              </tr>
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table
                    width="95%"
                    border="0"
                    align="center"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      max-width: 670px;
                      background: #fff;
                      border-radius: 3px;
                      text-align: center;
                      -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                      box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    "
                  >
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding: 0 35px">
                        <h1
                          style="
                            color: #1e1e2d;
                            font-weight: 500;
                            margin: 0;
                            font-size: 32px;
                            font-family: 'Rubik', sans-serif;
                          "
                        >
                          You have requested to reset your password
                        </h1>
                        <span
                          style="
                            display: inline-block;
                            vertical-align: middle;
                            margin: 29px 0 26px;
                            border-bottom: 1px solid #cecece;
                            width: 100px;
                          "
                        ></span>
                        <p
                          style="
                            color: #455056;
                            font-size: 15px;
                            line-height: 24px;
                            margin: 0;
                          "
                        >
                          We can't just send you your old password. Instead, we'll
                          generate a random password for you to log in again.
                          Please enter your password below to be able to log in.
                          You can then go to the website and reset your preferred
                          password.
                        </p>
  
                        <h2>${password}</h2>
  
                        <div></div>
                          <span
                            style="
                              font-family: 'Pacifico', cursive;
                              font-size: 14px;
  
                              line-height: 18px;
                              margin: 0 0 0;
              
                            "
                            >Shoes Store thank you very much.</span
                          >
                          ❤️
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="height: 40px">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
  
              <tr>
                <td style="height: 20px">&nbsp;</td>
              </tr>
             
              <tr>
                <td style="height: 80px">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--/100% body table-->
    </body>
  </html>
`;
};
