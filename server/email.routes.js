let express = require('express');
let router = express.Router();

router.route('/emailSending').post((req, res, next) => {
    try {
        // IN REQ.FILES.”YOUR_FILE_NAME” WILL BE PRESENT
        const bodyData = req.body;
        console.log(bodyData);
        res.status(200).send({
        message: "Mails Sent Successfully!",
       });
       } catch (error) {
       res.send("ERROR");
       }
})


module.exports = router;