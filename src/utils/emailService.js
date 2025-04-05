import mailjet from 'node-mailjet';

const mjClient = mailjet.apiConnect('3bd4d23afcd82586aee4631a9f991164', 'e03196406f4503471e4331d009c21f82');


 
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const request = await mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "essam5ali2000@gmail.com",
            Name: "Go Learn",
          },
          To: [
            {
              Email: to,
              Name: "Recipient",
            },
          ],
          Subject: subject,
          HTMLPart: htmlContent,
        },
      ],
    });

    console.log("✅ Email sent:", request.body.Messages[0].To[0].Email);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return false;
  }
};   
      
    

