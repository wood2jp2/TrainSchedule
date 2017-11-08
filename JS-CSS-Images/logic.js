// Initialize Firebase
var config = {
  apiKey: "AIzaSyAYmnIgfQAgGkWg6uxNLp6YBiITMDDMjX0",
  authDomain: "trainschedule-ba8d8.firebaseapp.com",
  databaseURL: "https://trainschedule-ba8d8.firebaseio.com",
  projectId: "trainschedule-ba8d8",
  storageBucket: "trainschedule-ba8d8.appspot.com",
  messagingSenderId: "990670730957"
};

// more firebase stuffs
firebase.initializeApp(config);

var database = firebase.database();

// submit button click function, of course
$('.btn').on('click', function(event) {

  // don't reset the page, idiot
  event.preventDefault();

  // making variables for user input
  var name = $('#inputName').val().trim();
  var destination = $('#inputDestination').val().trim();
  var firstTrainTime = $('#inputTime').val().trim();
  var frequency = $('#inputFrequency').val().trim();


  firstTrainTime = moment().format(firstTrainTime, "HH:mm");

  // train object to push as data into firebase
  var newTrain = {
    trainName: name,
    trainDestination: destination,
    arrivalTime: firstTrainTime,
    trainFrequency: frequency,
  };

  // push into firebase
  database.ref().push(newTrain);

  // clear input after submission
  $('#inputName').val("");
  $('#inputDestination').val("");
  $('#inputTime').val("");
  $('#inputFrequency').val("");

})

// so I believe this retrieves all the data from the firebase, each time a child or object is added
database.ref().on("child_added", function(childsnapshot) {

  // moment sucks, none of this stuff makes sense, I shouldn't have to convert an already converted time back into moment
  var arrivalTime = moment(childsnapshot.val().arrivalTime, "hh:mm A");

  // created this to calculate the difference of a future train, or one that has already arrived in the day
  var minuteDifference = moment(current).diff(moment(arrivalTime), "minutes");

  // current time or something
  var current = moment(moment(), "HH:mm");

  // minutes away calculation ONLY for trains that have already arrived that day
  var minutesAway = childsnapshot.val().trainFrequency - (minuteDifference % childsnapshot.val().trainFrequency);

  // calculate next train based off minutes away
  var nextTrainTime = moment().add(minutesAway, 'minutes').format("hh:mm A");

  // stupid if then statement based off of future or past arrival train
  if (minuteDifference <= 0) {

    minutesAway = minuteDifference;
    // hard coding the 24 hour input to 12 hour output onto table...
    var militaryTo12 = moment().add(-1 * minutesAway + 1, 'minutes').format("hh:mm A");

    $('#nextArrivalData').prepend(militaryTo12 + '<br>');
    $('#minutesAwayData').prepend((minuteDifference * -1) + '<br>');
  } else {
    $('#nextArrivalData').prepend(nextTrainTime + '<br>');
    $('#minutesAwayData').prepend(minutesAway + '<br>');
  };

  // the easy stuff, prepending user input to the correct fields
  $('#trainNameData').prepend(childsnapshot.val().trainName + '<br>');
  $('#destinationData').prepend(childsnapshot.val().trainDestination + '<br>');
  $('#frequencyData').prepend(childsnapshot.val().trainFrequency + '<br>');

});
