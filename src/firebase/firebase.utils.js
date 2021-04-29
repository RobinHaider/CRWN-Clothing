import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCZty5g1qVC3qZdOEy4Ns_Th9Y8ydZEh8s",
    authDomain: "fir-masterclass-230a9.firebaseapp.com",
    databaseURL: "https://fir-masterclass-230a9.firebaseio.com",
    projectId: "fir-masterclass-230a9",
    storageBucket: "fir-masterclass-230a9.appspot.com",
    messagingSenderId: "241221407359",
    appId: "1:241221407359:web:1ee4da45827ce38f15a54a",
    measurementId: "G-88QNY49D9C"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
