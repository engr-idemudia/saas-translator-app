import { initFirestore } from "@auth/firebase-adapter";
import admin from "firebase-admin";

function getServiceAccount() {
  const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not set");
  return JSON.parse(key);
}

function getAdminApp() {
  if (admin.apps.length > 0) return admin.apps[0]!;
  return admin.initializeApp({
    credential: admin.credential.cert(getServiceAccount()),
  });
}

export function getAdminAuth() {
  return admin.auth(getAdminApp());
}

export const adminDb = initFirestore({
  credential: admin.credential.cert(getServiceAccount()),
});
