const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send(
    {
        to: email, // Change to your recipient
        from: 'keshav@projectpro.io', // Change to your verified sender
        subject: 'Welcome to the Task App !',
        text: `Welcome to the app, ${name}. We are pleased to have you on board !`
    }
    ).then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'keshav@projectpro.io',
        subject: "It's heartbreaking to see you go...",
        text: `Hi ${name}, Let us know what went wrong. We would love to make your experience delightful again.`
    }).then(()=>{
        console.log("Cancel mail Sent !")
    }).catch((err)=>{
        console.error(err)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}