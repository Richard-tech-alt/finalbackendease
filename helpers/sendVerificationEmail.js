// // // // // // Update your mailer.js or create a new email sending function
// // // // // const nodemailer = require('nodemailer');

// // // // // // Configure your email transporter
// // // // // const transporter = nodemailer.createTransport({
// // // // //     host: "smtpout.secureserver.net",
// // // // //     port: "587",
// // // // //     secure: process.env.SMTP_PORT === "587", // true for port 587
// // // // //     auth: {
// // // // //       user: "info@easewithdraw.com",
// // // // //       pass: "Ease@1234",
// // // // //     },
// // // // // });

// // // // // // Function to send HTML email with logo
// // // // // const sendVerificationEmail = async (to, subject, otp) => {
// // // // //   try {
// // // // //     // HTML email template with logo and styled content
// // // // //     const htmlContent = `
// // // // //       <!DOCTYPE html>
// // // // //       <html>
// // // // //       <head>
// // // // //         <style>
// // // // //           body {
// // // // //             font-family: Arial, sans-serif;
// // // // //             line-height: 1.6;
// // // // //             color: #333333;
// // // // //           }
// // // // //           .email-container {
// // // // //             max-width: 600px;
// // // // //             margin: 0 auto;
// // // // //             padding: 20px;
// // // // //             border: 1px solid #e4e4e4;
// // // // //             border-radius: 5px;
// // // // //           }
// // // // //           .header {
// // // // //             text-align: center;
// // // // //             padding-bottom: 20px;
// // // // //             border-bottom: 1px solid #e4e4e4;
// // // // //           }
// // // // //           .logo {
// // // // //             max-width: 150px;
// // // // //             height: auto;
// // // // //           }
// // // // //           .content {
// // // // //             padding: 20px 0;
// // // // //           }
// // // // //           .verification-code {
// // // // //             font-size: 24px;
// // // // //             font-weight: bold;
// // // // //             color: #4285f4;
// // // // //             padding: 10px;
// // // // //             background-color: #f5f5f5;
// // // // //             border-radius: 4px;
// // // // //             text-align: center;
// // // // //             margin: 15px 0;
// // // // //             letter-spacing: 5px;
// // // // //           }
// // // // //           .footer {
// // // // //             margin-top: 20px;
// // // // //             font-size: 12px;
// // // // //             color: #777777;
// // // // //             text-align: center;
// // // // //           }
// // // // //         </style>
// // // // //       </head>
// // // // //       <body>
// // // // //         <div class="email-container">
// // // // //           <div class="header">
// // // // //             <img src="http://localhost:3001/public/images/ease.png" alt="EaseWithdraw Logo" width="150">
// // // // //           </div>
// // // // //           <div class="content">
// // // // //             <h2>Email Verification</h2>
// // // // //             <p>Thank you for registering with our service. To complete your registration, please use the verification code below:</p>
// // // // //             <div class="verification-code">${otp}</div>
// // // // //             <p>This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
// // // // //           </div>
// // // // //           <div class="footer">
// // // // //             <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
// // // // //             <p>If you have any questions, please contact our support team.</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </body>
// // // // //       </html>
// // // // //     `;

// // // // //     const mailOptions = {
// // // // //     from: "info@easewithdraw.com",
// // // // //       to: to,
// // // // //       subject: subject,
// // // // //       html: htmlContent
// // // // //     };

// // // // //     const info = await transporter.sendMail(mailOptions);
// // // // //     console.log('Email sent successfully:', info.messageId);
// // // // //     return true;
// // // // //   } catch (error) {
// // // // //     console.error('Error sending email:', error);
// // // // //     return false;
// // // // //   }
// // // // // };

// // // // // module.exports = {
// // // // //   sendVerificationEmail
// // // // // };


// // // // const nodemailer = require('nodemailer');
// // // // const path = require('path');
// // // // const fs = require('fs');

// // // // // Configure your email transporter
// // // // const transporter = nodemailer.createTransport({
// // // //     host: "smtpout.secureserver.net",
// // // //     port: "587",
// // // //     secure: true, // true for port 587
// // // //     auth: {
// // // //       user: "info@easewithdraw.com",
// // // //       pass: "Guru@Guru123",
// // // //     },
// // // // });


