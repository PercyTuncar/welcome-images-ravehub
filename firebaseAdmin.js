// firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './ravehub-3102e-firebase-adminsdk-8hne5-ac97482e6a.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://ravehub-3102e.appspot.com'
  });
}

const bucket = admin.storage().bucket();

export { bucket };
