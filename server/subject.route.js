let express = require('express');
let router = express.Router();

let todoSchema = require('./subject');


router.route('/').get((req, res, next) => {
  // eslint-disable-next-line array-callback-return
  todoSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})


router.route('/create-subject').post((req, res, next) => {
  todoSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});


router.route('/edit-subject/:id').get((req, res, next) => {
  todoSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


router.route('/update-subject/:id').put((req, res, next) => {
  todoSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Subject updated')
    }
  })
})

router.route('/delete-subject/:id').delete((req, res, next) => {
  todoSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.route('/emailSending').post((req, res, next) => {

})


module.exports = router;