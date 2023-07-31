import { findPatient, findPatientResponsible } from "../repository/patientRepo.js";
import { } from "../repository/responsibleRepo.js";
import { authorizeAccount, verifyToken } from "../security/securityConfig.js";
import { PrismaClient } from "@prisma/client";
import { getPatient, getPatientByID } from "../services/patientService.js";
import { patientResponsible } from "../services/authServices.js";
import { apiRequestException } from "../exceptions/apiException.js";



export async function authorize(req, res, next) {
    const accessToken = req.header("authorization");
    const auth = authorizeAccount(accessToken, next, this);
    const authRes = await authResponsible(req, res, next, 'authorization');
    
    if (auth == true && authRes == false ) {
        return   next()
    }else if(auth == false && authRes == true){
        return next();
    }else{
        apiRequestException("your are not authrize for this patient" , 401);
    }
    
    
}


export const authResponsible = async (req, res, next, token) => {
    const patient =  getPatient(req.params.id);
    const accessToken = req.header(token);
    if (!accessToken) return apiRequestException("Invalid token", 401);
    const { id } = verifyToken(accessToken);
    console.log((await patient).patientID, id);
    const isResponsibleAuth = await patientResponsible((await patient).patientID, id);
    console.log(isResponsibleAuth);
    if (isResponsibleAuth == false) return false
    return true;
}



// export function authorize(req, res, next) {
//     const accessToken = req.header("x-auth-token");
//     authorizeAccount(accessToken, next, this)
// }

// export const authResponsible = async(req,res,next)=>{
//      const patient =  getPatient( req.params.id) ;   
//      const accessToken = req.header("x-auth-token");
//      if (!accessToken) return  apiRequestException("Access denied", 401);
//      const { id} = verifyToken(accessToken);
//      console.log((await patient).patientID  , id);
//      const isResponsibleAuth = await patientResponsible((await patient).patientID, id);
//     try{
//         if(isResponsibleAuth == false) return  apiRequestException("you are not authrize this patient" , 401);
//              next()
//         }catch (e){
//             next(e)
//     }
// }

