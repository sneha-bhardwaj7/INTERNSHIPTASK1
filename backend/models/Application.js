const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters."]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      unique: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required."]
    },
    companyName: {
      type: String,
      required: [true, "Company name is required."],
      trim: true
    },
    isAgency: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected"],
      default: "new"
    },
    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

applicationSchema.set('toJSON', {
  transform(_document, returnedObject) {
    delete returnedObject.passwordHash;
    return returnedObject;
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application };
