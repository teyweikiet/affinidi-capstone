var express = require('express');
require('dotenv').config()
const { affinidiProvider } = require('@affinidi/passport-affinidi')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {
  app.get('/', function (req, res, next) {
    res.json({ success: 'Express' });
  });

  await affinidiProvider(app, {
    id: "affinidi",
    issuer: process.env.AFFINIDI_ISSUER,
    client_id: process.env.AFFINIDI_CLIENT_ID,
    client_secret: process.env.AFFINIDI_CLIENT_SECRET,
    redirect_uris: [process.env.AFFINIDI_REDIRECT_URI],
    handleCredential: (credential) => {
      console.log('Received credential:', credential);
    },
  });

  app.get('*', function(req, res) {
    console.log('catch all', req.url)
  });

  app.use((err, req, res, next) => {
    console.log(req.url)
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  return app
}

module.exports = initializeServer();
