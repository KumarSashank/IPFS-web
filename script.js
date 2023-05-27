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
  const projectId = "2QMSDEoTMvoqZCsVrVbwM3Mp1ti";
  const projectSecret = "c07447f71c044e8183d30c1ee41f0c65";
  const endpoint = "https://ipfs.infura.io:5001";

  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

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

      window.postMessage({ link: piclink }, "*");
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
