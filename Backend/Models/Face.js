import mongoose from 'mongoose';
import joi from 'joi';

let faceSchema = new mongoose.Schema({
    student :{
        type : Object,
        required : true
    },
    image: {
        type: String,
        required : true
    }
});

export const Face = mongoose.model("Face", faceSchema);

export const faceSchemaValidation = joi.object({
    student : joi.object().required(),
    image : joi.string().required()
});