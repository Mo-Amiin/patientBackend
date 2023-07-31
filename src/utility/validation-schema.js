import Joi from "joi"



export const adminSchema = {
    id: Joi.string().optional(),
    name: Joi.string().min(5).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
  };

export const patientSchema = {
    id:Joi.number().optional(),
    name : Joi.string().min(5).max(100).required(),
    patientID : Joi.string().min(5).max(13).required(),
    age: Joi.number().min(1).max(200).required(),
    tell : Joi.string().required(),
    sex : Joi.string().required(),
    password: Joi.string().min(3).required(),
}


export const responsibleSchema = {
    id:Joi.number().optional(),
    name : Joi.string().min(5).max(100).required(),
    age: Joi.number().min(1).max(200).required(),
    tell : Joi.string().required(),
    backup_tell : Joi.string().required(),
    email : Joi.string().email(),
    sex : Joi.string().required(),
    ResponsibleType : Joi.string().required(),
    patientId : Joi.string().optional(),
}


export const bothSchemaUpdate = {
    name : Joi.string().min(5).max(25).required(),
    tell : Joi.string().required(),
}