// // // // const sendVerificationEmail = async (to, subject, otp, firstName = 'User') => {
// // // //   try {
// // // //     // Get the absolute path to your logo file
// // // //     const logoPath = path.join(process.cwd(), 'public', 'images', 'easy-withdraw-logo.png');
    
// // // //     let logoBase64 = '';
// // // //     let logoExists = false;
    
// // // //     // Check if logo file exists and read it
// // // //     try {
// // // //       if (fs.existsSync(logoPath)) {
// // // //         const logoBuffer = fs.readFileSync(logoPath);
// // // //         logoBase64 = logoBuffer.toString('base64');
// // // //         logoExists = true;
// // // //       }
// // // //     } catch (err) {
// // // //       console.log('Logo file not found, using text logo instead');
// // // //     }
    
// // // //     // HTML email template with embedded base64 logo or fallback text
// // // //     const htmlContent = `
// // // //       <!DOCTYPE html>
// // // //       <html>
// // // //       <head>
// // // //         <meta charset="utf-8">
// // // //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
// // // //         <title>Email Verification - EaseWithdraw</title>
// // // //         <style>
// // // //           body {
// // // //             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// // // //             line-height: 1.6;
// // // //             color: #333333;
// // // //             margin: 0;
// // // //             padding: 0;
// // // //             background-color: #f4f4f4;
// // // //           }
// // // //           .email-container {
// // // //             max-width: 600px;
// // // //             margin: 0 auto;
// // // //             padding: 20px;
// // // //             background-color: #ffffff;
// // // //             border-radius: 10px;
// // // //             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// // // //           }
// // // //           .header {
// // // //             text-align: center;
// // // //             padding-bottom: 30px;
// // // //             border-bottom: 2px solid #e4e4e4;
// // // //             margin-bottom: 30px;
// // // //           }
// // // //           .logo {
// // // //             max-width: 180px;
// // // //             height: auto;
// // // //             margin-bottom: 10px;
// // // //           }
// // // //           .company-name {
// // // //             font-size: 28px;
// // // //             font-weight: bold;
// // // //             color: #4285f4;
// // // //             margin: 0;
// // // //             text-transform: uppercase;
// // // //             letter-spacing: 2px;
// // // //           }
// // // //           .content {
// // // //             padding: 0 20px;
// // // //           }
// // // //           .greeting {
// // // //             font-size: 18px;
// // // //             color: #555555;
// // // //             margin-bottom: 20px;
// // // //           }
// // // //           .verification-section {
// // // //             background-color: #f8f9fa;
// // // //             padding: 30px;
// // // //             border-radius: 8px;
// // // //             text-align: center;
// // // //             margin: 25px 0;
// // // //           }
// // // //           .verification-code {
// // // //             font-size: 32px;
// // // //             font-weight: bold;
// // // //             color: #4285f4;
// // // //             background-color: #ffffff;
// // // //             padding: 15px 25px;
// // // //             border-radius: 8px;
// // // //             letter-spacing: 8px;
// // // //             border: 2px dashed #4285f4;
// // // //             display: inline-block;
// // // //             margin: 10px 0;
// // // //           }
// // // //           .expiry-text {
// // // //             color: #e74c3c;
// // // //             font-weight: bold;
// // // //             font-size: 14px;
// // // //             margin-top: 15px;
// // // //           }
// // // //           .instructions {
// // // //             background-color: #e8f4fd;
// // // //             padding: 20px;
// // // //             border-radius: 6px;
// // // //             margin: 20px 0;
// // // //             border-left: 4px solid #4285f4;
// // // //           }
// // // //           .footer {
// // // //             margin-top: 40px;
// // // //             padding-top: 20px;
// // // //             border-top: 1px solid #e4e4e4;
// // // //             font-size: 12px;
// // // //             color: #777777;
// // // //             text-align: center;
// // // //           }
// // // //           .security-note {
// // // //             background-color: #fff3cd;
// // // //             padding: 15px;
// // // //             border-radius: 6px;
// // // //             border-left: 4px solid #ffc107;
// // // //             margin: 20px 0;
// // // //             font-size: 14px;
// // // //           }
// // // //           .btn {
// // // //             display: inline-block;
// // // //             padding: 12px 30px;
// // // //             background-color: #4285f4;
// // // //             color: white;
// // // //             text-decoration: none;
// // // //             border-radius: 6px;
// // // //             font-weight: bold;
// // // //             margin: 10px 0;
// // // //           }
// // // //         </style>
// // // //       </head>
// // // //       <body>
// // // //         <div class="email-container">
// // // //           <div class="header">
// // // //             ${logoExists ? 
// // // //               `<img src="data:image/png;base64,${logoBase64}" alt="EaseWithdraw Logo" class="logo">` : 
// // // //               `<h1 class="company-name">EaseWithdraw</h1>`
// // // //             }
// // // //           </div>
          
