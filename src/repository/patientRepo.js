import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const findmany =async()=>{
  return await prisma.patient.findMany({include:{Responsibles : true}});
}


export const findPatientResponsible =async(id)=>{
   return await prisma.patient.findMany({where :{id:id} , select : {Responsibles : true } });
}

export const findPatient = async(id)=>{
   return await prisma.patient.findFirst({where:{id:Number(id)} , include : {Responsibles : true}})
}

export const findByID = async(patientID)=>{
   return await prisma.patient.findFirst({where:{patientID : patientID} , include : {Responsibles : true}})
}


export const findByNumber = async(number)=>{
   return await prisma.patient.findFirst({where:{tell:number}});
}
export const save = async (patient={})=>{
   return await prisma.patient.create({data:patient});
}

export const update = async(id ,patient={} )=>{
   return await prisma.patient.update({
      where:{id:Number(id)} ,
      data : {...patient}});
}

export const deletePatient = async(patientID) =>{
   return await prisma.patient.delete({where:{patientID : patientID}})
}


export const isExist = async(name,tell)=>{
    const Patientname =await  prisma.patient.findFirst({where:{name:name}})
    const Patienttell =await  prisma.patient.findFirst({where:{tell:tell}})
    return await (Patientname || Patienttell)
}

