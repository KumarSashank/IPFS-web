import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

console.log("Firebase");
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm7OuuxF72sVP8OpH4famDyVUywNilKaM",
  authDomain: "ipfs-network.firebaseapp.com",
  projectId: "ipfs-network",
  storageBucket: "ipfs-network.appspot.com",
  messagingSenderId: "1061871537708",
  appId: "1:1061871537708:web:323685435e765a39cacb89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a reference to the Firestore collection
const filesCollection = collection(db, "files");

// Function to add a file link to the Firestore collection
export function addFileLinkToFirestore(link) {
  // Create a new document with an automatically generated ID
  const newFileDocRef = doc(filesCollection);

  // Set the file link in the document
  return setDoc(newFileDocRef, { link })
    .then(() => {
      console.log("File link added to Firestore:", link);
    })
    .catch((error) => {
      console.error("Error adding file link to Firestore:", error);
    });
}

window.addEventListener("message", function (event) {
  // Check if the message contains the link property
  if (event.data && event.data.link) {
    const link = event.data.link;
    console.log("Received link:", link);
    addFileLinkToFirestore(link);

    // Use the link in your Firebase module
    // ...
  }
});
