const nodemailer=require("nodemailer");

exports.sendMail=async(options)=>{

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dbce29e01c841d",
      pass: "02031112a2624d"
    }
  });

    // console.log(transport);
    const mailOptions={
        from:"process.env.SMPT_MAIL",
        to:options.email,
        subject:options.subject,
        text:options.message,
    };


    
    await transport.sendMail(mailOptions);
   
}