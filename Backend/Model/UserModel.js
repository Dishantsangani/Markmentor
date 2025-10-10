const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  dateofbirth: { type: Date, required: true }, // Changed to Date type
  standard: { type: Number, required: true, min: 1, max: 12 }, // Min/max validation example
  rollno: { type: Number, required: true, unique: true },
  grno: { type: String, required: true, unique: true },
  subject: { type: [String], required: true },
  marks: [
    {
      subject: { type: String, required: true },
      score: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  attendance: [
    {
      subject: { type: String, required: true },
      date: { type: Date, required: true },
      status: { type: String, enum: ["present", "absent"], required: true },
    },
  ],
  homework: [
    {
      standard: { type: Number, required: true },
      subject: { type: String, required: true },
      date: { type: Date, required: true },
      question: { type: String, required: true },
    },
  ],
  exams: [
    {
      examName: { type: String, required: true },
      subject: { type: String, required: true },
      date: { type: Date, required: true },
      time: { type: String, required: true },
      totalMarks: { type: Number, required: true },
      standard: { type: Number, required: true },
      description: { type: String },
    },
  ],
  techer: [
    {
      techername: { type: String, required: true },
      subject: { type: String, required: true },
      standard: { type: Number, required: true },
      dateofjoin: { type: Date, required: true },
      email: { type: String, required: true },
      phonenumber: { type: String, required: true },
      workexperiance: { type: String }
    }
  ],
  techerssalary: [
    {
      teacherName: { type: String, required: true },
      subject: { type: String, required: true },
      amount: { type: Number, required: true },
      bonus: { type: Number, required: true },
      standard: { type: Number, required: true },
    }
  ],
  billing: [{
    bilname: { type: String, required: true },
    amount: { type: Number, required: true },
    standard: { type: Number, required: true },
    billedToRoll: { type: Number, required: true },
  }]
},
  {
    strict: true, // ❗Important to prevent saving unexpected fields like billing.rollno
    timestamps: true, // Optional: adds createdAt and updatedAt
  }
);

const Student = mongoose.model("students", StudentSchema);
module.exports = Student;

