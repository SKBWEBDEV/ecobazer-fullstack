const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Email verification

const mailVerifycation = async (email, token) => {
  console.log("Trying to send verification email to:", email);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",

      to: email,

      subject: "Please verify your email - EcoBazer",

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
              "
            >
              Verify Email
            </a>

            <p>
              Thank you.
            </p>

          </div>

        </div>
      `,
    });

    console.log("Verification email sent:", data);

    return true;
  } catch (error) {
    console.log("Verification email error:", error.message);

    throw error;
  }
};

// Reset password email

const resetPasswordEmail = async (email, token) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",

      to: email,

      subject: "Reset Your EcoBazer Password",

      html: `
        <div style="font-family:Arial;padding:30px;background:#f5f5f5">

          <div style="background:white;padding:30px;border-radius:10px">

            <h2>Reset Your Password</h2>

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
  "
>
  Reset Password
</a>

<p style="margin-top:20px;color:#666;font-size:14px;">
  This password reset link will expire in <strong>10 minutes</strong>.
</p>

<p style="margin-top:20px;font-size:14px;">
  If the button doesn't work, copy and paste this link into your browser:
</p>

<p style="word-break:break-all;color:#2563eb;">
  ${process.env.FRONTEND_URL}/reset-password/${token}
</p>

<p style="margin-top:20px;color:#666;">
  If you did not request a password reset, you can safely ignore this email.
  Your password will remain unchanged.
</p>

          </div>

        </div>
      `,
    });

    console.log("Reset email sent:", data);

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
