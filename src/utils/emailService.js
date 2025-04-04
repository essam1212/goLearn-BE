import mailjet from 'node-mailjet';

const mjClient = mailjet.apiConnect('3bd4d23afcd82586aee4631a9f991164', 'e03196406f4503471e4331d009c21f82');


 
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const request = await mjClient
      .post('send')
      .request({
        FromEmail: 'essam5ali2000@gmail.com', // بريدك الإلكتروني
        FromName: 'Essam Ali',  // اسمك أو اسم المشروع
        Subject: subject,  // موضوع الإيميل
        'Html-Part': htmlContent,  // محتوى HTML (اختياري)
        Recipients: [{ Email: to }],  // عنوان المستلم
      });

    console.log('✅ Email sent successfully:', request.body);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};
      
      
    

