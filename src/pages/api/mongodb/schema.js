// schema.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const createdAtOptions = {
  type: Date,
  default: Date.now,
};

let User;
let JobPost;

if (mongoose.models && mongoose.models.JobPost) {
  JobPost = mongoose.model("JobPost");
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

  JobPost = mongoose.model("JobPost", jobPostSchema);
}
if (mongoose.models && mongoose.models.User) {
  User = mongoose.model("User");
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
    // Add createdAt and updatedAt timestamps
    CNIC: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    createdAt: createdAtOptions,
  });

  User = mongoose.model("User", userSchema);
}
const FormDataSchema = new mongoose.Schema({
  accessibility: {
    disability: String,
    specialAssistance: String,
  },
  personalInfo: {
    name: String,
    gender: String,
    dob: Date,
    email: String,
    mobile: String,
    cnic: String,
    city: String,
    languages: [String],
    permanentaddress: String,
    currentaddress: String,
    instagramhandle: String,
    linkedinhandle: String,
    areyoucontentcreator: String,
  },
  education: [
    {
      DegreeName: String,
      InstituteName: String,
      DegreeLevel: String,
      DegreeSpecialization: [String],
      Graduation_year: Number,

      CGPA: Number,

      Outof: Number,
    },
  ],
  internshipPreference: {
    preferredFunction: String,
    location: String,
  },
  hasWorkExperience: String,
  appstatus: { type: String, default: "inprogress" },
  user_email: { type: String, required: true },
  workExperience: [
    {
      PositionHeld: String,
      OrganizationName: String,
      FromDate: Date,
      ToDate: Date,
      PresentlyWorking: Boolean,
    },
  ],
  cv: String,
  postid: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FormData =
  mongoose.models.FormData || mongoose.model("FormData", FormDataSchema);

export { User, FormData, JobPost };
