const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accountSchema = new Schema({
  email: {
    type: String
  },
  password:{
    type: String
  },
  status:{
    type: Boolean
  },
}, {
    collection: 'Account',
    versionKey: false
  })

module.exports = mongoose.model('Account', accountSchema)