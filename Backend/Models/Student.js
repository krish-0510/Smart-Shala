import mongoose from 'mongoose';
import joi from 'joi';

let studentSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        default: null
    },
    contact :{
        type : Number,
        min : 1000000000,
        max : 9999999999,
        default : null
    },
    parentName :{
        type : String,
        required : true
    },
    parentContact :{
        type : Number,
        min : 1000000000,
        max : 9999999999,
        default : null
    },
    address : {
        type : String,
        default : null
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    absentDays: {
        type: [String],
        default : [],
    },
    presentDays: {
        type: [String],
        default : [],
    },
    submittedHomeworks : [{
        type : String,
        default:[]
    }],
    face : {
        type : Object,
        default : null,
    }
});

export const Student = mongoose.model("Student", studentSchema);

export const studentSchemaValidation = joi.object({
    email : joi.string().required(),
    name : joi.string().required(),
    password : joi.string().required(),
    contact : joi.number().max(1000000000).min(999999999),
    parentContact : joi.number().max(1000000000).min(999999999)
});