import nodemailer from 'nodemailer';
export const sendEmail = async (to, subject, htmlContent) => {
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
            html: htmlContent
          };
          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };
      
      
    

