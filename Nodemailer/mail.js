const express=require('express');
const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');
const path =require('path');
 const jsonfile=require('jsonfile');

const app=express();

module.exports.mail= async (from_id,email_id,subject_mail,message_text,message_html)=>{

   let transporter = nodemailer.createTransport({
    service:'gmail',
    //port: 587,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: 'darkp251099@gmail.com', // generated ethereal user
      pass: 'dypatil@123' // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: from_id, // sender address
    to: email_id,// list of receivers
    subject: subject_mail, // Subject line
    text: message_text, // plain text body
    html: message_html // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  

}
//main().catch(console.error);
 