// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyAVfWpeD9wGo0_WjL3U3Vl8rntODLn8Thc",
	authDomain: "doordash-dining-hall.firebaseapp.com",
	databaseURL: "https://doordash-dining-hall-default-rtdb.firebaseio.com",
	projectId: "doordash-dining-hall",
	storageBucket: "doordash-dining-hall.appspot.com",
	messagingSenderId: "1017765572736",
	appId: "1:1017765572736:web:e6237d4801c629f0c5f665",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Reference to the "times" node in the database
var timesRef = database.ref("times");
var studentRef = firebase.database().ref("students");

// Listen for changes in the data at the "times" node
timesRef.on("value", function (snapshot) {
	// Get the value of the "times" node
	var times = snapshot.val();

	// Create an empty string to hold the HTML
	var html = "";

	// Loop through each key in the "times" object
	for (var key in times) {
		// Get the data for the current key
		var time = times[key];

		// Loop through each child in the current key
		for (var id in time) {
			// Get the data for the current child
			var data = time[id];

			// Add the data to the HTML string
			html += "<p>";
			html += "ID: " + data.id + "<br>";
			html += "Delivery Time: " + data.time + "<br>";
			html += "Name: " + data.name + "<br>";
			html += "Email: " + data.email + "<br>";
			html += "Phone: " + data.phone + "<br>";
			html += "Dorm: " + data.dorm + "<br>";
			html += "Room: " + data.room + "<br>";
			html += "Meal: " + data.meal + "<br>";
			html += "Time Placed: " + data.date + "<br>";
			html += "Status: " + data.status + "<br>";
			html +=
				"<button onclick=\"updateStatus('" +
				key +
				"', '" +
				id +
				"', 'In Progress')\">In Progress</button>" +
				" ";
			html +=
				"<button onclick=\"updateStatus('" +
				key +
				"', '" +
				id +
				"', 'Delivered')\">Delivered</button>";
			html += "</p>";
		}
	}

	// Set the innerHTML of an element to the HTML string
	document.getElementById("dataContainer").innerHTML = html;
});

// Function to update the status of an order in the database
function updateStatus(timeKey, id, status) {
	// Reference to the specific order in the database
	var orderRef = database.ref("times/" + timeKey + "/" + id);

	// Update the status of the order
	orderRef.update({
		status: status,
	});
}

function clearOrders() {
	timesRef.remove();
}

function clearDatabase() {
	let text = "Are you sure you want to clear the database?";
	if (confirm(text) == true) {
		alert("Database cleared.");
		studentRef.remove();
		timesRef.remove();
	} else {
		alert("Not cleared.");
		return;
	}
}

function hidePage() {
	var login = document.getElementById("login");
	var container = document.getElementById("container");
	container.remove();
	login.remove();
	document.getElementById("main").style.display = "block";
}

studentRef.remove();
timesRef.remove();
