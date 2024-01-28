import { Router } from "express";
import nodemailer from "nodemailer";
import sanitizeHtml from 'sanitize-html';

const router = Router();

const sendEmail = async (name, address, email, phone, subject, comment) => {
    const output = `
      <h4>You have a new message</h4>
      <h2>Message Details</h2>
      <ul>
          <li>Name: ${sanitizeHtml(name)} </li>
          <li>Address: ${sanitizeHtml(address)} </li>
          <li>Email: ${sanitizeHtml(email)} </li>
          <li>Phone Number: ${sanitizeHtml(phone)} </li>
          <li>Subject: ${sanitizeHtml(subject)} </li>
          
      </ul>
      <h3>Message</h3>
      <p>${sanitizeHtml(comment)} </p>
    `;
  
    const transporter = nodemailer.createTransport({
      service: 'Zoho',
      host: 'smtp.zoho.com',
      port: 587,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
      
    });
  
    try {
      const info = await transporter.sendMail({
        from: '"Info" <info@earthplanetminerals.com>',
        to: 'info@earthplanetminerals.com',
        subject: 'Contact Form Mesaage - Earth Planet Minerals',
        html: output,
      });
  
      return info.messageId;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  };
  
  router.post('/submitMessage', async (req, res) => {
    try {
      const { name, address, email, phone, subject, comment } = req.body;
  
      // Basic form validation
      if (!name || !phone || !email || !comment || !address || !subject) {
        return res.render('contact/includes.ejs', { error: 'All fields are required.' });
      }
  
      const messageId = await sendEmail(name, address, email, phone, subject, comment);
      
        res.render('contact/includes.ejs', { msg: 'Message sent successfully!'});
    } catch (error) {
      console.error(error);
      res.render('contact/includes.ejs', { error: 'Failed to submit the form. Please try again.' });
    }
  });
export default router;
