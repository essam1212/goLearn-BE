import nodemailer from 'nodemailer';
export const sendEmail = async (to, subject, text) => {
    try{
        const transporter =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.nodeMailerEmail,
                pass:process.env.nodeMailerPassword
            }
        })
        const mailOptions = {
            from: process.env.nodeMailerEmail,
            to,
            subject,
            text
          };
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };
      
      
    

