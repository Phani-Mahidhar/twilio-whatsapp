require('dotenv').config()

// update with your SID and AUTH_TOKEN in the .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


client.messages
    .create({
        // sandbox number which can be enabled at https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Flearn%3Fx-target-region%3Dus1
        // this number is only for developer tesing and it expires after three days.
        from: 'whatsapp:+14155238886', 
        body: 'Some Random Text',
        to: 'whatsapp:+919550919288'
    })
    .then(message => console.log(message)).done();

// For production we need to create a facebook business account and wait for the accounts approval only then we can use that number. 