// // // //           <div class="content">
// // // //             <p class="greeting">Hello ${firstName},</p>
            
// // // //             <p>Welcome to <strong>EaseWithdraw</strong>! We're excited to have you join our community.</p>
            
// // // //             <p>To complete your registration and secure your account, please verify your email address using the verification code below:</p>
            
// // // //             <div class="verification-section">
// // // //               <h3 style="margin-top: 0; color: #4285f4;">Your Verification Code</h3>
// // // //               <div class="verification-code">${otp}</div>
// // // //               <p class="expiry-text">⏰ This code expires in 10 minutes</p>
// // // //             </div>
            
// // // //             <div class="instructions">
// // // //               <strong>How to verify:</strong>
// // // //               <ol>
// // // //                 <li>Copy the verification code above</li>
// // // //                 <li>Return to the EaseWithdraw app</li>
// // // //                 <li>Enter the code in the verification field</li>
// // // //                 <li>Click "Verify" to complete your registration</li>
// // // //               </ol>
// // // //             </div>
            
// // // //             <div class="security-note">
// // // //               <strong>🔒 Security Notice:</strong> If you didn't create an account with EaseWithdraw, please ignore this email. Your security is our priority.
// // // //             </div>
            
// // // //             <p>If you have any questions or need assistance, our support team is here to help!</p>
            
// // // //             <p>Best regards,<br>
// // // //             <strong>The EaseWithdraw Team</strong></p>
// // // //           </div>
          
// // // //           <div class="footer">
// // // //             <p>&copy; ${new Date().getFullYear()} EaseWithdraw. All rights reserved.</p>
// // // //             <p>This is an automated email. Please do not reply to this message.</p>
// // // //             <p>If you need help, contact us at <a href="mailto:support@easewithdraw.com">support@easewithdraw.com</a></p>
// // // //           </div>
// // // //         </div>
// // // //       </body>
// // // //       </html>
// // // //     `;

// // // //     const mailOptions = {
// // // //       from: {
// // // //         name: 'EaseWithdraw',
// // // //         address: 'info@easewithdraw.com'
// // // //       },
// // // //       to: to,
// // // //       subject: subject,
// // // //       html: htmlContent
// // // //     };

// // // //     const info = await transporter.sendMail(mailOptions);
// // // //     console.log('Email sent successfully:', info.messageId);
// // // //     return true;
// // // //   } catch (error) {
// // // //     console.error('Error sending email:', error);
// // // //     return false;
// // // //   }
// // // // };

// // // // // Function to send HTML email with logo
// // // // // const sendVerificationEmail = async (to, subject, otp) => {
// // // // //   try {
// // // // //     // Get the absolute path to your logo file
// // // // //     // const logoPath = path.join(process.cwd(), 'public', 'images', 'easy-withdraw-logo.png');
    
// // // // //     // Read the logo file and convert to base64
// // // // //     // const logoBase64 = fs.readFileSync(logoPath).toString('base64');
    
// // // // //     // HTML email template with embedded base64 logo
    
