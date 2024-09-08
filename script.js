let editingIndex = -1;  // Keeps track of which topic is being edited

// Load saved topics from localStorage when the page loads
window.onload = function() {
  loadTopics();
};

// Add or update a topic and save it to localStorage
function addOrUpdateTopic() {
  let topicName = document.getElementById("topicName").value;
  let topicLink = document.getElementById("topicLink").value;

  if (topicName === "" || topicLink === "") {
    alert("Please fill out both fields.");
    return;
  }

  let topics = JSON.parse(localStorage.getItem("topics")) || [];

  if (editingIndex === -1) {
    // Adding a new topic
    topics.push({ name: topicName, link: topicLink });
  } else {
    // Updating an existing topic
    topics[editingIndex].name = topicName;
    topics[editingIndex].link = topicLink;
    editingIndex = -1;  // Reset the editing index after update
    document.getElementById("addButton").innerText = "Add Topic";  // Change button text back to "Add Topic"
  }

  localStorage.setItem("topics", JSON.stringify(topics));
  refreshTable();  // Refresh the table with updated data

  // Clear input fields
  document.getElementById("topicName").value = "";
  document.getElementById("topicLink").value = "";
}

// Load topics from localStorage and display them in the table
function loadTopics() {
  let topics = JSON.parse(localStorage.getItem("topics")) || [];
  for (let i = 0; i < topics.length; i++) {
    appendTopicToTable(topics[i].name, topics[i].link, i);
  }
}

// Refresh the table to reflect the current data in localStorage
function refreshTable() {
  let tableBody = document.getElementById("topicTable").getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";  // Clear the table first
  loadTopics();  // Reload the topics
}

// Append a single topic to the table
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

// Edit a topic
function editTopic(index) {
  let topics = JSON.parse(localStorage.getItem("topics")) || [];
  document.getElementById("topicName").value = topics[index].name;
  document.getElementById("topicLink").value = topics[index].link;

  editingIndex = index;  // Set the current editing index
  document.getElementById("addButton").innerText = "Update Topic";  // Change button text to "Update Topic"
}

// Delete a row from the table and from localStorage
function deleteRow(index) {
  let topics = JSON.parse(localStorage.getItem("topics")) || [];
  topics.splice(index, 1);  // Remove the topic at the specified index
  localStorage.setItem("topics", JSON.stringify(topics));
  refreshTable();  // Refresh the table with updated data
}