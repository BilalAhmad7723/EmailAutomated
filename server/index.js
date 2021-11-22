let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoDb = require('./db');
const upload = require('express-fileupload');

const SubjectRoute = require('./subject.route');
const EmailRoute = require('./email.routes');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
  console.log('Database connected!')
},
error => {
    console.log(error)
  }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());
app.use(upload());
app.use('/api', SubjectRoute);
app.use('/email', EmailRoute);


const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log('Connected on : ' + port)
})

app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});