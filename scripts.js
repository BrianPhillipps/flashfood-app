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

var deliversAvailable = 20;

function submitForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var id = document.getElementById("studentID").value;
  var dorm = document.getElementById("dorm").value;
  var meal = document.getElementById("meal").value;
  var room = document.getElementById("room").value;
  var time = document.getElementById("time").value;
  var ref = firebase.database().ref("times/" + time);
  var timeRef = firebase.database().ref("times");
  // var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(kent.edu)$/;
  var idRegex = /^\d+$/;
  if (name == "" || email == "" || id == "" || dorm == "" || meal == "" || dorm == "" || room == "") {
    alert("Please fill in all fields");
  } else if (!emailRegex.test(email)) {
    alert("Please enter a valid Kent email address");
  } else if (!idRegex.test(id)) {
    alert("Please enter a valid student ID");
  } else {
    timeRef.child(time).once("value", function (snapshot) {
      var count = snapshot.numChildren();
      if (count >= deliversAvailable) {
        alert(
          "Sorry, this dinner is full. Please select another time or wait until tomorrow."
        );
      } else {
        ref.child(id).set({
          id: id,
          name: name,
          time: time,
          room: room,
          meal: meal,
          email: email,
          dorm: dorm
        });
        alert("You have been registered for dinner at " + time + "!");
      }
    });
  }
}

function clearDatabase() {
  database.ref("times").remove();
  alert("database cleared");
}

var ref = firebase.database().ref("times");

ref.on("value", function (snapshot) {
  var sevenCount = snapshot.child("7:00").numChildren();
   document.getElementById("7").innerHTML =
    "Time slots at 7:00 left: " + (deliversAvailable - sevenCount);

  var eightCount = snapshot.child("8:00").numChildren();
   document.getElementById("8").innerHTML =
    "Time slots at 8:00 left: " + (deliversAvailable - eightCount);

  var nineCount = snapshot.child("9:00").numChildren();
   document.getElementById("9").innerHTML =
    "Time slots at 9:00 left: " + (deliversAvailable - nineCount);

 
});



