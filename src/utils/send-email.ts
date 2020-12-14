import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const options: SMTPTransport.Options = {
    host: process.env.EMAIL_HOST,
    secureConnection: false, // TLS requires secureConnection to be false
    port: parseInt(process.env.EMAIL_PORT), // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
     },
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    },
};

export const transporter = nodemailer.createTransport(options);


 