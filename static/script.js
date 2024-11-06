function changeMode(isDark) {
  const body = document.body;
  const icon = document.getElementById("theme-button");
  
  if (isDark) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    icon.src = icon.getAttribute("data-dark-src");
    icon.style.filter = "invert(100%)";
    return false;
  } else {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    icon.src = icon.getAttribute("data-light-src");
    icon.style.filter = "invert(0%)";
    return true;
  }
}

function uploadFile(event) {
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
    //   uploadStatus.textContent = result;
      uploadFeedback(true);
    })
    .catch((error) => {
    //   uploadStatus.text = "Error uploading";
      console.error("Error:", error);
      uploadFeedback(false);
    });
}

function uploadFeedback(success) {
  const uploadButton = document.getElementById("file-upload-button");
  const originalText = uploadButton.textContent;
  const letters = originalText.split("");

  // clear upload button text
  uploadButton.textContent = "";
  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.style.transition = "color 0.5s ease";
    uploadButton.appendChild(span);
  });

  //   Animate text color based on success of file upload
  Array.from(uploadButton.children).forEach((span, index) => {
    setTimeout(() => {
      span.style.color = success ? "green" : "red";

      // Revert to original color
      setTimeout(() => {
        span.style.color = "";
      }, 500);
    }, index * 100);
  });

  // Restore original text
  setTimeout(() => {
    uploadButton.textContent = originalText;
  }, 500 + letters.length * 100);
}

function initEventListners() {
  let isDark = true;
  // adds listener for display mode
  document.getElementById("theme").addEventListener("click", () => {
    isDark = changeMode(isDark);
  });

  // adds listener for upload form
  document.getElementById("upload-form").addEventListener("submit", uploadFile);
}

function main() {
  initEventListners();
}

main();
