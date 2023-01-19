
      var firebaseConfig = {
        apiKey: "AIzaSyAVfWpeD9wGo0_WjL3U3Vl8rntODLn8Thc",
        authDomain: "doordash-dining-hall.firebaseapp.com",
        databaseURL: "https://doordash-dining-hall-default-rtdb.firebaseio.com",
        projectId: "doordash-dining-hall",
        storageBucket: "doordash-dining-hall.appspot.com",
        messagingSenderId: "1017765572736",
        appId: "1:1017765572736:web:e6237d4801c629f0c5f665"
};
      firebase.initializeApp(firebaseConfig);
      var database = firebase.database();

      var seatsAvailable = 20;
      function submitForm() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var id = document.getElementById("studentID").value;
        var dorm = document.getElementById("dorm").value;
        var ref = firebase.database().ref("dorms/" + dorm);
        var dormRef = firebase.database().ref("dorms");
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var idRegex = /^\d+$/;
        if(name == "" || email == "" || id == "" || dorm == "") {
            alert("Please fill in all fields");
        }else if(!emailRegex.test(email)) {
            alert("Please enter a valid email address");
        }else if(!idRegex.test(id)){
            alert("Please enter a valid student id");
        }else{
            dormRef.child(dorm).once('value', function(snapshot) {
                var count = snapshot.numChildren();
                if (count >= seatsAvailable) {
                    alert("Sorry, this dinner is full. Please select another dorm or wait until tomorrow.")
                } else {
                    ref.child(id).set({
                        id: id,
                        name: name,
                        email: email,
                        dorm: dorm
                    });
                    alert("You have been registered for dinner in " + dorm + " dorm!");
                }
            });
        }
    }
    

    


      function clearDatabase() {
    database.ref("dorms").remove();
}

var ref = firebase.database().ref("dorms");

ref.on("value", function(snapshot) {
    var eastwayCount = snapshot.child("Eastway").numChildren();
    document.getElementById("eastway").innerHTML = "Eastway Remaining Seats: " + (seatsAvailable - eastwayCount);
    
    var twinTowersCount = snapshot.child("Twin Towers").numChildren();
    document.getElementById("twinTowers").innerHTML = "Twin Towers Remaining Seats: " + (seatsAvailable - twinTowersCount);

    var newFrontCount = snapshot.child("New Front").numChildren();
    document.getElementById("newFront").innerHTML = "New Front Remaining Seats: " + (seatsAvailable - newFrontCount);

    var triTowersCount = snapshot.child("Tri-Towers").numChildren();
    document.getElementById("triTowers").innerHTML = "Tri Towers Remaining Seats: " + (seatsAvailable - triTowersCount);

    var centenABCount = snapshot.child("Centennial Courts A+B").numChildren();
    document.getElementById("centenAB").innerHTML = "Centennial Courts A and B Remaining Seats: " + (seatsAvailable - centenABCount);

    var centenCDCount = snapshot.child("Centennial Courts C+D").numChildren();
    document.getElementById("centenCD").innerHTML = "Centennial Courts C and D Remaining Seats: " + (seatsAvailable - centenCDCount);

    var centenEFCount = snapshot.child("Centennial Courts E+F").numChildren();
    document.getElementById("centenEF").innerHTML = "Centennial Courts E and F Remaining Seats: " + (seatsAvailable - centenEFCount);

    var quadCount = snapshot.child("The Quad").numChildren();
    document.getElementById("quad").innerHTML = "The Quad Remaining Seats: " + (seatsAvailable - quadCount);
});