// // // // //     const htmlContent = `
// // // // //       <!DOCTYPE html>
// // // // //       <html>
// // // // //       <head>
// // // // //         <style>
// // // // //           body {
// // // // //             font-family: Arial, sans-serif;
// // // // //             line-height: 1.6;
// // // // //             color: #333333;
// // // // //           }
// // // // //           .email-container {
// // // // //             max-width: 600px;
// // // // //             margin: 0 auto;
// // // // //             padding: 20px;
// // // // //             border: 1px solid #e4e4e4;
// // // // //             border-radius: 5px;
// // // // //           }
// // // // //           .header {
// // // // //             text-align: center;
// // // // //             padding-bottom: 20px;
// // // // //             border-bottom: 1px solid #e4e4e4;
// // // // //           }
// // // // //           .logo {
// // // // //             max-width: 150px;
// // // // //             height: auto;
// // // // //           }
// // // // //           .content {
// // // // //             padding: 20px 0;
// // // // //           }
// // // // //           .verification-code {
// // // // //             font-size: 24px;
// // // // //             font-weight: bold;
// // // // //             color: #4285f4;
// // // // //             padding: 10px;
// // // // //             background-color: #f5f5f5;
// // // // //             border-radius: 4px;
// // // // //             text-align: center;
// // // // //             margin: 15px 0;
// // // // //             letter-spacing: 5px;
// // // // //           }
// // // // //           .footer {
// // // // //             margin-top: 20px;
// // // // //             font-size: 12px;
// // // // //             color: #777777;
// // // // //             text-align: center;
// // // // //           }
// // // // //         </style>
// // // // //       </head>
// // // // //       <body>
// // // // //         <div class="email-container">
// // // // //           <div class="header">
// // // // //             <h1>easewithdraw</h1>
// // // // //           </div>
// // // // //           <div class="content">
// // // // //             <h2>Email Verification</h2>
// // // // //             <p>Thank you for registering with our service. To complete your registration, please use the verification code below:</p>
// // // // //             <div class="verification-code">${otp}</div>
// // // // //             <p>This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
// // // // //           </div>
// // // // //           <div class="footer">
// // // // //             <p>&copy; ${new Date().getFullYear()} EaseWithdraw. All rights reserved.</p>
// // // // //             <p>If you have any questions, please contact our support team.</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </body>
// // // // //       </html>
// // // // //     `;

// // // // //     const mailOptions = {
// // // // //       from: "info@easewithdraw.com",
// // // // //       to: to,
// // // // //       subject: subject,
// // // // //       html: htmlContent
// // // // //     };

// // // // //     const info = await transporter.sendMail(mailOptions);
// // // // //     console.log('Email sent successfully:', info.messageId);
// // // // //     return true;
// // // // //   } catch (error) {
// // // // //     console.error('Error sending email:', error);
// // // // //     return false;
// // // // //   }
// // // // // };

// // // // module.exports = {
// // // //   sendVerificationEmail
// // // // };




// // // const nodemailer = require('nodemailer');

// // // // Replace these with your Hostliger SMTP credentials
// // // const smtpHost = 'smtp.hostinger.com';
// // // const smtpPort = 587; // or 465 for SSL
// // // const smtpUser = 'info@easewithdraw.com';
// // // const smtpPass = 'Guru@Guru123';

// // // // Replace with the email you want to send the test to
// // // const testRecipient = 'ojshavsaxenaa@gmail.com';

// // // const transporter = nodemailer.createTransport({
// // //     host: smtpHost,
// // //     port: smtpPort,
// // //     secure: false, // true for port 465, false for other ports
// // //     auth: {
// // //         user: smtpUser,
// // //         pass: smtpPass
// // //     }
// // // });

// // // const mailOptions = {
// // //     from: smtpUser,
// // //     to: testRecipient,
// // //     subject: 'SMTP Test Email',
// // //     text: 'This is a test email to check if SMTP is working.',
// // // };

// // // transporter.sendMail(mailOptions, (error, info) => {
// // //     if (error) {
// // //         return console.log('Error:', error);
// // //     }
// // //     console.log('Email sent:', info.response);
// // // });

// // const nodemailer = require('nodemailer');

