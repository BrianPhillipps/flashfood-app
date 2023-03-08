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
const currentDate = new Date();
const deliversAvailable = 20;
const currentTime = new Date();
async function submitForm() {
	const date = currentDate.toString();
	const selectedTime = new Date();
	const status = "Ordered";
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const id = document.getElementById("studentID").value;
	const dorm = document.getElementById("dorm").value;
	const meal = document.getElementById("meal").value;
	const room = document.getElementById("room").value;
	const time = document.getElementById("time").value;
	const phone = document.getElementById("phone").value;
	const comment = document.getElementById("comment").value;
	const ref = firebase.database().ref("times/" + time);
	const timeRef = firebase.database().ref("times");
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(kent.edu)$/;
	const idRegex = /^\d+$/;
	selectedTime.setHours(time.split(":")[0], time.split(":")[1], 0);

	let now = new Date();
	let tenMinutes = new Date(now.getTime() + 10 * 60 * 1000);

	if (
		name == "" ||
		email == "" ||
		id == "" ||
		dorm == "" ||
		meal == "" ||
		room == "" ||
		time == "" ||
		phone == ""
	) {
		alert("Please fill in all fields");
		if (name == "") {
			document.getElementById("name").style.borderColor = "red";
		}
		if (email == "") {
			document.getElementById("email").style.borderColor = "red";
		}
		if (id == "") {
			document.getElementById("studentID").style.borderColor = "red";
		}
		if (dorm == "") {
			document.getElementById("dorm").style.borderColor = "red";
		}
		if (meal == "") {
			document.getElementById("meal").style.borderColor = "red";
		}
		if (room == "") {
			document.getElementById("room").style.borderColor = "red";
		}
		if (time == "") {
			document.getElementById("time").style.borderColor = "red";
		}
		if (phone == "") {
			document.getElementById("phone").style.borderColor = "red";
		}
	} else if (!emailRegex.test(email)) {
		alert("Please enter a valid Kent email address");
	} else if (!idRegex.test(id)) {
		alert("Please enter a valid student ID");
	} else if (id < 100000000 || id > 999999999) {
		alert("Please enter a valid student ID");
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
		} else if (selectedTime < tenMinutes) {
			alert(
				"Please select a time valid time. Make sure it is atleast 10 minutes from now."
			);
		} else {
			studentRef.child(id).set({
				id: id,
				name: name,
				email: email,
			});
			ref.child(id).set({
				id: id,
				status: status,
				date: date,
				name: name,
				phone: phone,
				comment: comment,
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

// loading page
$(document).ready(function () {
	$(".content").hide();
	setTimeout(function () {
		$(".loader-wrapper").fadeOut("slow", function () {
			$(".content").fadeIn("slow");
		});
	}, 2100);
});

// Check Order
function checkOrder() {
	window.open("checkorder.html", "_blank");
}

function checkMenu() {
	window.open("checkmenu.html", "_blank");
}


window.onload = function robot() {
	console.log("       __\r\n   _  |@@|\r\n  \/ \\ \\--\/ __\r\n  ) O|----|  |   __\r\n \/ \/ \\ }{ \/\\ )_ \/ _\\\r\n )\/  \/\\__\/\\ \\__O (__\r\n|\/  (--\/\\--)    \\__\/\r\n\/   _)(  )(_\r\n   `---\'\'---`");
}
