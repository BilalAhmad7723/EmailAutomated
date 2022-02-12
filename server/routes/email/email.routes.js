let express = require("express");
let router = express.Router();
require("dotenv").config();

router.route("/send").post((req, res, next) => {

    let From = req.body.From; 
    const To = req.body.To;
    var nodemailer = require("nodemailer");
    var mail = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: "gmail",
      port: 465,
      secure: true,
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
            res.status(500).json({
              message: "Data Could not received!",
              error:error
            });
          } else {
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).json({
              msg: "Mail send Successfully!!"
            })
          }
        });
      }, parseInt(deley));
      mail.close();
    });
});

module.exports = router;
