import { VercelRequest, VercelResponse } from "@vercel/node";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const transporter = nodemailer.createTransport({
   host: process.env['SMTP_HOST'],
   port: process.env['SMTP_PORT'],
   secure: process.env['SMTP_PORT'] === '465',
   auth: {
      user: process.env['SMTP_USER'],
      pass: process.env['SMTP_PASS']
   },
   connectionTimeout: 5000,
   greetingTimeout: 4000,
   socketTimeout: 5000
} as any);

export default async function handler(req: VercelRequest, res: VercelResponse) {
   // Using res.send() instead of res.json() because we need to declare raw text file
   if(req.method !== 'POST') {
      return res.status(405).send({ success: false, error: 'Method Not Allowed' });
   }
   
   // try {
   const { name, email, text } = req.body;

   if(!name || !email || !text) {
      return res.status(400).send({ success: false, error: "Missing required fields" });
   }

   if(!isValidEmail(email)) {
      return res.status(400).send({ success: false, error: "Invalid email address format" });
   }

   if(!name.trim() || !email.trim() || !text.trim()) {
      return res.status(400).send({ success: false, error: "Fields cannot be blank space strings" });
   }
   
   const mailOptions = {
      from: process.env['SMTP_USER'],
      to: process.env['SMTP_USER'],
      subject: "Personal Website | Contact Message",
      text
   };

   try {
      const info = await transporter.sendMail(mailOptions);

      return res.status(200).send({ success: true, message: info.response });
   } catch (error: any) {
      return res.status(500).send({ success: false, error: error.message });
   }
}

// DO NOT use app.list() for Vercel production, export the serverless function instead
// app.listen(process.env['PORT'], (error:any) => {
//    if(error) { throw error; }
//   
//    console.log(`Server is running on http://localhost:${process.env['PORT']}`);
// });