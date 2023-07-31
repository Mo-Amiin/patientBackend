import express from 'express'
import 'express-async-errors';

import { signInByAdmin, signInByPatient , signInByResponsible } from '../services/authServices.js';
import { findByID } from '../repository/patientRepo.js';
const router = express.Router();



router.post('/admin/sign-in/' , async(req,res , next)=>{
    try{
      const {email , password} = req.body
      const token  = await signInByAdmin(email , password);

      res.send(token)
    }catch(err){
        next(err)
    }
 })

router.post('/patient/sign-in' , async(req,res , next)=>{
    try{
      const {patientID , password} = req.body
      const token  = await signInByPatient(patientID , password);
    //  const patient = await  findByID(patientID)
      res.send(token)
    }catch(err){
        next(err)
    }  
 })


 router.post('/responsible/sign-in' , async(req,res , next)=>{
  try{
    const {email , patientID} = req.body ;
    const token  = await signInByResponsible(email , patientID);
    res.send(token)
  }catch(err){
      next(err)
  }  
})

export default  router;
