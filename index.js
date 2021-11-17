// require('dotenv').config()

// // update with your SID and AUTH_TOKEN in the .env file
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);


// client.messages
//     .create({
//         // sandbox number which can be enabled at https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Flearn%3Fx-target-region%3Dus1
//         // this number is only for developer tesing and it expires after three days.
//         // from: 'whatsapp:+14155238886', 
//         // from: 'whatsapp:+919550919288',
//         from:"whatsapp:9122507741",
//         body: 'Some Random Text',
//         to: 'whatsapp:+919000975522'
//     })
//     .then(message => console.log(message)).done();

// For production we need to create a facebook business account and wait for the accounts approval only then we can use that number. 
const qrcode = require('qrcode-terminal');

const {
    Client
} = require('whatsapp-web.js');
const fs = require('fs');


const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {
        small: true
    });
});

client.on('ready', async () => {
    console.log('Client is ready!');
    const number = ""; //write client number here
    const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
    const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India

    const number_details = await client.getNumberId(final_number); // get mobile number details

    if (number_details) {
        const sendMessageData = await client.sendMessage(number_details._serialized, "Hi!"); // send message
    } else {
        console.log(final_number, "Mobile number is not registered");
    }
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.initialize();