// // // SMTP config
// // const smtpHost = 'smtp.hostinger.com';
// // const smtpPort = 587; // SSL port
// // const smtpUser = 'info@easewithdraw.com';
// // const smtpPass = 'Guru@Guru123';

// // // Create transporter (reusable)
// // const transporter = nodemailer.createTransport({
// //     host: smtpHost,
// //     port: smtpPort,
// //     secure: false, // true for port 465, false for 587
// //     auth: {
// //         user: smtpUser,
// //         pass: smtpPass
// //     }
// // });



// // // async function sendVerificationEmail(to, subject, otp) {
// // //     try {
// // //         const mailOptions = {
// // //             from: `"Ease Withdraw" <${smtpUser}>`,
// // //             to,
// // //             subject,
// // //             html: `
// // //                 <div style="font-family: Arial, sans-serif;">
// // //                     <h2>${subject}</h2>
// // //                     <p>Your verification code is:</p>
// // //                     <h3 style="color: #2d89ef;">${otp}</h3>
// // //                     <p>This code will expire in 10 minutes.</p>
// // //                 </div>
// // //             `,
// // //               attachments: [
// // //                 {
// // //                     filename: 'logo.png',
// // //                     path: 'https://res.cloudinary.com/dluma1hts/image/upload/v1754981845/easy-withdraw-logo_yrtrgp.png',
// // //                     cid: 'logo' // same as in img src
// // //                 }
// // //             ]
// // //         };

// // //         const info = await transporter.sendMail(mailOptions);
// // //         console.log('Email sent:', info.response);
// // //         return info;
// // //     } catch (error) {
// // //         console.error('Error sending email:', error);
// // //         throw error;
// // //     }
// // // }


// // async function sendVerificationEmail(to, subject, otp) {
// //     try {
// //         const mailOptions = {
// //             from: `"Ease Withdraw" <${smtpUser}>`,
// //             to,
// //             subject,
// //             html: `
// //                 <div style="font-family: Arial, sans-serif; text-align: center;">
// //                     <img src="cid:logo" alt="Ease Withdraw Logo" style="max-width: 150px; margin-bottom: 20px;" />
// //                     <h2>${subject}</h2>
// //                     <p>Your verification code is:</p>
// //                     <h3 style="color: #2d89ef;">${otp}</h3>
// //                     <p>This code will expire in 10 minutes.</p>
// //                 </div>
// //             `,
// //             attachments: [
// //                 {
// //                     filename: 'logo.png',
// //                     path: 'https://res.cloudinary.com/dluma1hts/image/upload/v1754981845/easy-withdraw-logo_yrtrgp.png',
// //                     cid: 'logo' // same as in img src
// //                 }
// //             ]
// //         };

// //         const info = await transporter.sendMail(mailOptions);
// //         console.log('Email sent:', info.response);
// //         return info;
// //     } catch (error) {
// //         console.error('Error sending email:', error);
// //         throw error;
// //     }
// // }


// // module.exports = { sendVerificationEmail };



// const nodemailer = require('nodemailer');

// // SMTP config
// const smtpHost = 'smtp.hostinger.com';
// const smtpPort = 587; // SSL port
// const smtpUser = 'info@easewithdraw.com';
// const smtpPass = 'Guru@Guru123';

// // Create transporter (reusable)
// const transporter = nodemailer.createTransport({
//     host: smtpHost,
//     port: smtpPort,
//     secure: false, // true for port 465
//     auth: {
//         user: smtpUser,
//         pass: smtpPass
//     }
// });



