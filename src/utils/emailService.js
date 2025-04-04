import nodemailer from 'nodemailer';
// إعداد Sendinblue مع Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false, // لازم تكون false لاستخدام TLS
  auth: {
    user: process.env.SENDINBLUE_EMAIL, // البريد الإلكتروني الخاص بك في Sendinblue
    pass: process.env.SENDINBLUE_API_KEY, 
  },
});
export const sendEmail = async (to, subject, htmlContent) => {
    try{
      const info=await transporter.sendMail({
        from: process.env.SENDINBLUE_EMAIL, // البريد الإلكتروني الخاص بك في Sendinblue
        to, // البريد الإلكتروني المستلم
        subject, // موضوع البريد الإلكتروني
        html: htmlContent, // محتوى البريد الإلكتروني
      });
      console.log('✅ Email sent:', info.messageId);
      return true;


    } catch (error) {
      console.error('❌ Error sending email:', error);
      return false;
      };
    }
      
      
    

