import { PrismaClient } from "@prisma/client";
import { getPatient } from "../services/patientService.js";

const prisma = new PrismaClient();

export const findmany =async()=>{
  return await prisma.responsible.findMany({});
}

export const findResponsible = async(id)=>{
   return await prisma.responsible.findFirst({where:{id:Number(id)}})
}

export const getPatientID =async (patientID)=>{
    return prisma.patient.findFirst({where:{patientID:patientID} , include  :{Responsibles : true}})
}


export const getResponsibleEmailData =async (email)=>{
   return prisma.responsible.findFirst({where:{email :email} , select : {patient : {select : {Responsibles : true}}}})
}

export const getResponsibleEmailOnly =async (email)=>{
   return prisma.responsible.findFirst({where:{email :email}});
}



// console.log(await isResponsibleAccess());
export const findResponsibleByUserName = (UserName)=>{
   return prisma.responsible.findFirst({where:{UserName: UserName}})
}




// const patientResponsible = async( patientID , UserName )=>{
//    const patient = await getPatientID(patientID); 
//    if(!patient) return false
//    const responsible = await getResponsibleUser(UserName);
//    return patient.Responsibles.map((responsible)=>{
//       return responsible.UserName == UserName
//    })
// }




// export const isResponsibleAcces = await prisma.patient.findMany({select : {Responsibles : true}})
// const patients =  isResponsibleAcces.map((patient)=>{
//    return patient.Responsibles
// })
// const pppp= await getPatient(3)
// const  l=  patients.find((p)=> p)

// console.log(l);


export const findByNumber = async(number)=>{
   return await prisma.responsible.findFirst({where:{tell:number}});
}
export const save = async (responsible={})=>{
   responsible.age = parseInt(responsible.age);
   return await prisma.responsible.create({data:responsible});
}

export const update = async(id , responsible={})=>{
   return await prisma.responsible.update(
      {where:{id:Number(id)} , 
      data :{...responsible}});
}

export const deleteResponsible = async(id) =>{
   return await prisma.responsible.delete({where:{id:Number(id)}})
}


export const isExist = async(name,tell)=>{
   const resposnibleName =await  prisma.responsible.findFirst({where:{name:name}})
   const responsibleTell =await  prisma.responsible.findFirst({where:{tell:tell}})
   return await (resposnibleName || responsibleTell)
}

