const admin = require('firebase-admin');
import { config } from "dotenv";
config();

const serviceAccount = require('../json/job-portal-84299-firebase-adminsdk-7urxv-a4795fe3e2.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

export default bucket;
