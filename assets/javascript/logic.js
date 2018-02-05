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
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
    // console.log(trainName);
    // console.log(destination);
    // console.log(firstTrainTime);
    // console.log(frequency);
    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    // console.log(firstTrainTimeConverted);
    var currentTime = moment();
    // console.log("Current Time: " + moment(currentTime).format("hh:mm"));
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    // console.log("Difference In Time: " + diffTime);
    var timeRemainder = diffTime % frequency;
    // console.log(timeRemainder);
    var minutesTillTrain = frequency - timeRemainder;
    // console.log("Minutes till train: " + minutesTillTrain);
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    // console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>"
        + destination + "</td><td>" + frequency + "</td><td>"
        + moment(nextTrain).format("hh:mm a") + "</td><td>"
        + minutesTillTrain + "</td></tr");
});