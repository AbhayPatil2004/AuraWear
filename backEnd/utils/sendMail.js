import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import nodemailer from "nodemailer";

async function sendMailToUser(email, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: body,
  });

  console.log("Email sent successfully");
}

export default sendMailToUser;
