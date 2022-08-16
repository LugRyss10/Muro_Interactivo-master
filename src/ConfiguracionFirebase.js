import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6J4Pc57PhX7JIQKJg7P00W7-HuiRHD54",
  authDomain: "react-proyecto-183cd.firebaseapp.com",
  projectId: "react-proyecto-183cd",
  storageBucket: "react-proyecto-183cd.appspot.com",
  messagingSenderId: "703394839287",
  appId: "1:703394839287:web:bf9723a31c255bd24e71f2"
};
/*const firebaseConfig = {
  apiKey: "AIzaSyAfqjoYldOufyUq4owv_dPYNTsrz_JUrxQ",
  authDomain: "react-interactivo.firebaseapp.com",
  projectId: "react-interactivo",
  storageBucket: "react-interactivo.appspot.com",
  messagingSenderId: "270067886062",
  appId: "1:270067886062:web:71c06dc8a43237fe9410ff"
};
*/
firebase.initializeApp(firebaseConfig);

export const baseDeDato = firebase.firestore();
export default firebase;
