// Initialize Firebase
var config = {
  apiKey: "AIzaSyAYmnIgfQAgGkWg6uxNLp6YBiITMDDMjX0",
  authDomain: "trainschedule-ba8d8.firebaseapp.com",
  databaseURL: "https://trainschedule-ba8d8.firebaseio.com",
  projectId: "trainschedule-ba8d8",
  storageBucket: "trainschedule-ba8d8.appspot.com",
  messagingSenderId: "990670730957"
};
firebase.initializeApp(config);
var database = firebase.database();

$('.btn').on('click', function(event) {
  event.preventDefault();
  var name = $('#inputName').val().trim();
  var destination = $('#inputDestination').val().trim();
  var firstTrainTime = $('#inputTime').val().trim();
  var frequency = $('#inputFrequency').val().trim();
  console.log(name);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  var newTrain = {
    trainName: name,
    trainDestination: destination,
    arrivalTime: firstTrainTime,
    trainFrequency: frequency,
  }

  database.ref().push(newTrain);

  database.ref().on("child_added", function(childsnapshot) {
    var newRow = $('<tr>');
    var newData = $('<td>');

    $('#trainNameData').append(childsnapshot.val().trainName + '<br>');
    $('#destinationData').append(childsnapshot.val().trainDestination + '<br>');
    $('#nextArrivalData').append(childsnapshot.val().arrivalTime + '<br>');
    $('#frequencyData').append(childsnapshot.val().trainFrequency + '<br>');
    // $('#tbody').append(newRow);
  })
});
