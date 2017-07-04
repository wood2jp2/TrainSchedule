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
  // var nextTrainTime =

  var newTrain = {
    trainName: name,
    trainDestination: destination,
    arrivalTime: firstTrainTime,
    trainFrequency: frequency,
  };

  database.ref().push(newTrain);

})
database.ref().on("child_added", function(childsnapshot) {

  var currentInMinutes = moment().format("mm");
  var minutesAway = childsnapshot.val().trainFrequency - (currentInMinutes % childsnapshot.val().trainFrequency);
  var nextTrainTime = moment().add(minutesAway, 'minutes').format("hh:mm");

  $('#trainNameData').prepend(childsnapshot.val().trainName + '<br>');
  $('#destinationData').prepend(childsnapshot.val().trainDestination + '<br>');
  // $('#nextArrivalData').prepend(childsnapshot.val().nextInTime + '<br>');
  $('#nextArrivalData').prepend(nextTrainTime + '<br>');
  $('#frequencyData').prepend(childsnapshot.val().trainFrequency + '<br>');
  // $('#minutesAwayData').prepend(childsnapshot.val().nextInMinutes + '<br>')
  $('#minutesAwayData').prepend(minutesAway + '<br>')
});
