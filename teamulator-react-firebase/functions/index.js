const functions = require("firebase-functions");
const admin = require("firebase-admin");
const FieldValue = require('firebase-admin').firestore.FieldValue
const cors = require('cors')({origin: true});
const nodemailer = require("nodemailer");

admin.initializeApp();

const Cryptr = require('cryptr');


exports.sendEmail = functions.https.onRequest( (req, res) => {

//       {
//         "nomClient" : "Benoit hamon", 
//         "mailContactClient" : "", 
//         "telClient" : "0651000187" ,  
//         "messageClient" : "monsieur X voudrait vous contacter"
// }

      console.log("req.body:",req.body);

      var contact = req.body
      var transporter = nodemailer.createTransport({
          service:'gmail',
          secure : false,
          auth:{
              user: 'dev.e@nerd148.co',
              pass: "Naomie120810"
          },
          tls: {
              rejectUnauthorized: false
          },
      });



      var mailOptions = {
          from: "dev.e@nerd148.co",
          to: "sultan.elie@gmail.com", 
          subject: `un client cherche à vous joindre`,
          text: `Hello, un client cherche a vous joindre. \n Son nom est : ${contact.nomClient}. \n  Son email est: ${contact.mailContactClient} \n son numero de téléphone est : ${contact.telClient}   , 
          \n son message est: ${contact.messageClient} `
      }
      //console.log(mailOptions);

      transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
              res.send(err)
          } else {
              res.json({ 
                  message : "Votre message à bien été envoyé",
                  messageinfo : info.response
              })
          }
      });

      return "Votre message à bien été envoyé";



});



exports.addMessage = functions.https.onRequest( (req, res) => {

    cors(req, res, async() =>  {
     // console.dir(req.body.mint);
      await admin.firestore().collection("Mints").doc(mintAddress).set({highscore: decryptedStringToNumber}, { merge: true });
     return res.send('');

    })
});

exports.updateLives = functions.https.onRequest( (req, res) => {

    cors(req, res, async() =>  {

        const mintAdressReq = req.body.mintAddress
            
        await admin.firestore().collection("Mints").doc(mintAdressReq).update({lives: FieldValue.increment(-1)}, { merge: true });

        return res.send('');
    })

});

exports.gameCession = functions.https.onRequest( (req, res) => {

    cors(req, res, async() =>  {
        const reqBody = req.body
        const cryptr = new Cryptr('mqdkdmqlskdnfzoieb');     

        let decryptedString = cryptr.decrypt(reqBody.logStartMessage);  
        let isoDateString = new Date().toISOString();
        let reduceDates = decryptedString + "=>" + isoDateString

      await admin.firestore().collection("Mints").doc(reqBody.mintAddress).update({ logs: FieldValue.arrayUnion(reduceDates) });
      return res.send('');

    })
});