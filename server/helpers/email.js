import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

class HelperEmail {
  static sendEmail(email, token) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVICES,
        pass: process.env.EMAIL_SERVICES_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_SERVICES,
      to: email,
      subject: 'Opim- account verification',
      html: `
        <p> User this link to verify your account : <a href='https://opim.herokuapp.com/opim-api/v1/account-validation?tk=${token}'> Activate my account  </a> </p>
      `
    };

    transporter.sendMail(mailOptions);
  }
}

export default HelperEmail;
