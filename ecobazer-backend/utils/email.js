const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

// Email verification

const mailVerifycation = async (email, token) => {
  console.log("Trying to send verification email to:", email);
  try {
    const info = await transporter.sendMail({
      
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Please verify your email",

      html: `

<div style="font-family:Arial;padding:30px;background:#f5f5f5">


<div style="background:white;padding:30px;border-radius:10px">


<h2>Welcome to EcoBazer 👋</h2>


<p>
Thank you for creating an account.
Please verify your email address.
</p>


<a 
href="${process.env.FRONTEND_URL}/verify-email/${token}"

style="
background:#4f46e5;
color:white;
padding:12px 20px;
border-radius:6px;
text-decoration:none;
display:inline-block;
">

Verify Email

</a>


<p>
Thank you.
</p>


</div>

</div>

`,
    });
    console.log("Email sent successfully");
    console.log("Verification email sent:", info.messageId);

    return true;
  } catch (error) {
  console.log("Verification email error:", error);
  throw error;
}
};

// Reset password email

const resetPasswordEmail = async (email, token) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Reset your password",

      html: `

<div style="font-family:Arial;padding:30px;background:#f5f5f5">


<div style="background:white;padding:30px;border-radius:10px">


<h2>Password Reset</h2>


<p>
We received a request to reset your password.
</p>


<a

href="${process.env.FRONTEND_URL}/reset-password/${token}"

style="
background:#2563eb;
color:white;
padding:12px 20px;
border-radius:6px;
text-decoration:none;
display:inline-block;
">

Reset Password

</a>



<p>
If you didn't request this, ignore this email.
</p>


</div>

</div>

`,
    });

    console.log("Reset email sent:", info.messageId);

    return true;
  } catch (error) {
    console.log("Reset email error:", error.message);

    return false;
  }
};

module.exports = {
  mailVerifycation,
  resetPasswordEmail,
};
