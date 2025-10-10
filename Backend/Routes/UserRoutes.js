const express = require("express");
const { CreateStudent, GetStudents, DeleteStudents, Entermarks, GetEntermarks, Attandance, Homework, getAllHomework, Examschedule, Getallexams, AddTechers, GetAllTechers, TechersSalary, GetTechersSalary, AddBiling, GetBilling,Biling } = require("../Controller/UserController");
const router = express.Router();

router.get("/entermarks", GetEntermarks);
router.get("/students", GetStudents);
router.get("/allhomework", getAllHomework);
router.get("/getallexams", Getallexams);
router.get("/getalltecher", GetAllTechers);
router.get("/getalltechersalary", GetTechersSalary);
router.get("/getallbilling", GetBilling);

router.delete("/students/:id", DeleteStudents);
router.post("/students", CreateStudent);
router.post("/entermarks", Entermarks);
router.post("/enterattendance", Attandance);
router.post("/addhomework", Homework);
router.post("/addexam", Examschedule);
router.post("/addtecher", AddTechers);
router.post("/techersalary", TechersSalary);
router.post("/addbilling", AddBiling);
router.post("/billing", Biling);


module.exports = router;
