let myLead = [];
const inputEl = document.getElementById("input-el");
const saveInputEl = document.getElementById("save-inp");
const tabBtn = document.getElementById("save-tab");
const unorderEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteBtn = document.getElementById("delete-btn");

if (leadsFromLocalStorage) {
  myLead = leadsFromLocalStorage;
  render(myLead);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>
`; // template string
  }
  unorderEl.innerHTML = listItems; // Loads single values
}

saveInputEl.addEventListener("click", function () {
  myLead.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLead));
  render(myLead);
  inputEl.value = ""; // clears the input field after btn-click
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLead));
    render(myLead);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLead = [];
  render(myLead);
});
