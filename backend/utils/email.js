const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (options) => {
    const transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }

    };

    const transporter = nodemailer.createTransport(transport);

    const message = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(message);

//     try {
//     const info = await transporter.sendMail(message);
//     console.log("✅ Email sent:", info.messageId);
//     console.log("📨 Preview URL (Mailtrap):", info);
//     } catch (error) {
//     console.error("❌ Email sending failed:", error.message);
//     throw error;
//   }
};

module.exports = sendEmail;