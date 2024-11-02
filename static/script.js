function changeMode() {
  const body = document.body;
  let isDark = false;

  if (isDark) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    isDark = false;
  } else {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    isDark = true;
  }
}

function uploadFile(event){
    event.preventDefault();

    let formData = new FormData(this);
    let uploadStatus = document.getElementById("upload-status");

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error uploading " + response.statusText);
        }
        return response.text();
      })
      .then((result) => {
        uploadStatus.textContent = result;
      })
      .catch((error) => {
        uploadStatus.text = "Error uploading";
        console.error("Error:", error);
      });
}

function initEventListners() {
  // adds listener for display mode
  document
    .getElementsByClassName("display-mode-button")[0]
    .addEventListener("click", changeMode);

  // adds listener for upload form
  document
    .getElementById("upload-form")
    .addEventListener("submit", uploadFile)
}

function main() {
  let isDark = false;
  initEventListners();
}

main();
