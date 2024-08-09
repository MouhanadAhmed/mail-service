// import { emailTemplate } from './emailTemplate.js';
import {emailTemplate} from './emailTemplate.js';
import {insideOutEmailTemplate} from './insideOutEmailTemplate.js'
import { createTransport } from 'nodemailer';
import express from 'express';
import  bodyParser   from 'body-parser';
import cors from 'cors'
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.post('/send-email', (req, res) => {
  const { name, email, message, subject,company,website,phone,service,adminMail } = req.body;


    const transporter = createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'serverinmarketing@gmail.com',
      pass: 'qjmwzmlklqcmzfdw'
    }
  });



    // send mail with defined transport object
     transporter.sendMail({
      from: '"IN Marketing mail service 👻" <serverinmarketing@gmail.com>', // sender address
      to: adminMail, // list of receivers
      subject: "New Lead", // Subject line
    //   text: "Hello world?", // plain text body
      html:emailTemplate({message,subject,name,company,website,phone,email,service}), // html body
    });
  
    console.log("Message sent: %s",message,subject );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  
  
 
    res.json({message:"success"})
});
app.post('/insideout/send-email', (req, res) => {
  const { name,  country,phone,service } = req.body;


    const transporter = createTransport({
    service: 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "clinic.insideout@gmail.com",
      pass: "lrymuyxusmudcrec"
    }
  });



    // send mail with defined transport object
     transporter.sendMail({
      from: '"inside out mail service " <clinic.insideout@gmail.com>', // sender address
      to: 'clinic.insideout@gmail.com', // list of receivers
      subject: "New Lead", // Subject line
    //   text: "Hello world?", // plain text body
      html:insideOutEmailTemplate({country,name,phone,service}), // html body
    });
  
    // console.log("Message sent: %s",subject );
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  
  
    fetch('https://sheetdb.io/api/v1/keiu5kxwag7fn', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          data: [
             {
              name:name,
              phone:phone,
              country:country,
              service:service
             }
          ]
      })
  })
    res.json({message:"success"})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});