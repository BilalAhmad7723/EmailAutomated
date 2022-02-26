let express = require('express');
let router = express.Router();

let accountSchema = require('./account_schema');


router.route('/get-account').get((req, res, next) => {
  accountSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data)
      }
    })
})


router.route('/add-account').post((req, res, next) => {
  console.log("Add Account");
    accountSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.json(data)
    }
  })
});


router.route('/edit-account/:id').get((req, res, next) => {
    accountSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Cheers!! here is id",
        data,
      });
    }
  })
})

router.route('/search-active').get((req, res, next) => {
  accountSchema.find({ status: true } , (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(data)
  }
})
})
router.route('/update-account/:id').put((req, res, next) => {
    accountSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      res.status(404).json({
        message: "Sorry your todo list cannot be added",
        error: err.message,
      });
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        message: "Cheers!! You have successfully Update Account",
        data,
      });
    }
  })
})

router.route('/delete-account/:id').delete((req, res, next) => {
    accountSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;