// schema.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const createdAtOptions = {
  type: Date,
  default: Date.now,
};

let JobPost;
let JobApplication;
let User;
let Otp;

if (mongoose.models && mongoose.models.JobPost) {
  JobPost = mongoose.model('JobPost');
} else {
  const jobPostSchema = new Schema({
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: String,
    jobLocation: String,
    description: String,
    experienceLevel: String,
    submissionDeadline: String,
    department: String,
    values: Array,
    status: String,
    enable: {
      type: Boolean,
      default: true,
    },
    createdAt: createdAtOptions,
  });

  JobPost = mongoose.model('JobPost', jobPostSchema);
}

if (mongoose.models && mongoose.models.JobApplication) {
  JobApplication = mongoose.model('JobApplication');
} else {
  const jobApplicationSchema = new Schema({
      fullName: {
        type: String,
        required: true,
      },
      phone: String,
      email: {
        type: String,
        unique: true,
        required: true,
      },
      qualification: String,
      selectedDepartment: String,
      experience: String,
      experiencerange: [Number],
      cv: String,
      countryorregion: String,
      city: String,
      stateorprovince: String,
      zipcode: String,
      address: String,
      postid: String,
      status: String,
      createdAt: createdAtOptions,
  });

  JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
}

if (mongoose.models && mongoose.models.User) {
  User = mongoose.model('User');
} else {
  const userSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Boolean,
      default: false,
    },
    createdAt: createdAtOptions,
  });

  User = mongoose.model('User', userSchema);
}

if (mongoose.models && mongoose.models.Otp) {
  Otp = mongoose.model('Otp');
} else {
  const otpSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: createdAtOptions,
  });

  Otp = mongoose.model('Otp', otpSchema);
}

export { JobPost, JobApplication, User, Otp };
