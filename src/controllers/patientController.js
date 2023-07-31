import express from 'express'
import 'express-async-errors';
import Twilio from 'twilio';
import jwt from 'jsonwebtoken'
import {
    allPatient, SearchByNumber, savePatient, getPatient ,
    updatePatient, deletePatients, report, sendingRiskNotifications, getPatientByID, stateData
} from "../services/patientService.js"
import { authResponsible, authorize } from '../middleware/auth.js';
import { Role, SECRET } from '../security/securityConfig.js';
import  admin from 'firebase-admin';
import  serviceAccount  from "../testesp32-fb1ee-firebase-adminsdk-eqdlm-43e688061c.json"  assert { type: "json" };;
import { PrismaClient } from "@prisma/client";
import { BodyTemp, RoomTemp, findBodyTemp, findHearBeat, findHumidity, findOxygen, findRoomTemp, heart, humidityRoom, oxygen } from '../repository/report.js';
import { getResponsibleEmailData, getResponsibleEmailOnly } from '../repository/responsibleRepo.js';
import { apiRequestException } from '../exceptions/apiException.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://testesp32-fb1ee-default-rtdb.firebaseio.com/', // Replace with your Firebase project's database URL
});
const db = admin.database();


const prisma = new PrismaClient();


const accountSid = 'AC70e7727c3f416f540965cae27d7fc350';
const authToken = '169f0e35da9805e3b210d091c3ce6fbd';
const client = Twilio(accountSid, authToken);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://testesp32-fb1ee-default-rtdb.firebaseio.com/', // Replace with your Firebase project's database URL
// });

// const db = admin.database();


const router = express.Router();

router.get('/currentSensorData/' ,async (req, res) => {
  const token  = req.headers.authorization;
  // Verify the token
  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      // Token is invalid or has expired
      return res.status(401).json({ error: 'Invalid token' });
    }
  const {id} = decodedToken ;

  const patientId = await getPatientByID(id) ;
  if(!patientId) return  res.status(401).json({error : "Error this id is not found"});
  const patient  = await prisma.patient.findFirst({where : {patientID : patientId.patientID} , select : {Report : {select : {id : true}}}});
  if(!patient ) return res.status(401).json({error : "Errorthis id is not found"});
  const report = patient.Report.flat() ;
  console.log(patient);
  const reportID = report[0]?.id;
  if(reportID == undefined)  return res.status(200).json({message : "there is no data of this patient"})

  const realTime_SensorData = {
    BodyTemp : {data : "0" , state : ""} ,
    RoomTemp : {data : "0" , state : ""} ,
    oxygen : {data : "0" , state : ""} ,
    falling : {data : "0" , state : ""},
    heart : {data : "0" , state : ""},
    LONGITUDE : "0" ,
    LATITUDE  : "0" ,
    HumidityRoom : {data : "0" , state : ""} ,
  }

    const BodyTempUrl = db.ref('/Bodytemp');
    BodyTempUrl.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 38 , 35)
      realTime_SensorData.BodyTemp.data = data ;
      realTime_SensorData.BodyTemp.state = state ;
      sendingRiskNotifications(data , 38 , patientId.patientID ,patientId.name)
      const latestRecord = await findBodyTemp() ;
     if(latestRecord == null) return await BodyTemp({data  , reportID , state });
     if(latestRecord.data == data ) return 
      await BodyTemp({data  , reportID , state });
    });


    const RoomTempUrl = db.ref('/RoomTemp');
    RoomTempUrl.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 32 , 25)
      realTime_SensorData.RoomTemp.data= data ;
      realTime_SensorData.RoomTemp.state= state ;
      const latestRecord = await findRoomTemp() ;
      if(latestRecord == null) return   await RoomTemp({data , reportID , state})
      if(latestRecord.data == data ) return 
      await RoomTemp({data , reportID , state})
    });

    const HeartBeatUrl = db.ref('/HeartBeat');
    HeartBeatUrl.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 10 , 5 )
      realTime_SensorData.heart.data = data ;
      realTime_SensorData.heart.state= state ;
      const latestRecord = await findHearBeat() ;
      if(latestRecord == null) return  await heart({data , reportID , state})
      if(latestRecord.data == data  ) return 
      await heart({data , reportID , state})
    });

    const HumidityRoom = db.ref('/HumidityRoom');
    HumidityRoom.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state =  stateData(data , 32 , 25)
      realTime_SensorData.HumidityRoom.data =  data
      realTime_SensorData.HumidityRoom.state= state ;
      const latestRecord = await findHumidity() ;
      if(latestRecord == null) return  await humidityRoom({data , reportID , state})
      if(latestRecord.data == data  ) return 
      await humidityRoom({HumidityData , reportID , state})
    });


    const LATITUDE = db.ref('/LATITUDE');
    LATITUDE.once('value', async (snapshot) => {
      const LATITUDEDATA = snapshot.val();
      realTime_SensorData.LATITUDE = LATITUDEDATA ;
    });

    const LONGITUDE    = db.ref('/LONGITUDE');
    LONGITUDE.once('value', async (snapshot) => {
      const LONGITUDEDATA = snapshot.val();
      realTime_SensorData.LONGITUDE = LONGITUDEDATA ;
    });

    const Oxygen = db.ref('/Oxygen');
    Oxygen.once('value', async (snapshot) => {
      const data = snapshot.val();
      const state = stateData(data , 32 , 25)
      realTime_SensorData.oxygen.data = data ;
      realTime_SensorData.oxygen.state = state ;
      const latestRecord = await  findOxygen();
      if(latestRecord == null) return  await  oxygen({data , reportID , state})
      if(latestRecord.data == data  ) return   res.status(200).json(realTime_SensorData)
      await oxygen({oxygenData , reportID , state})
      return  res.status(200).json(realTime_SensorData)
    });
  })


  
});


