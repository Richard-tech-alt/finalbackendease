const nodemailer = require('nodemailer');

// SMTP config
const smtpHost = 'smtp.hostinger.com';
const smtpPort = 465;
const smtpUser = 'info@easewithdraw.com';
const smtpPass = 'Guru@Guru123';

// Create transporter
const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: {
        user: smtpUser,
        pass: smtpPass
    }
});

async function sendWelcomeEmail(to, subject) {
    try {
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #f9f9f9;
              padding: 0;
              margin: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border: 1px solid #e4e4e4;
              border-radius: 8px;
              overflow: hidden;
            }
            .header {
              text-align: center;
              padding: 20px;
              background-color: #ffffff;
              border-bottom: 1px solid #e4e4e4;
            }
            .logo {
              max-width: 150px;
              height: auto;
            }
            .content {
              padding: 20px;
            }
            .content h2 {
              color: #2d89ef;
              margin-top: 0;
            }
            .cta-button {
              display: inline-block;
              background-color: #2d89ef;
              color: #ffffff;
              padding: 12px 20px;
              border-radius: 4px;
              text-decoration: none;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              font-size: 12px;
              color: #777777;
              text-align: center;
              padding: 15px;
              background-color: #f9f9f9;
              border-top: 1px solid #e4e4e4;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img class="logo" src="https://res.cloudinary.com/dluma1hts/image/upload/v1754981845/easy-withdraw-logo_yrtrgp.png" alt="EaseWithdraw Logo" />
            </div>
            <div class="content">
              <h2>Welcome to EaseWithdraw – Crypto Edition</h2>
              <p>Already using CashApp, Binance, Coinbase, TrustWallet, PayPal, or Robinhood?</p>
              <p>Now’s the time to turn them into income-generating tools. With us, you can:</p>
              <ul>
                <li>Get your own Crypto Card</li>
                <li>Start building side income or passive revenue</li>
                <li>Get real support for your financial journey</li>
              </ul>
              <p>We believe everyone can earn smarter, not harder.</p>
              <a href="https://easewithdraw.com" class="cta-button">Start Now – It’s Fast & Free</a>
              <p>Need help or guidance?<br>
              We’re here 24/7 to support you every step of the way.</p>
              <p>To new beginnings,<br>
              <strong>Team EaseWithdraw</strong><br>
              <a href="mailto:support@easewithdraw.com">support@easewithdraw.com</a></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} EaseWithdraw. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"Ease Withdraw" <${smtpUser}>`,
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
}

module.exports = { sendWelcomeEmail };