// async function sendVerificationEmail(to, subject) {
//     try {
//         const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               line-height: 1.6;
//               color: #333333;
//               background-color: #f9f9f9;
//               padding: 0;
//               margin: 0;
//             }
//             .email-container {
//               max-width: 600px;
//               margin: 20px auto;
//               background-color: #ffffff;
//               border: 1px solid #e4e4e4;
//               border-radius: 8px;
//               overflow: hidden;
//             }
//             .header {
//               text-align: center;
//               padding: 20px;
//               background-color: #ffffff;
//               border-bottom: 1px solid #e4e4e4;
//             }
//             .logo {
//               max-width: 150px;
//               height: auto;
//             }
//             .content {
//               padding: 20px;
//             }
//             .content h2 {
//               color: #2d89ef;
//               margin-top: 0;
//             }
//             .cta-button {
//               display: inline-block;
//               background-color: #2d89ef;
//               color: #ffffff;
//               padding: 12px 20px;
//               border-radius: 4px;
//               text-decoration: none;
//               font-weight: bold;
//               margin: 20px 0;
//             }
//             .footer {
//               font-size: 12px;
//               color: #777777;
//               text-align: center;
//               padding: 15px;
//               background-color: #f9f9f9;
//               border-top: 1px solid #e4e4e4;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="email-container">
//             <div class="header">
//               <img class="logo" src="https://res.cloudinary.com/dluma1hts/image/upload/v1754981845/easy-withdraw-logo_yrtrgp.png" alt="EaseWithdraw Logo" />
//             </div>
//             <div class="content">
//               <h2>Welcome to EaseWithdraw – Crypto Edition</h2>
//               <p>Already using CashApp, Binance, Coinbase, TrustWallet, PayPal, or Robinhood?</p>
//               <p>Now’s the time to turn them into income-generating tools. With us, you can:</p>
//               <ul>
//                 <li>Get your own Crypto Card</li>
//                 <li>Start building side income or passive revenue</li>
//                 <li>Get real support for your financial journey</li>
//               </ul>
//               <p>We believe everyone can earn smarter, not harder.</p>
//               <a href="https://easewithdraw.com" class="cta-button">Start Now – It’s Fast & Free</a>
//               <p>Need help or guidance?<br>
//               We’re here 24/7 to support you every step of the way.</p>
//               <p>To new beginnings,<br>
//               <strong>Team EaseWithdraw</strong><br>
//               <a href="mailto:support@easewithdraw.com">support@easewithdraw.com</a></p>
//             </div>
//             <div class="footer">
//               <p>&copy; ${new Date().getFullYear()} EaseWithdraw. All rights reserved.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//         `;

//         const mailOptions = {
//             from: `"Ease Withdraw" <${smtpUser}>`,
//             to,
//             subject,
//             html: htmlContent
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Welcome email sent:', info.response);
//         return info;
//     } catch (error) {
//         console.error('Error sending welcome email:', error);
//         throw error;
//     }
// }


// module.exports = { sendVerificationEmail };





const nodemailer = require("nodemailer");

const smtpHost = "smtp.hostinger.com";
const smtpPort = 587; // SSL
const smtpUser = "info@easewithdraw.com";
const smtpPass = "Guru@Guru123";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false, // true for SSL (465), false for TLS (587)
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

async function sendVerificationEmail(toEmail, subject, otp) {
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
        margin: 30px auto;
        background: #ffffff;
        border: 1px solid #e4e4e4;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #e4e4e4;
      }
      .logo {
        max-width: 160px;
        height: auto;
      }
      .content {
        padding: 20px;
      }
      .verification-code {
        font-size: 24px;
        font-weight: bold;
        color: #4285f4;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 4px;
        text-align: center;
        margin: 15px 0;
        letter-spacing: 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #777777;
        text-align: center;
        padding: 15px;
        border-top: 1px solid #e4e4e4;
      }
      .cta-btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4285f4;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://res.cloudinary.com/dluma1hts/image/upload/v1754981845/easy-withdraw-logo_yrtrgp.png" alt="EaseWithdraw" class="logo">
      </div>
      <div class="content">
        <h3 style="margin-top: 30px;">Your Verification Code</h3>
        <div class="verification-code">${otp}</div>
        <p>This code will expire in 10 minutes. If you didn’t request this verification, please ignore this email.</p>
        <p>Need help or guidance?<br>We’re here 24/7 to support you every step of the way.</p>
        <p>To new beginnings,<br>Team EaseWithdraw<br>support@easewithdraw.com</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} EaseWithdraw. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"EaseWithdraw" <${smtpUser}>`,
    to: toEmail,
    subject: subject,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
  
// Example usage:
module.exports = { sendVerificationEmail };