const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subjectSchema = new Schema({
  subject: {
    type: String
  },
  subjectid:{
    type: Number
  },
}, {
    collection: 'Subject',
    versionKey: false
  })

module.exports = mongoose.model('Subject', subjectSchema)