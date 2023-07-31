import {findmany,findByNumber , save ,
    update , deleteResponsible, findResponsible, isExist , findResponsibleByUserName } from "../repository/responsibleRepo.js"
import {validateUtil} from "../utility/utlity.js"
import { responsibleSchema , bothSchemaUpdate} from "../utility/validation-schema.js"
import {apiRequestException} from "../exceptions/apiException.js"
import { getPatientByID } from "./patientService.js"


export const saveResponsible = async(responsible ={})=>{
   await validateUtil(responsible , responsibleSchema)
   const isResponsibleExist = await isExist(responsible.name , responsible.tell)
   if(isResponsibleExist) return  apiRequestException(`Error: this responsible is already registered`, 403) ;

   return await save(responsible);
}


export const getResponsible = async(id)=>{
   return( 
   (await findResponsible(id)) ||
   apiRequestException(`Error: responsible of this id ${id} is not found`, 404)
);
}

export const allResponsible = async()=>{
  return await findmany();
}

export const SearchByNumber = async(number)=>{
   return await findByNumber(number)
}

export const updateResponsible = async(id  , responsible ={})=>{
   const responsibleId = await getResponsible(id);
   if(!responsibleId) return   apiRequestException(`Error:  this id ${id} is not found`, 404)
   await validateUtil(responsible , bothSchemaUpdate)
   return await update(id  , responsible)
}

export const deleteResponsibles =async (id)=>{
   const responsibleId = await getResponsible(id);
   if(!responsibleId) return   apiRequestException(`Error:  this id ${id} is not found`, 404)
  return await deleteResponsible(id)
}


export const getResponsibleUserName = async(UserName)=>{
   return await  findResponsibleByUserName(UserName)
}


