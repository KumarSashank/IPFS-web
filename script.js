// import { addFileLinkToFirestore } from "./firebase-module.js";
console.log("Script");

function showFileName(input) {
  const uploadBtn = document.querySelector(".upload-btn");
  const fileNameElement = document.getElementById("fileName");

  if (input.files && input.files.length > 0) {
    const fileName = input.files[0].name;
    fileNameElement.textContent = fileName;
    uploadBtn.classList.add("active");
    uploadBtn.style.display = "inline-block";
    uploadBtn.disabled = false;
  } else {
    fileNameElement.textContent = "";
    uploadBtn.classList.remove("active");
    uploadBtn.style.display = "none";
    uploadBtn.disabled = true;
  }
}

function uploadFile() {
  const projectId = "2Q6xazpc4TxCCUghubOG4QuSBdN";
  const projectSecret = "a79ca4769fe0cc2e64dc075fe2bcace9";
  const endpoint = "https://ipfs.infura.io:5001";

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);
  const filename = file.name;

  fetch(endpoint + "/api/v0/add", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(projectId + ":" + projectSecret),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const hash = data.Hash;
      // Call the function to add the hash link to Firestore
      //   addFileLinkToFirestore(hash);
      const piclink = `https://ipfs.io/ipfs/${hash}`;
      console.log("This is link: " + piclink);
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<div class="alert alert-success mt-3">
                                 <a href="https://ipfs.io/ipfs/${hash}" target="_blank">Open IPFS Link</a>
                               </div>`;

      window.postMessage({ link: piclink, fileName: filename }, "*");
    })
    .catch((error) => console.error("Error:", error));
}

// try {
//   addFileLinkToFirestore("Kumar trying");
//   console.log("FIle added");
// } catch (err) {
//   console.log(err);
// }
// console.log("End");
const userId = sessionStorage.getItem("userId");
const username = sessionStorage.getItem("username");
const user = sessionStorage.getItem("user");
console.log(user);
// getUserFilesFromFirestore(userId)
//   .then((userFiles) => {
//     console.log("User Files:", userFiles);
//   })
//   .catch((error) => {
//     console.error("Error retrieving user files:", error);
//   });

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
