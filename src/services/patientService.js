import { apiRequestException } from '../exceptions/apiException.js'
import { patientSchema , bothSchemaUpdate} from "../utility/validation-schema.js"
import {sendEmail, validateUtil} from '../utility/utlity.js'
import {findmany,findByNumber , save ,
     update , deletePatient, findPatient, isExist , findByID } from "../repository/patientRepo.js"
import { encodePassword } from '../security/securityConfig.js'
import { BodyTemp, findDailyReport, findMonthlyReport, findWeeklyReport, saveReport } from '../repository/report.js'


export const savePatient = async(patient={})=>{
    patient.password = await encodePassword(patient.password)
    await validateUtil(patient , patientSchema)
    const isPatientExist = await isExist(patient.name , patient.tell)
    if(isPatientExist) return  apiRequestException(`Error: this patient is already registered`, 403)
     await save(patient);
     await saveReport(patient.patientID)
}

export const getPatient = async(id)=>{
  return (
    (await findPatient(id)) || 
     apiRequestException(`Error: patient of this id ${id} is not found -----`, 404)
  );
}

export const getPatientByID =async (id)=>{
    return await findByID(id)
}

export const allPatient = async()=>{
   return await findmany();
}
export const SearchByNumber = async(number)=>{
    return await findByNumber(number)
}

export const updatePatient = async(id , patient = {})=>{
    const patientId = await getPatientByID(id);
    if(!patientId) return   apiRequestException(`Error: patient of this id ${id} is not found`, 404);
    patient.password = await encodePassword(patient.password)
    await validateUtil(patient , bothSchemaUpdate)
    return await update(id , patient)

};

export const deletePatients =async (id)=>{
    const patientId = await getPatientByID(id);
    if(!patientId) return   apiRequestException(`Error: patient of this id ${id} is not found`, 404)
    return await deletePatient(id) 
}


export const report = async(reportType = "" , patientId = "")=>{
    if(typeof reportType != 'string') return apiRequestException(`Error: please make sure report type is correct  ${reportType}`, 404)
    const patient = await getPatientByID(patientId);
    if(!patient) return  apiRequestException(`Error: patient of this id ${patientId} is not found`, 404)

    if(reportType.toUpperCase() == 'daily'.toUpperCase()){
        return findDailyReport(patientId);
    }else if(reportType.toUpperCase() == 'weekly'.toUpperCase()){
        return findWeeklyReport(patientId);
    }else if(reportType.toUpperCase() == 'monthly'.toUpperCase()){
        return findMonthlyReport(patientId);
    }else{
        return apiRequestException(`Error: Report type of this  ${reportType} is not found`, 404)
    }
}


export const sendingRiskNotifications = async(data , high , id , message )=>{
   if(data >= high){
      await sendEmail(id, "Patient Emergency Condition", message);
      // sendning sms
      
   }
}




export const  stateData =  (currentData , highData  , lowData)=>{
    if(currentData >=  highData ) {
     return "High"
    }else if (currentData > lowData && currentData <= highData){
     return "Normal"
    }else if(currentData < lowData){
     return "low"
    }
 }
 