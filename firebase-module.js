import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

// Function to add a file name, link, and user ID to the Firestore collection
export function addFileToFirestore(fileName, link, userId) {
  // Create a new document with an automatically generated ID
  const newFileDocRef = doc(filesCollection);

  // Set the file name, link, and user ID in the document
  return setDoc(newFileDocRef, { fileName, link, userId })
    .then(() => {
      console.log("File added to Firestore:", { fileName, link, userId });
    })
    .catch((error) => {
      console.error("Error adding file to Firestore:", error);
    });
}
const userId = sessionStorage.getItem("userId");
window.addEventListener("message", function (event) {
  // Check if the message contains the link property
  if (event.data && event.data.link) {
    const link = event.data.link;
    const fileName = event.data.fileName;
    console.log("Received link:", link);
    console.log("Received file name:", fileName);

    // Get the user ID from session storage

    console.log("User ID:", userId);

    // Add the file to Firestore with the file name, link, and user ID
    addFileToFirestore(fileName, link, userId);

    // Use the link and file name in your Firebase module
    // ...
  }
});

export async function getUserFilesFromFirestore(userId) {
  // Create a query to filter the documents based on the user ID
  const querySnapshot = await getDocs(
    query(filesCollection, where("userId", "==", userId))
  );

  // Iterate over the documents and retrieve the data
  const userFiles = [];
  querySnapshot.forEach((doc) => {
    const fileData = doc.data();
    userFiles.push(fileData);
  });

  return userFiles;
}

// Example usage
getUserFilesFromFirestore(userId)
  .then((userFiles) => {
    console.log("User Files:", userFiles);
    sessionStorage.setItem("userFiles", userFiles);
  })
  .catch((error) => {
    console.error("Error retrieving user files:", error);
  });
