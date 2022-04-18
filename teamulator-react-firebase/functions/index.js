const functions = require("firebase-functions");
const admin = require("firebase-admin");
const FieldValue = require('firebase-admin').firestore.FieldValue
const cors = require('cors')({origin: true});

admin.initializeApp();

const Cryptr = require('cryptr');

exports.addMessage = functions.https.onRequest( (req, res) => {

    cors(req, res, async() =>  {
     // console.dir(req.body.mint);
      const mintAddress = req.body.mint;
        const cryptr = new Cryptr('myTotalySecretKey');
        const original = req.body.message;
        let decryptedString = cryptr.decrypt(original);  
        let decryptedStringToNumber = parseInt(decryptedString)
        console.log(decryptedStringToNumber);
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
       // console.log(req.body);
        const mintAdressReq = req.body.mintAddress
        console.log(mintAdressReq);
        console.log(req.body.logStartMessage);
        const cryptr = new Cryptr('myTotalySecretKey');
        const GameCessionMessage = req.body.logStartMessage;
        
        let decryptedString = cryptr.decrypt(GameCessionMessage);  
      //  console.log(decryptedString);

        let isoDateString = new Date().toISOString();
        let separation = "=>"
      //  console.log(isoDateString);

        let PerfectSend = decryptedString + separation + isoDateString

      await admin.firestore().collection("Mints").doc(mintAdressReq).update({ logs: FieldValue.arrayUnion(PerfectSend) });


     return res.send('');

    })
});