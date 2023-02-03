// firebase connection
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

// form submission
var currentDate = new Date();
var deliversAvailable = 20;
var currentTime = new Date();
async function submitForm() {
	var date = currentDate.toString();
	var selectedTime = new Date();
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var id = document.getElementById("studentID").value;
	var dorm = document.getElementById("dorm").value;
	var meal = document.getElementById("meal").value;
	var room = document.getElementById("room").value;
	var time = document.getElementById("time").value;
	var phone = document.getElementById("phone").value;
	var ref = firebase.database().ref("times/" + time);
	var timeRef = firebase.database().ref("times");
	var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(kent.edu)$/;
	var idRegex = /^\d+$/;
	selectedTime.setHours(time.split(":")[0], time.split(":")[1], 0);

	let now = new Date();
	let tenMinutes = new Date(now.getTime() + 10 * 60 * 1000);

	if (selectedTime < tenMinutes) {
		alert("Please select a time that is at least 10 minutes from now.");
	} else if (
		name == "" ||
		email == "" ||
		id == "" ||
		dorm == "" ||
		meal == "" ||
		dorm == "" ||
		room == "" ||
		phone == ""
	) {
		alert("Please fill in all fields");
	} else if (!emailRegex.test(email)) {
		alert("Please enter a valid Kent email address");
	} else if (!idRegex.test(id)) {
		alert("Please enter a valid student ID");
	} else if (id < 100000000 || id > 999999999) {
		alert("Please enter a valid student ID");
	} else if (selectedTime < currentTime) {
		alert("Selected time has already passed, please select a valid time");
	} else {
		var studentRef = firebase.database().ref("students");
		const studentSnapshot = await studentRef.child(id).once("value");
		if (studentSnapshot.exists()) {
			alert("You have an existing order already.");
			return;
		}
		const timeSnapshot = await timeRef.child(time).once("value");
		var count = timeSnapshot.numChildren();
		if (count >= deliversAvailable) {
			alert(
				"Sorry, this dinner is full. Please select another time or wait until tomorrow."
			);
		} else {
			studentRef.child(id).set({
				id: id,
				name: name,
				email: email,
			});
			ref.child(id).set({
				id: id,
				date: date,
				name: name,
				phone: phone,
				time: time,
				room: room,
				meal: meal,
				email: email,
				dorm: dorm,
			});
			window.localStorage.setItem("time", time);
			window.location = "deliverypage.html";
		}
	}
}

// clear database
function clearDatabase() {
	database.ref("times").remove();
	alert("database cleared");
}

// Page popup
let popup = document.getElementById("popup");

function openpopup() {
	popup.classList.add("open-popup");
}

function closepopup() {
	popup.classList.remove("open-popup");
}

// loading page
$(document).ready(function () {
	$(".content").hide();
	setTimeout(function () {
		$(".loader-wrapper").fadeOut("slow", function () {
			$(".content").fadeIn("slow");
		});
	}, 2500);
});

// Check Order
function checkOrder() {
	window.open("checkorder.html", "_blank");
}
