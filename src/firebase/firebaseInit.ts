import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWX8_vKrs_JmHkP30sqC8AxK1WsGJAOg8',
  authDomain: 'invoice-app-89f0a.firebaseapp.com',
  projectId: 'invoice-app-89f0a',
  storageBucket: 'invoice-app-89f0a.appspot.com',
  messagingSenderId: '603505672134',
  appId: '1:603505672134:web:8cd0297844833e1668bcc7',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
