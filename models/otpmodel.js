const mongoose =require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({
    userId:{
        type:Schema.Type.objectId,
        required:true
    },
    otp:{
        type:Number,
        required:true

    },
},{timestamps:true})

const otp = mongoose.model('otp',otpSchema)


module.exports=otp