const admin = require('firebase-admin');
import { config } from "dotenv";
config();

const serviceAccount = process.env.FIREBARE_JSON!;
admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccount)),
    storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();
export default bucket;
