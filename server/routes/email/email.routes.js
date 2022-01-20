let express = require("express");
let router = express.Router();
require("dotenv").config();

router.route("/emailSending").post((req, res, next) => {
  try {
    let From = req.body.From; 
    console.log("Selected User:" + From);
    const To = req.body.To;
    var nodemailer = require("nodemailer");
    var mail = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: "gmail",
      auth: {
        user: From.email,
        pass: From.password
      },
    });
    Object.entries(To).forEach(([key, value]) => {
      let deley = value.time;
      var mailOptions = {
        from: From.email,
        to: value.id,
        subject: value.subject,
        html: value.mail
      };
            
      setTimeout(function() {  
         mail.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error:" + error);
          } else {
            res.status(200).send({
              message: "Mails Sent Successfully!!!!",
            });
            console.log("Email sent: " + info.response);
          }
        });
      }, parseInt(deley));

    });
  } catch (error) {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(500).send({
      message: "Data Could not received!",
    });
  }
});

module.exports = router;
