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

// Function to retrieve and display student data
function showStudentData() {
	var studentDataRef = database.ref("times");
	var studentIdInput = document.getElementById("studentIdInput");
	var studentId = studentIdInput.value;
	var orderDisplay = document.getElementById("orderDisplay");

	studentDataRef.once("value", function (snapshot) {
		var times = snapshot.val();
		for (var time in times) {
			var studentData = times[time][studentId];
			if (studentData) {
				let modifiedTimeString = studentData.time.replace(":", "");
				let newTime = modifiedTimeString - 1200;
				var endTime = newTime.toString();
				let displayTime = endTime.slice(0, 1) + ":" + endTime.slice(1);
				orderDisplay.innerHTML =
					"Time of Delivery: " +
					displayTime +
					"<br>" +
					"Meal: " +
					studentData.meal +
					"<br>" +
					"Status: " +
					studentData.status;
				break;
			}
		}
		if (!studentData) {
			orderDisplay.innerHTML = "No data found for student ID: " + studentId;
		}
	});
}
