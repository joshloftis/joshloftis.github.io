// Firebase Global
//-----------------------------------------------------------------------------------------------------------------------------
//
var config = {
  apiKey: "AIzaSyDwn2-sDPXEe63-hFD8E3jMRF8pRd7m3b4",
  authDomain: "train-project-gt.firebaseapp.com",
  databaseURL: "https://train-project-gt.firebaseio.com",
  projectId: "train-project-gt",
  storageBucket: "train-project-gt.appspot.com",
  messagingSenderId: "159873692724"
};
firebase.initializeApp(config);
var database = firebase.database();

// Retrieve train info from form and push to database
//-----------------------------------------------------------------------------------------------------------------------------
//
//On click on #insert-train button...
$('#insert-train').on("click", function(event) {
    //prevent page from refreshing
    event.preventDefault();
    //only allow info to be submitted if all fields have data
    if (($("#train-name").val().length > 0) && ($("#destination").val().length > 0) && ($("#first-train-time").val().length > 0) && ($("#frequency-min").val().length > 0)) {
      // store train name in trainName var
      var trainName = $("#train-name").val().trim();
      // store destination in destination var
      var destination = $("#destination").val().trim();
      // store first train time in firstTrain var
      var firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").format("HH:mm");
      // store interval of train arrival in frequency var
      var frequency = $("#frequency-min").val().trim();
      // push train info stored in vars above to database
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });
      // clear input #train-name input field
      $("#train-name").val("");
      // clear input #destination input field
      $("#destination").val("");
      // clear input #first-train-time input field
      $("#first-train-time").val("");
      // clear input #frequency-min input field
      $("#frequency-min").val("");
    } else {
      //
      alert("Fill out all of the fields, please!");
    }
});
// Firebase handler to retrive and list all train records
//-----------------------------------------------------------------------------------------------------------------------------
//
database.ref().on("child_added", function(snap) {
  // store value of trainName snapshot in trainName var
  var trainName = snap.val().trainName;
  // store value of destination snapshot in destination var
  var destination = snap.val().destination;
  // store value of firstTrain snapshot in firstTrain var
  var firstTrain = snap.val().firstTrain;
  // store value of frequency snapshot in frequency var
  var frequency = snap.val().frequency;
  // converting entered time to military time in case non-military time is entered and store in convertTime var
  var convertTime = moment(firstTrain, "HH:mm");
  // find the different between the current time (i.e. moment()) and the convertTime and store in diff var
  var diff = moment().diff(moment(convertTime), "minutes");
  // modulus operation to find the remainder of diff divided by frequency and store it in remainder var
  var remainder = diff % frequency;
  // difference between frequency and remainder to get time till next train and store it in minTrain var
  var minTrain = frequency - remainder;
  // add the time till next the next train to the current time, format it in militay time, and store it in nextTrain var
  var nextTrain = moment().add(minTrain, "minutes").format("HH:mm");

  //build table data
  var tdname = $('<td>').text(trainName);
  var tddest = $('<td>').text(destination);
  var tdfreq = $('<td>').text(frequency);
  var tdnext = $('<td>').text(nextTrain);
  var tdaway = $('<td>').text(minTrain);
  var tr = $('<tr>');

  //append all table data to table row
  tr.append(tdname)
    .append(tddest)
    .append(tdfreq)
    .append(tdnext)
    .append(tdaway);

  // prepend all table rows to table body (prepend so most recent is at top)
  $('tbody').prepend(tr);
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
