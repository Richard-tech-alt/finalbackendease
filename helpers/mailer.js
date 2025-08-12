const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:"smtp.hostinger.com",
    post:"587",
    secure:false,
    requireTLS:true,
    auth:{
        user:"info@easewithdraw.com",
        pass:"Guru@Guru123"
    }
});
const sendMail = async(email,subject,content)=>{
    try {
        var mailOptions = {
            from:"info@easewithdraw.com",
            to:email,
            subject:subject,
            html:content
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error);
            }
            console.log("Mail sent",info.messageId);
            console.log("Mail sent",email);

        });
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    sendMail
}
