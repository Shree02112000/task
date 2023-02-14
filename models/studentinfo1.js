const mongoose =require('mongoose')
const Schema = mongoose.Schema

const StudentInfo1Schema = new Schema({
    name:{
        type:String,
       
    },
    emailId:{
        type:String,
       

    },
    password:{
        type:String,
       
    },
    rollNo:{
        type:Number,
        ref:"StudentInfo2"
    },

    isRegistered:{
        type:Boolean,
        default:0
    }
},{timestamps:true})

    const StudentInfo1 = mongoose.model('StudentInfo1',StudentInfo1Schema)


    module.exports=StudentInfo1