const Student = require("../Model/UserModel"); // Your Mongoose model
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


async function CreateStudent(req, res) {
  try {
    const { firstname, surname, dateofbirth, standard, rollno, grno, subject } = req.body;

    // 1. Validate all required fields
    if (
      !firstname || !surname || !dateofbirth || !standard ||
      !rollno || !grno || !subject || !Array.isArray(subject) || subject.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // 2. Convert to proper types
    const rollNumber = Number(rollno);
    const grNumber = Number(grno);
    if (isNaN(rollNumber) || isNaN(grNumber)) {
      return res.status(400).json({ error: "Rollno and GRNO must be numbers" });
    }

    // 3. Check for duplicates
    const existingRoll = await Student.findOne({ rollno: rollNumber });
    if (existingRoll) {
      return res.status(400).json({ error: "Roll Number already exists!" });
    }

    const existingGr = await Student.findOne({ grno: grNumber });
    if (existingGr) {
      return res.status(400).json({ error: "GR Number already exists!" });
    }

    // 4. Create new student with all arrays initialized
    const newStudent = new Student({
      firstname,
      surname,
      dateofbirth: new Date(dateofbirth),
      standard,
      rollno: rollNumber,
      grno: grNumber,
      subject,
      billing: [],      // Explicitly initialize
      marks: [],       // all array fields
      attendance: [],
      homework: [],
      exams: [],
      techer: [],
      techerssalary: []
    });

    // 5. Save to DB
    await newStudent.save();

    return res.status(201).json({
      message: "Student created successfully!",
      student: newStudent,
    });

  } catch (error) {
    console.error("Error in CreateStudent:", error);
    return res.status(500).json({ 
      error: "Internal Server Error",
      details: error.message 
    });
  }
} 

async function GetStudents(req, res) {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (error) {

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function DeleteStudents(req, res) {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.status(200).json({ status: "Success", message: "Student deleted successfully" });
  } catch (error) {

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function Entermarks(req, res) {
  const { marks } = req.body;

  if (!Array.isArray(marks)) {
    return res.status(400).json({ message: "Invalid marks format." });
  }

  try {
    for (const entry of marks) {
      const { studentId, subject, score } = entry;

      if (!studentId || !subject || isNaN(score)) continue;

      const student = await Student.findById(studentId);
      if (!student) continue;

      // Check if mark for subject already exists
      const existingIndex = student.marks.findIndex((m) => m.subject === subject);

      if (existingIndex !== -1) {
        // Update existing mark
        student.marks[existingIndex].score = score;
        student.marks[existingIndex].date = new Date();
      } else {
        // Add new mark
        student.marks.push({ subject, score });
      }

      await student.save();
    }

    res.status(200).json({ message: "Marks updated successfully" });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
}

async function GetEntermarks(req, res) {
  try {
    const entermarks = await Student.find()
    return res.status(200).json(entermarks)
  } catch (error) {

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function Attandance(req, res) {
  const { rollno, subject, date, status } = req.body;

  if (!rollno || !subject || !date || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const student = await Student.findOne({ rollno: Number(rollno) });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.attendance.push({
      subject,
      date: new Date(date),
      status,
    });

    await student.save();

    return res.status(201).json({ message: "Attendance saved", student });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

async function Homework(req, res) {
  try {
    const { standard, subject, date, question } = req.body;

    if (!standard || !subject || !date || !question) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let student = await Student.findOne({ standard });

    if (!student) {
      // Create dummy student if none found
      student = new Student({
        firstname: "Temp",
        surname: "Student",
        dateofbirth: new Date("2000-01-01"),
        standard,
        rollno: Date.now(),
        grno: `GRNO${Date.now()}`,
        subject: [subject],
        homework: [],
      });
    }

    student.homework.push({ standard, subject, date, question });

    await student.save();

    return res.status(201).json({ message: "Homework added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }

}

async function getAllHomework(req, res) {
  try {
    // Fetch all homework fields from all students
    const students = await Student.find({}, "homework");

    // Flatten all homework arrays into one list
    const allHomework = students.flatMap((student) => student.homework || []);

    res.status(200).json(allHomework);
  } catch (err) {
    console.error("Error fetching homework:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}

async function Examschedule(req, res) {
  const { examName, subject, date, time, totalMarks, description, standard } = req.body;

  try {
    // 🔄 Get all students (no filter)
    const students = await Student.find();

    // ⚠️ Check if any student exists
    if (students.length === 0) {
      return res.status(404).json({ error: "No students found in the database" });
    }

    // ➕ Add the exam to each student's exams array
    const updates = students.map((student) => {
      student.exams.push({
        examName,
        subject,
        date,
        time,
        totalMarks,
        description,
        standard
      });
      return student.save(); // Returns a Promise
    });

    await Promise.all(updates); // Wait for all saves to complete

    res.status(201).json({ message: "Exam scheduled for all students successfully" });
  } catch (error) {
    console.error("Failed to schedule exams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function Getallexams(req, res) {
  try {
    const students = await Student.find({}, "exams");
    const allExams = students.flatMap((student) =>
      student.exams.map((exam) => ({
        ...exam.toObject(),
        grno: student.grno,
      }))
    );
    res.json(allExams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exams" });
  }
}

async function AddTechers(req, res) {
  const {
    techername,
    standard,
    subject,
    dateofjoin,
    email,
    phonenumber,
    workexperiance,
  } = req.body;

  console.log("Received Teacher Data:", req.body); // 🟡 Debug log

  try {
    const students = await Student.find();

    if (students.length === 0) {
      return res.status(404).json({ error: "No students found in database" });
    }

    const updates = students.map((student) => {
      student.techer.push({
        techername,
        standard,
        subject,
        dateofjoin,
        email,
        phonenumber,
        workexperiance,
      });
      return student.save();
    });

    await Promise.all(updates);
    res.status(201).json({ message: "Teachers added successfully" });
  } catch (error) {
    console.error("Failed to add teacher", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function GetAllTechers(req, res) {
  try {
    const techers = await Student.find({}, "techer")
    res.json(techers)
  } catch (error) {
    console.log('error: ', error)
    res.status(500).json({ error: "Failed" })
  }
}

async function TechersSalary(req, res) {
  const { teacherName, subject, standard, amount, bonus } = req.body;
  try {
    const students = await Student.find();
    const updates = students.map((student) => {
      // Initialize the techerssalary array if it's undefined
      if (!student.techerssalary) {
        student.techerssalary = [];
      }

      student.techerssalary.push({
        teacherName,
        subject,
        standard,
        amount,
        bonus,
      });

      return student.save();
    });

    await Promise.all(updates);
    res.status(201).json({ message: "Teachers Salary Added Successfully" });
  } catch (error) {
    console.error("Failed to add teacher", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function GetTechersSalary(req, res) {
  try {
    const TechersSalary = await Student.find({}, "techerssalary")
    res.json(TechersSalary)
  } catch (error) {
    console.log('error: ', error)
    res.status(500).json({ message: "Server Error" })

  }
}

async function AddBiling(req, res) {
  const { bilname, standard, billedToRoll, amount } = req.body;

  try {
    // Validate input
    if (!bilname || !standard || !billedToRoll || !amount) {
      return res.status(400).json({ error: "All billing fields are required" });
    }

    // Find student by roll number
    let student = await Student.findOne({ rollno: billedToRoll });

    if (!student) {
      // Create new student with placeholder data
      student = new Student({
        rollno: billedToRoll,
        standard,
        firstname: "Auto",
        surname: "Generated",
        grno: "AUTO" + Date.now(),
        dateofbirth: new Date(),
        subject: [],
        billing: [], // initialize billing array
      });
    }

    // ✅ Prevent duplicate billing by bilname
    const alreadyBilled = student.billing?.some(
      (entry) => entry.bilname === bilname
    );
    if (alreadyBilled) {
      return res.status(400).json({ error: "Billing already exists for this student" });
    }

    // ✅ Add billing entry
    student.billing.push({ bilname, standard, billedToRoll, amount });

    // ✅ Save to DB
    await student.save();

    res.status(201).json({ message: "Billing added successfully", student });
  } catch (error) {
    console.error("Error in AddBilling:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function GetBilling(req, res) {
  try {
    const student = await Student.find({}, "billing")
    res.json(student)
  } catch (error) {
    console.log('error: ', error)
    res.status(500).json({ message: "Internal Server Error", error })
  }
}

async function Biling(req, res) {
  try {
    // Create product
    const product = await stripe.products.create({
      name: "Membership",
    });

    // Create price for product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 349 * 100, // in cents (for 100 INR)
      currency: "usd",
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/billing",
      cancel_url: "http://localhost:5173/billing",
      customer_email: "DishantSangani@gmail.com",
    });

    // Return the session URL to the client
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment: ", error);
    res.status(500).json({ error: "Payment creation failed" });
  }
}
module.exports = { CreateStudent, GetStudents, DeleteStudents, Entermarks, GetEntermarks, Attandance, Homework, getAllHomework, Examschedule, Getallexams, AddTechers, GetAllTechers, TechersSalary, GetTechersSalary, AddBiling, GetBilling, Biling };




