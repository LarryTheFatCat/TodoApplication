import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "./Firebase";
// login user via email and password
export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};
// create account using email and password
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};
// calls firebase method, as a simple function
export const doSendPasswordResetEmail = async (
  email: string
): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};
// signs user out
export const doSignOut = async (): Promise<void> => {
  return signOut(auth);
};
