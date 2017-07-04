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
  firstTrainTime = moment().format(firstTrainTime, "HH:mm");

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
  var currentInHours = moment().format("HH");
  var current = moment().format("HH:mm");

  var arrivalTime = moment(childsnapshot.val().arrivalTime);
  // var arrivalTimeInHours = moment().format(arrivalTime, "HH");

  var minutesAway = childsnapshot.val().trainFrequency - (currentInMinutes % childsnapshot.val().trainFrequency);
  var nextTrainTime = moment().add(minutesAway, 'minutes').format("hh:mm a");

  console.log(moment(current, "HH:mm").diff(moment(arrivalTime, "HH:mm")));

  $('#trainNameData').prepend(childsnapshot.val().trainName + '<br>');
  $('#destinationData').prepend(childsnapshot.val().trainDestination + '<br>');
  $('#nextArrivalData').prepend(nextTrainTime + '<br>');
  $('#frequencyData').prepend(childsnapshot.val().trainFrequency + '<br>');
  $('#minutesAwayData').prepend(minutesAway + '<br>');

});

//
// console.log(minutesAway);
// console.log(currentInHours);
// console.log(trainInHours);
//
// if (currentInHours > trainInHours) {
//   $('#minutesAwayData').prepend(minutesAway + '<br>');
// } else if (currentInHours < trainInHours) {
//   $('#minutesAwayData').prepend(moment(arrivalTime).diff(moment(), "minutes") + '<br>');
// }
