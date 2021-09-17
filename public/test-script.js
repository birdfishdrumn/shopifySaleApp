console.log("script tags api coming")

const header = document.querySelector("header")

const scriptContainer = document.createElement("div")
scriptContainer.textContent = 'Hello Public folder';

scriptContainer.textAlign = "center";
scriptContainer.backgroundColor = "#eee";

scriptContainer.classList.add("script-tags")


header.appendChild(scriptContainer)