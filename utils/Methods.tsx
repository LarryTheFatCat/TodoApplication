import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};
export const doSendPasswordResetEmail = async (email:string): Promise<void>  => {
  return sendPasswordResetEmail(auth,email);
}