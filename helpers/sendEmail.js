import nodemailer from "nodemailer";

import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join("config", ".env") });

const { META_FROM, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_FROM,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: META_FROM };
  return transport.sendMail(email);
};

export default sendEmail;

// const email = {
//   to: "vakidaj373@tospage.com",
//   from: "tetiana_udod@meta.ua",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
