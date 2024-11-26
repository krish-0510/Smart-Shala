import mongoose from 'mongoose';
import joi from 'joi';

let homeworkSchema = new mongoose.Schema({
    subject :{
        type : String,
        required : true,
    },
    title :{
        type : String,
        required : true,
    },
    description :{
        type : String,
    },  
    file :{
        type : String,
    },
    classoom :{
        type: mongoose.Schema.Types.ObjectId,
    },
    dueDate: {
        type: Date,
        default: Date.now
    }
});

export const Homework = mongoose.model("Homework", homeworkSchema);

export const homeworkSchemaValidation = joi.object({
    subject : joi.string().required(),
    title : joi.string().required()
});