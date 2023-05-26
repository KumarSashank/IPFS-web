import { getUserFilesFromFirestore } from "./firebase-module.js";

const userId = sessionStorage.getItem("userId");
const username = sessionStorage.getItem("username");
const user = sessionStorage.getItem("user");
console.log(user);
getUserFilesFromFirestore(userId)
  .then((userFiles) => {
    console.log("User Files:", userFiles);
  })
  .catch((error) => {
    console.error("Error retrieving user files:", error);
  });

//change the name of the id=Username
// Assuming you have a variable called `username`

// Update the text content of the <h3> element
const h3Element = document.getElementById("username");
h3Element.textContent = `Hello ${username}!`;

//iterate through userFiles and make a cards for each collection

const filesContainer = document.querySelector(".uploads .card");

// Function to create a card element
function createCard(fileName, link, fileId) {
  const card = document.createElement("div");
  card.className = "card-item";
  card.innerHTML = `
    <h5>${fileName}</h5>
    <p>Link: <a href="${link}" target="_blank">${link}</a></p>
  `;
  card.id = `card-${fileId}`;
  return card;
}

getUserFilesFromFirestore(userId)
  .then((userFiles) => {
    console.log("User Files:", userFiles);

    // Iterate over the userFiles array
    userFiles.forEach((file, index) => {
      const { fileName, link } = file;
      const fileId = index + 1; // Assuming index starts from 0

      // Create a card for each file
      const card = createCard(fileName, link, fileId);

      // Append the card to the files container
      filesContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error retrieving user files:", error);
  });
