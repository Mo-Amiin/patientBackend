import {comparePassword , jwtToken ,  
    securityException} from "../security/securityConfig.js"
import { getPatient, getPatientByID, } from "./patientService.js";
import { apiRequestException } from "../exceptions/apiException.js";
import { getAdminByEmail } from "./adminServices.js";
import { getPatientID, getResponsibleEmailOnly } from "../repository/responsibleRepo.js";
import { getResponsibleUserName } from "./responsibleService.js";


const loggedUser = {
    user : null 
 } 

export const signInByAdmin =async (email , password)=>{
    await checkEmailOrPassword(email , password)
    const admin  = await getAdminByEmail(email) || securityException();
    const isCorrect = await  comparePassword(password , admin.password);
    if(!isCorrect) securityException();
    return  jwtToken(admin.accountType , admin.id);
}

export const signInByPatient =async (patientID , password)=>{
    const patient  = await getPatientByID(patientID) ||   
    apiRequestException("PatientID  or password are incorrect", 403) ;
    const isCorrect = await  comparePassword(password , patient.password);
    if(!isCorrect)  apiRequestException("PatientID or password are incorrect", 403) ;;
    return  jwtToken(patient.accountType , patient.patientID);
}

export const signInByResponsible =async (email,patientID)=>{
   const responsible  = await getResponsibleEmailOnly(email) ||   
    apiRequestException("email or patientId are incorrect", 403) ;
    const responsibleAccess = await patientResponsible(patientID , email);
    if(responsibleAccess == false) return apiRequestException("You are not authrize of this patientID ! ", 401) ;
    return  jwtToken( responsible.accountType, responsible.email);
}


export const patientResponsible = async( patientID , email )=>{
    const patient = await getPatientID(patientID);
    let  final  = false ;
    if(!patient) return false
     patient.Responsibles.filter((responsible)=>{
        console.log(responsible.email , email ,  "==========");

        if(responsible.email === email ) {
            final=true ;
        }else if(!responsible.email === email ) {
            final=false
        }
       
    })
    console.log(final);
    return final;
 }


// console.log(await patientResponsible('p1101' , 'xusen'));










const checkEmailOrPassword = async (email = "", password= "" ) => {
    email =  !email ? "Email is required " : "valid";
    password = !password ? "password is required " : "Valid ";
      return   { email, password };
};
    