// await BodyTemp({bodyTemp : "29" , reportID  : 1, state : "High" });




router.get('/report/:reportType/', async (req, res) =>  {
  const token  = req.headers.authorization;
  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      // Token is invalid or has expired
      return res.status(401).json({ error: 'Invalid token' });
    }
    const {id} = decodedToken ;
    console.log(id);
  const {reportType } = req.params ;
  const CompleteReport =await report(reportType , id);
 return  res.send(CompleteReport);
})

});




router.get('/room/' ,async (req,res)=>{
  const bodyTemp = await prisma.roomTemp.findFirst({});
  res.send(bodyTemp)
})

router.get('/report/' ,async (req,res)=>{
  const report = await prisma.report.findMany({include:{BodyTemp:true}});
  res.send(report)
})

router.get('/bodytemp/' ,async (req,res)=>{
  const bodyTemp = await prisma.RoomTemp.findMany({});
  res.send(bodyTemp)
})
router.post('/report/' ,async (req,res)=>{
  const report = await prisma.report.create({data : {patientId : req.body.patientId}});
  res.send(report)
})

router.put('/bodytemp/:id' ,async (req,res)=>{
  const {id} = req.params
  const bodyTemp = await prisma.bodyTemp.update({
    where:{id:Number(id)} ,
    data : {...req.body}
  });
  
  res.send(bodyTemp)
})

router.put('/report/:id' ,async (req,res)=>{
  const { id} = req.params
  const report = await prisma.report.create({where:{id:Number(id)} , data : {patientId : req.body.patientId}});
  res.send(report)
})


router.delete('/bodytemp/' ,async (req,res)=>{
  const bodyTemp = await prisma.bodyTemp.deleteMany({});
  res.send(bodyTemp)
})



router.delete('/report/' ,async (req,res)=>{
  const report = await prisma.report.deleteMany({});
  res.send(report)
})



// router.get('/userView/:patientID' , async (req, res) => {
//   const { patientID } = req.params;
//   const patient = await getPatientByID(patientID);
//   res.send(patient);
// });


// Replace

router.post('/send-sms', async(req, res) => {

// Initialize the Twilio client
// Send bulk messages

// const fromNumber = 'YOUR_PHONE_NUMBER'; // Replace with your Twilio phone number
const recipients = ['+252612690866', '+252614388919']; // Replace with the recipient phone numbers
// const message = 'Hello, this is a bulk SMS message!'; 
  try {
    for (const recipient of recipients) {
      await client.messages.create({
        body: message,
        from: '+14847598049',
        to: recipients,
      });
    }

    console.log('Bulk messages sent successfully!');
  } catch (error) {
    console.error('Error sending bulk messages:', error);
  }


    // const { from, to, message } = req.body;
    // client.messages
    //   .create({
    //     body: message,
    //     from: from,
    //     to: to
    //   })
    //   .then(message => {
    //     console.log('SMS sent successfully. Message SID:', message.sid);
    //     res.status(200).json({ success: true, message: 'SMS sent successfully.' });
    //   })
    //   .catch(error => {
    //     console.error('Error sending SMS:', error.message);
    //     res.status(500).json({ success: false, message: 'Failed to send SMS.' });
    //   });
});



router.get('/userProfile/', async(req, res) => {
  // Get the token from the request headers
  const token = req.headers.authorization; 

  // Verify the token
  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      // Token is invalid or has expired
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Token is valid
    const { id } = decodedToken;
    
    if(id.includes("@")){
      // const responsibleDta  = await getResponsibleEmailData(id) 
      const responsibleProfile = await getResponsibleEmailOnly(id)
      res.status(200).json( responsibleProfile );
    }else{

    const patient  = await getPatientByID(id) 
    // Do something with the user information
    res.status(200).json(patient);

    }

  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const patients = await getPatientByID(id);
  res.send(patients);
});




router.get('/', async (req, res) => {
  const patients = await allPatient();
  res.send(patients)
})





router.post('/', async (req, res) => {
    await savePatient(req.body)
    res.send("successfully created")

})



router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const patients = await updatePatient(id, req.body)
        res.send(patients)

    } catch (e) {
        next(e)
    }

})


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const patients = await deletePatients(id)
    res.send(patients)

})



export default router;
