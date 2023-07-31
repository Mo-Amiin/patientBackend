import Joi from "joi"
import { apiRequestException } from '../exceptions/apiException.js'
import { patientSchema } from "./validation-schema.js"
import { PrismaClient } from "@prisma/client";
import nodemailer from 'nodemailer';
import { findByID, findPatient } from "../repository/patientRepo.js";

const prisma = new PrismaClient();

export const validateUtil = (payload, schema) => {
  if (!payload) apiRequestException("Payload is not be null", 400);
  const { error, value } = Joi.validate(payload, schema);
  if (error) apiRequestException(`Error : ${error.details[0].message}`, 403);
  return value;
};






// async function sendEmails() {
//   try {
//     // Fetch user data from Prisma
//     const Responsibles = await prisma.patient.findMany({select : {Responsibles : true}});

//     // Create Nodemailer transporter with SMTP settings
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'patientcondition101@gmail.com',
//         pass: 'patient101',
//       },
//     });

//     transporter.sendMail({
//       from: 'patientcondition101@gmail.com',
//       to: 'amiinaliabdullaahi@gmail.com',
//       subject: 'Test Email',
//       text: 'Hello, this is a test email using Nodemailer and Gmail.',
//     }, (error, info) => {
//       if (error) {
//         console.error('Error sending email:', error);
//       } else {
//         console.log('Email sent:', info.response);
//       }
//     });  
//   }
// }

// sendEmails();





export async function sendEmail(patientID, subject, body) {
  const pateint = await findByID(patientID);
  if (!pateint) return 
  try {
    // Create a Nodemailer transporter using the Gmail service
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: 'Gmail',
      auth: {
        user: 'patientcondition101@gmail.com',
        pass: 'xwocrnpuiiqnvdfb ',
      },
      tls: {
        rejectUnauthorized: true
      }
    });

    const users = await prisma.patient.findMany({ where: { patientID: patientID }, select: { Responsibles: true } });
    const recipients = users.map((responsible) => responsible.Responsibles);
    const recipient = recipients.flat();
    const email = recipient.map((user) => user.email)
    // Send email using the transporter
    const info = await transporter.sendMail({
      from: 'patientcondition101@gmail.com',
      to: email.join(', '),
      subject: subject,
      text: body,
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }

  return "id is not found"
}


// Call the sendEmail function to send the email

