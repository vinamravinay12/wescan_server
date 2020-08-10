const admin = require('firebase-admin');

const serviceAccount = require('./wescan-in-firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wescan-in.firebaseio.com",
});



module.exports = admin


