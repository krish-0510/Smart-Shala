import mongoose from 'mongoose';
import joi from 'joi';

let classRoomSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    admin : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        default: []
    }],
    issues : [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Issue',
        default: []
    }],
    homeworks : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework',
        default:[]
    }],
    equipments : {
        type: [String],
        default : []
    },
    subjects : {
        type : [String],
        default : []
    },
    startingDate: {
        type: Date,
        default: Date.now
    },
    endingDate: {
        type: Date,
        default: Date.now
    }
});

export const Classroom = mongoose.model("Classroom", classRoomSchema);

export const classRoomSchemaValidation = joi.object({
    name : joi.string().required()
});