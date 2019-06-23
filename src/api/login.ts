import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { config, FACEBOOK_APPID } from "./../config";
// import * as Expo from "expo";

firebase.initializeApp(config);

// auth
export const auth = firebase.auth();

// ログインしてるか判定
export const checkLoggedIn = (callback: any) => {
  firebase.auth().onAuthStateChanged(user => {
    // User is signed in.
    callback(user);
  });
};

export const getUid = () => {
  const user = firebase.auth().currentUser;

  if (user) {
    return { uid: user.uid };
  } else {
    return { uid: null };
  }
};

// firebase上の認証
export const authFirebase = async (id: string, pass: string, callback: any) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(id, pass)
    .then(result => {
      // callback(result.user);
      callback(result);
    })
    .catch(error => {
      callback(error);
    });
};

/*
export const authFacebook = async () => {
  try {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APPID, {
      permissions: ["public_profile"],
    });

    if (type === "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      return firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => console.log(error));
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};
*/
export const signOut = () => {
  return firebase.auth().signOut();
};

// firestore

export const db = firebase.firestore();
export const userCollection = db.collection("User");
export const feedCollection = db.collection("Feed");

export const getNowDate = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

export const getNewFeedDoc = () => {
  return feedCollection.doc();
};

// storage
const storageRef = firebase.storage().ref();
export const userRef = storageRef.child("User");

export const uploadAvatar = async (uri: any) => {
  const { uid } = getUid();
  const avatarRef = userRef.child(`${uid}/Avatar/main.png`);

  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = e => {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const snapshot = await avatarRef.put(blob);
  blob.close();
  return await snapshot.ref.getDownloadURL();
};

export const uploadFeedImage = async (uri: string, uuid: string) => {
  const { uid } = getUid();
  const feedImageRef = userRef.child(`${uid}/Feed/${uuid}/main.png`);

  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = e => {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const snapshot = await feedImageRef.put(blob);
  blob.close();
  return await snapshot.ref.getDownloadURL();
};
