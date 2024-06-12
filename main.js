import "./style.css";
import dayjs from "dayjs";

let formInput = document.getElementById("formInput");
let notesContainer = document.getElementById("notesContainer");

function createData(event) {
  event.preventDefault();

  let catatan = event.target.catatan.value;
  console.log("Note to be added:", catatan);

  let dataStorage = localStorage.getItem("dataStorage");
  if (dataStorage == null) {
    localStorage.setItem("dataStorage", "[]");
  }
  dataStorage = localStorage.getItem("dataStorage");
  let dataStorageJSON = JSON.parse(dataStorage);
  dataStorageJSON.push({
    id: dayjs().format(),
    catatan: catatan,
    date: dayjs().format(),
  });
  localStorage.setItem("dataStorage", JSON.stringify(dataStorageJSON));
  console.log("Updated dataStorage:", JSON.stringify(dataStorageJSON));

  event.target.catatan.value = "";
  alert("Data berhasil ditambahkan");

  renderToHtml();
}

function noteCard(id, content, date) {
  console.log("Creating note card:", id, content, date);
  let div = document.createElement("div");
  div.setAttribute("id", id);
  div.setAttribute(
    "class",
    "w-full min-h-[120px] p-2 flex flex-col bg-white shadow-md rounded-md relative"
  );

  let p = document.createElement("p");
  p.setAttribute("class", "font-light");
  p.textContent = content;

  let small = document.createElement("small");
  small.setAttribute("class", "italic text-slate-500 text-xs mt-auto");
  small.textContent = date;

  let buttonClose = document.createElement("button");
  buttonClose.setAttribute(
    "class",
    "w-10 h-10 bg-red-500 flex justify-center items-center rounded-md absolute right-2 top-2 text-white"
  );
  buttonClose.textContent = "X";
  buttonClose.addEventListener("click", () => {
    deleteCard(id);
  });

  div.appendChild(p);
  div.appendChild(small);
  div.appendChild(buttonClose);

  return div;
}

function renderToHtml() {
  console.log("Rendering notes to HTML");
  notesContainer.innerHTML = "";
  let storageData = localStorage.getItem("dataStorage"); 
  if (storageData == null) {
    console.log("No data found in localStorage");
    return;
  }
  let storageDataJson = JSON.parse(storageData);
  console.log("Data from localStorage:", storageDataJson);
  storageDataJson.reverse().forEach((e) => {
    notesContainer.appendChild(noteCard(e.id, e.catatan, e.date));
  });
}

function deleteCard(id) {
  console.log("Deleting note card with id:", id);
  let dataStorage = localStorage.getItem("dataStorage");
  if (dataStorage != null) {
    let dataStorageJSON = JSON.parse(dataStorage);
    dataStorageJSON = dataStorageJSON.filter((note) => note.id !== id);
    localStorage.setItem("dataStorage", JSON.stringify(dataStorageJSON));
    renderToHtml();
  }
}

formInput.addEventListener("submit", createData);
document.addEventListener("DOMContentLoaded", renderToHtml);