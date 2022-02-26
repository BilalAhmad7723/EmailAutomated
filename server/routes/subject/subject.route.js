let express = require('express');
let router = express.Router();

let todoSchema = require('./subject');


router.route('/').get((req, res, next) => {
  todoSchema.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.set('Access-Control-Allow-Origin', '*');
        res.header ('Access-Control-Allow-Origin', '*');
        res.header ('Access-Control-Allow-Credentials', true);
        res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header ('Access-Control-Allow-Headers', 'Content-Type');
        res.json(data);
      }
    })
})


router.route('/create-subject').post((req, res, next) => {
  todoSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Credentials', true);
      res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      res.header ('Access-Control-Allow-Headers', 'Content-Type');
      res.json(data)
    }
  })
});


router.route('/edit-subject/:id').get((req, res, next) => {
  todoSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Credentials', true);
      res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      res.header ('Access-Control-Allow-Headers', 'Content-Type');
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
      res.set('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Credentials', true);
      res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      res.header ('Access-Control-Allow-Headers', 'Content-Type');
      res.json(data);
    }
  })
})

router.route('/delete-subject/:id').delete((req, res, next) => {
  todoSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.set('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Origin', '*');
      res.header ('Access-Control-Allow-Credentials', true);
      res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      res.header ('Access-Control-Allow-Headers', 'Content-Type');
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.route('/authentication').post((req, res, next) => {
  const bodyData = req.body;
  try {
    let response = {
      msg : "Login Successfully!!!",
      token : bodyData
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.json(response)
  } catch (error) {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(500).send({
      message: "Invalid User!",
    });
  }
})


module.exports = router;