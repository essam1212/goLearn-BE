import mailjet from 'node-mailjet';
import 'dotenv/config'; // تأكد إنها في الأعلى

const mailjetClient = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const result = await mailjetClient
      .post('send')
      .request({
        FromEmail: process.env.MAILJET_EMAIL, // لازم يكون الإيميل اللي موثق عندك في Mailjet
        FromName: 'Go Learn',
        Subject: subject,
        'Text-part': htmlContent,
        Recipients: [{ Email: to }],
      });

    console.log('✅ Email sent:', result.body);
    return result.body;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};
