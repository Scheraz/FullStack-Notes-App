const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //Mongoose will give CreatedAt and UpdatedAt fields
)

module.exports = mongoose.model('Note', noteSchema)
