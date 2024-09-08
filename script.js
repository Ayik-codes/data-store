let editingIndex = -1;   


window.onload = function() {
  loadTopics();
};

 
function addOrUpdateTopic() {
  let topicName = document.getElementById("topicName").value;
  let topicLink = document.getElementById("topicLink").value;

  if (topicName === "" || topicLink === "") {
    alert("Please fill out both fields.");
    return;
  }

  let topics = JSON.parse(localStorage.getItem("topics")) || [];

  if (editingIndex === -1) {
     
    topics.push({ name: topicName, link: topicLink });
  } else {
     
    topics[editingIndex].name = topicName;
    topics[editingIndex].link = topicLink;
    editingIndex = -1;   
    document.getElementById("addButton").innerText = "Add Topic";  
  }

  localStorage.setItem("topics", JSON.stringify(topics));
  refreshTable();   
 
  document.getElementById("topicName").value = "";
  document.getElementById("topicLink").value = "";
}

 
function loadTopics() {
  let topics = JSON.parse(localStorage.getItem("topics")) || [];
  for (let i = 0; i < topics.length; i++) {
    appendTopicToTable(topics[i].name, topics[i].link, i);
  }
}

 
function refreshTable() {
  let tableBody = document.getElementById("topicTable").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";   
  loadTopics();   
}

 
function appendTopicToTable(name, link, index) {
  let table = document.getElementById("topicTable").getElementsByTagName('tbody')[0];

  let newRow = table.insertRow();
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);

  cell1.innerHTML = name;
  cell2.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
  cell3.innerHTML = `<button class="edit-btn" onclick="editTopic(${index})">Edit</button> <button class="delete-btn" onclick="deleteRow(${index})">Delete</button>`;
}

 
function editTopic(index) {
  let topics = JSON.parse(localStorage.getItem("topics")) || [];
  document.getElementById("topicName").value = topics[index].name;
  document.getElementById("topicLink").value = topics[index].link;

  editingIndex = index;  
  document.getElementById("addButton").innerText = "Update Topic";   
}

 
function deleteRow(index) {
  let topics = JSON.parse(localStorage.getItem("topics")) || [];
  topics.splice(index, 1);   
  localStorage.setItem("topics", JSON.stringify(topics));
  refreshTable();  
}

function searchTopic() {
  const searchInput = document.getElementById('search').value.toLowerCase();
  const tableBody = document.getElementById('topicTable');
  tableBody.innerHTML = ''; // Clear current table

  topics.filter(topic => topic.name.toLowerCase().includes(searchInput)).forEach((topic, index) => {
      let row = `<tr>
          <td>${topic.name}</td>
          <td><a href="${topic.link}" target="_blank">${topic.link}</a></td>
          <td>
              <button onclick="editTopic(${index})">Edit</button>
              <button onclick="deleteTopic(${index})">Delete</button>
          </td>
      </tr>`;
      tableBody.innerHTML += row;
  });
}
