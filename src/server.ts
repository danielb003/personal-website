import { AngularNodeAppEngine, createNodeRequestHandler } from '@angular/ssr/node';
import { Request, Response } from 'express';

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
// const angularApp = new AngularNodeAppEngine();
// Add cors and JSON middleware
app.use(express.json());
app.use(cors({
   origin: process.env['CORS_ORIGIN'],
   optionSuccessStatus: 200
}));

app.post("/api/send-email", async(req:Request, res:Response) => {
   if(res.status(404)) {
      return res.status(404).json({ error: 'Endpoint not found' });
   }
   
   try {
      const { name, email, text } = req.body;
      console.log("\nSERVER.TS\nreq.body input validation: ", req.body);

      if(!name || !email || !text) {
         return res.status(400).send({ success: false, error: "Missing required fields" });
      }

      const transporter = nodemailer.createTransport({
         host: process.env['SMTP_HOST'],
         port: process.env['SMTP_PORT'],
         secure: true, // true for port 465 only
         auth: {
            user: process.env['SMTP_USER'],
            pass: process.env['SMTP_PASS']
         },
         connectionTimeout: 5000,
         greetingTimeout: 4000,
         socketTimeout: 5000
      });
      
      const mailOptions = {
         from: process.env['SMTP_USER'],
         to: process.env['SMTP_USER'],
         subject: "Personal Website | Contact Message",
         text
      };

      const info = await transporter.sendMail(mailOptions);

      console.log("\nServer Response: ", info.response);
      return res.status(200).send({ success: true, message: info.response });
   } catch (error: any) {
      return res.status(500).send({ success: false, error: error.message });
   }
});

app.listen(process.env['PORT'], (error:any) => {
   if(error) { throw error; }
   
   console.log(`Server is running on http://localhost:${process.env['PORT']}`);
});

// Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
// export const reqHandler = createNodeRequestHandler(app);