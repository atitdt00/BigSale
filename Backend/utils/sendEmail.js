import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendEmail = async (to, resetUrl) => {
  await transport.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "password Reset",
    html: ` <h2>Reset Password</h2> 
    <a href="${resetUrl}">Click here to reset password</a>`,
  });
};

export default sendEmail;
