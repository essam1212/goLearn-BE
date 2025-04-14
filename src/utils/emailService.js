// utils/sendEmail.js
import SibApiV3Sdk from 'sib-api-v3-sdk';


export const sendEmail = async (to, subject, htmlContent) => {
  const client = SibApiV3Sdk.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const emailData = {
    sender: { name: 'Go Learn', email: 'essam5ali2000@gmail.com' },
    to: [{ email: to }],
    subject,
    htmlContent,
  };

  return apiInstance.sendTransacEmail(emailData);
};


