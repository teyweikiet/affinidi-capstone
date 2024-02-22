import express from 'express'
import 'dotenv/config'
import { affinidiProvider } from '@affinidi/passport-affinidi'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

import { VercelKvStore } from './kv-store.mjs'

await affinidiProvider(app, {
  id: "affinidi",
  issuer: process.env.AFFINIDI_ISSUER,
  client_id: process.env.AFFINIDI_CLIENT_ID,
  client_secret: process.env.AFFINIDI_CLIENT_SECRET,
  redirect_uris: [process.env.AFFINIDI_REDIRECT_URI],
  expressSesssion: process.env.ENVIRONMENT !== "local" && {
    secret: process.env.AFFINIDI_SESSION_SECRETS.split(";"),
    store: new VercelKvStore(),
    resave: true,
    saveUninitialized: true
  },
  handleCredential: (credential) => {
    console.log('Received credential:', credential);
  },
});

app.use((err, req, res, next) => {
  console.log(req.url)
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
