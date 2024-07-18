const admin = require('firebase-admin');
import { config } from "dotenv";
config();

const serviceAccount = require('../../job-portal-429605-firebase-adminsdk-gelew-e0479275ec.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export default bucket;
