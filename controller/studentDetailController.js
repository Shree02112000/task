const {query} = require("express")
const StudentInfo1 = require("../models/studentinfo1");
const StudentInfo2 = require("../models/studentinfo2");
const otp = require("../models/otpmodel");
let transport = nodemailer.createTransport({ 
        service: "Gmail", 
        auth: { 
            user: "", 
            pass: "", 
        } 
    }) 
    transport.verify((error, success) => { 
        if (error) { 
            console.log(error) 
        } else { 
            console.log("READY TO MESSAGE") 
            console.log(success) 
        } 
     
    })

const studentRegister = async (req,res,next)=>{
    try {
         bcrypt.hash(req.body.password,10,async function(err,hashedPass){
            if(err){
                res.json({
                    error:err
                })
            }


        let student1 = new StudentInfo1({
            name:req.body.name,
            emailId:req.body.emailId,
            password:req.body.password,
            rollNo:req.body.rollNo
        });
        let exitUser = await student1.findOne({
            $or:[{email:req.body.emailId}]
        })
          if(exitUser){
            res.json({
                message:"already added"
            })
          }
          else{
       let created = await student1.save()
          function otpgenerate(data){
            let chars ="1234567890",
                result="";
            for(let i=data;i>0;--i) 
            result+=chars[Math.round(Math.random()*(chars.length-1))];
            return result;
        
         }
         const OTP = await otpgenerate()
         let otpdata = new otp({
            userId:created._id,
            otp:OTP
            
        })
         const mailOptions = { 
                        from: process.env.AUTH_EMAIL, 
                        to: req.body.email, 
                        subject: "gmail", 
                        attachments: [ 
                            { 
                                filename: 'users.xlsx', 
                                path: './files/users.xlsx' 
             
                            } 
                        ] 
                    } 
                    console.log(mailOptions) 
                    transport.sendMail(mailOptions)
    
        res.json({
            message:"OTP send to your email",student1
        })
    }
})
        
    } catch (error) {
        res.json({
            message:"error"
        })
    }
};

const createStudentinfo2 = async (req,res,next)=>{
    try {
        let student2 = new StudentInfo2({
            fatherName:req.body.fatherName,
            motherName:req.body.motherName,
            city:req.body.city,
            rollNo:req.body.rollNo
        });
        await student2.save();
        res.json({
            message:"student detail added",student2
        })
        
    } catch (error) {
        res.json({
            message:"error"
        })
    }
};

const getstudent = async (req,res,next)=>{
    try {
       let data = await StudentInfo1.aggregate({
        {
            $lookup: {
                from: "studentInfo2",
                pipeline: [
                    { $project: {rollNO: req.body.rollNo}}
                ],
                as: "rollNo"
            }
        }
    ])
        res.json({
            data:data
        })
        
    } catch (error) {
        res.json({
            message:"error"
        })
    }
};


module.exports={
    studentRegister,
    createStudentinfo2,
    getstudent
}