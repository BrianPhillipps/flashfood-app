var time = window.localStorage.getItem("time");
let modifiedTimeString = time.replace(":", "");
let num = parseInt(modifiedTimeString);
let newTime = modifiedTimeString - 1200;
var endTime = newTime.toString();
let displayTime = endTime.slice(0, 1) + ":" + endTime.slice(1);
document.getElementById("timeDis").innerHTML += " " + displayTime;

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

function checkOrder() {
	window.open("checkorder.html", "_blank");
}
