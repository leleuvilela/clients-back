const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContactSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    cpf: {
      type: Number,
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Contact', ContactSchema);
