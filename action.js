const firebaseConfig = {
  apiKey: "AIzaSyBm7OuuxF72sVP8OpH4famDyVUywNilKaM",
  authDomain: "ipfs-network.firebaseapp.com",
  projectId: "ipfs-network",
  storageBucket: "ipfs-network.appspot.com",
  messagingSenderId: "1061871537708",
  appId: "1:1061871537708:web:323685435e765a39cacb89",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Get a reference to the Firestore collection
const filesCollection = collection(db, "files");

// Function to get the data of a specific user ID from the "files" collection
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
const userId = "your-user-id";
getUserFilesFromFirestore(userId)
  .then((userFiles) => {
    console.log("User Files:", userFiles);
  })
  .catch((error) => {
    console.error("Error retrieving user files:", error);
  });
