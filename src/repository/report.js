import { PrismaClient } from "@prisma/client";
import { getPatient, stateData } from "../services/patientService.js";
import { DateTime } from 'luxon';
import  serviceAccount  from "../testesp32-fb1ee-firebase-adminsdk-eqdlm-43e688061c.json"  assert { type: "json" };;




const prisma = new PrismaClient();

const calculateAverage = (data) => {
  const theData = data.map((str) => parseInt(str));
  const totalAmount = theData.reduce((sum, item) => sum + item, 0);
  const average = totalAmount / data.length;
  return average.toFixed(2);
};



export const findDailyReport = async (id = "") => {
  if (typeof id != 'string') return null
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
 

  const dailyReport = await prisma.report.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      patientId: id
    },
    select: { 
      BodyTemp: { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],} , },

     RoomTemp:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Heart:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Oxygen:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Falling: true }
  });


  const BodyTemp =  dailyReport.map((t)=>t.BodyTemp).flat();
  const Roomtemp =  dailyReport.map((t)=> t.RoomTemp).flat();
  const Heart =  dailyReport.map((t)=>t.Heart).flat();
  const oxygen =  dailyReport.map((t)=>t.Oxygen).flat();
  const falling =  dailyReport.map((t)=>t.Falling).flat();


  const dailySensorData = {
    BodyTemp : BodyTemp ,
    Roomtemp : Roomtemp ,
    Heart : Heart ,
    oxygen : oxygen , 
    falling : falling
  }
  return dailySensorData
}



export const findWeeklyReport = async (id = "") => {
  if (typeof id != 'string') return null
  const today = new Date();
  const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0);
  const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()), 23, 59, 59);
 
  const dailyReport = await prisma.report.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
      patientId: id
    },
    select: { 
      BodyTemp: { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],} , },

     RoomTemp:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Heart:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Oxygen:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Falling: true }
  });


  const BodyTemp =  dailyReport.map((t)=>t.BodyTemp).flat();
  const Roomtemp =  dailyReport.map((t)=> t.RoomTemp).flat();
  const Heart =  dailyReport.map((t)=>t.Heart).flat();
  const oxygen =  dailyReport.map((t)=>t.Oxygen).flat();
  const falling =  dailyReport.map((t)=>t.Falling).flat();


  const weeklySensorData = {
    BodyTemp : BodyTemp ,
    Roomtemp : Roomtemp ,
    Heart : Heart ,
    oxygen : oxygen , 
    falling : falling
  }
  

  return weeklySensorData
  
}




export const findMonthlyReport = async (id = "") => {
  if (typeof id != 'string') return null
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);

  const dailyReport = await prisma.report.findMany({
    where: {
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
      patientId: id
    },
    select: { 
      BodyTemp: { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],} , },

     RoomTemp:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Heart:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Oxygen:  { where: {
      OR: [
        { state : "High" },
        { state : "low"},
      ],
    } ,
    },
    Falling: true }
  });


  const BodyTemp =  dailyReport.map((t)=>t.BodyTemp).flat();
  const Roomtemp =  dailyReport.map((t)=> t.RoomTemp).flat();
  const Heart =  dailyReport.map((t)=>t.Heart).flat();
  const oxygen =  dailyReport.map((t)=>t.Oxygen).flat();
  const falling =  dailyReport.map((t)=>t.Falling).flat();


  const monthlySensorData = {
    BodyTemp : BodyTemp ,
    Roomtemp : Roomtemp ,
    Heart : Heart ,
    oxygen : oxygen , 
    falling : falling
  }
  

  return monthlySensorData

}



export const BodyTemp = async (bodytemprature = {}) => {
  return await prisma.bodyTemp.create({ data: { ...bodytemprature } })
}

export const saveReport = async (patientId) => {
  return await prisma.report.create({data : {patientId : patientId}})
}


export const findBodyTemp = async () => {
  return await prisma.bodyTemp.findFirst({ orderBy : {id : 'desc'}})
}


export const findRoomTemp = async () => {
  return await prisma.roomTemp.findFirst({ orderBy : {id : 'desc'}})
}


export const findHearBeat = async () => {
  return await prisma.heart.findFirst({ orderBy : {id : 'desc'}})
}


export const findOxygen = async () => {
  return await prisma.oxygen.findFirst({ orderBy : {id : 'desc'}})
}

export const findHumidity = async () => {
  return await prisma.humidity.findFirst({ orderBy : {id : 'desc'}})
}



export const humidityRoom = async (bodytemprature = {}) => {
  return await prisma.humidity.create({ data: { ...bodytemprature } })
}

export const RoomTemp = async (roomTemperature = {}) => {
  return await prisma.roomTemp.create({ data: { ...roomTemperature } })
}

export const heart = async (Heart = {}) => {
  return await prisma.heart.create({ data: { ...Heart } })
}

export const oxygen = async (oxygen = {}) => {
  return await prisma.oxygen.create({ data: { ...oxygen } })
}

export const falling = async (falling = {}) => {
  return await prisma.falling.create({ data: { ...falling } })
}











