const mongoose =require('mongoose')
const Schema = mongoose.Schema

const StudentInfo2Schema = new Schema({
    fatherName:{
        type:String,
        
    },
    motherName:{
        type:String,
        

    },
    city:{
        type:String,
       
    },

    rollNo:{
        type:Number,
        ref:"StudentInfo1"
    }
},{timestamps:true})


    const StudentInfo2 = mongoose.model('StudentInfo2',StudentInfo2Schema)


    module.exports=StudentInfo2