const admin = require('firebase-admin');
import { config } from "dotenv";
config();

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
    storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();
export default bucket;
