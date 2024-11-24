import nodemailer from 'nodemailer';

// Create a reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_PORT === '465',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
    // authMethod: 'LOGIN',
    debug: true,  // Enable debug logs
    logger: true,  // Log to console
  });
};

// Shared email sending function
const sendEmail = async (mailOptions) => {
  const transporter = createTransporter();
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.response}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email: ' + error.message);
  }
};

export async function sendPasswordResetEmail(email, resetUrl) {
  console.log('Attempting to send password reset email');
  
  const mailOptions = {
    from: {
      name: 'Tyson Ely',
      address: process.env.MAILER_USER,
    },
    replyTo: `no-reply@${process.env.MAILER_HOST}`,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset for your MetaCyp account. Click this link to reset your password: ${resetUrl}

If you didn't request this, please ignore this email.

Best regards,
The MetaCyp Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your MetaCyp account.</p>
        <p>Click the button below to reset your password:</p>
        <p>
          <a href="${resetUrl}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 10px;">Reset Password</a>
        </p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The MetaCyp Team</p>
      </div>
    `,
  };

  return sendEmail(mailOptions);
}

export async function sendContactFormEmail(name, email, message) {
  console.log('Attempting to send contact form email');
  
  const mailOptions = {
    from: {
      name: process.env.MAILER_FROM,
      address: process.env.MAILER_USER,
    },
    to: process.env.MAILER_USER,
    replyTo: email,
    subject: 'Contact Form Submission',
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  };

  return sendEmail(mailOptions);
}