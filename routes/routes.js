const express = require('express')
const router = express.Router()

const studentController = require("../controller/studentDetailController")


router.post('/create1',studentController.studentRegister)
router.post('/create',studentController.createStudentinfo2)
router.get('/get',studentController.findstudent)

module.exports =router