import { AngularNodeAppEngine, createNodeRequestHandler } from '@angular/ssr/node';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
// require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
// Add cors and JSON middleware
app.use(cors({
   origin: process.env['CORS_ORIGIN'],
   methods: ['POST', 'OPTIONS'],
   optionSuccessStatus: 200,
   allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
   // host: process.env['SMTP_HOST'],
   // port: process.env['SMTP_PORT'],
   // secure: process.env['SMTP_PORT'] === '465',
   service: 'gmail', // Nodemailer maps this to smtp.gmail.com internally
   auth: {
      user: process.env['SMTP_USER'],
      pass: process.env['SMTP_PASS']
   },
   connectionTimeout: 5000,
   greetingTimeout: 4000,
   socketTimeout: 5000
});

app.post("/api/send-email", async(req: Request, res: Response) => {
   console.log("Inside Node.js file");
   if(req.method === 'OPTIONS') {
      return res.status(200).end();
   }

   if(req.method !== 'POST') {
      return res.status(405).send({ success: false, error: 'Method Not Allowed' });
   }

   if(res.status(404)) {
      return res.status(404).send({ success: false, error: 'Endpoint not found' });
   }
   
   try {
      const { name, email, text } = req.body;
      console.log("\nSERVER.TS\nreq.body input validation: ", req.body);

      if(!name || !email || !text) {
         return res.status(400).send({ success: false, error: "Missing required fields" });
      }

      if(!name.trim() || !email.trim() || !text.trim()) {
         return res.status(400).send({ success: false, error: "Fields cannot be blank space strings" });
      }
      
      const mailOptions = {
         from: process.env['SMTP_USER'],
         to: process.env['SMTP_USER'],
         subject: "Personal Website | Contact Message",
         text,
         html: `<h1>mailOptions works!</h1>`
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("\nServer Response: ", info.response);
      return res.status(200).send({ success: true, message: info.response });
   } catch (error: any) {
      return res.status(500).send({ success: false, error: error.message });
   }
});

// REMOVED app.list() -> Vercel handles the server execution logic automatically and export is added
// app.listen(process.env['PORT'], (error:any) => {
//    if(error) { throw error; }
   
//    console.log(`Server is running on http://localhost:${process.env['PORT']}`);
// });
export default app;

// Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
// export const reqHandler = createNodeRequestHandler(app);