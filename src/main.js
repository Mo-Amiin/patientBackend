import express from "express";
import exceptionHandler from "./exceptions/exception-handller.js";
import {addDefaultAdminAccount} from './services/adminServices.js'
import  cors  from 'cors';

import adminController from "./controllers/adminController.js";
import patientController from "./controllers/patientController.js";
import responsibleController from "./controllers/responsibleController.js";
import authController from "./controllers/authController.js";
import {findDailyReport , findWeeklyReport} from '../src/repository/report.js'



const app = express();
app.use(cors());


app.use(express.json());

app.use('/api/auth/' , authController);
app.use('/api/patients' , patientController);
app.use('/api/responsibles' , responsibleController);
app.use('/api/admin' , adminController);



addDefaultAdminAccount();

app.use(exceptionHandler);





const PORT = process.env.PORT || 3000 ;

app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT} `)
})