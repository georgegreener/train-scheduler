var config = {
    apiKey: "AIzaSyCVywqNgnFjkBSu2iJ_REZU6WEq8nr1Nag",
    authDomain: "train-scheduler-e8492.firebaseapp.com",
    databaseURL: "https://train-scheduler-e8492.firebaseio.com",
    projectId: "train-scheduler-e8492",
    storageBucket: "",
    messagingSenderId: "874555151059"
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = $("#firstTrainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };
    database.ref().push(newTrain);
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrainTime);
    // console.log(newTrain.frequency);
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrainTime);
    // console.log(frequency);
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>"
        + destination + "</td><td>" + frequency + "</td></tr");
});