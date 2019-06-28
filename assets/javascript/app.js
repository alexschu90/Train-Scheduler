var firebaseConfig = {
    apiKey: "AIzaSyA2nLb-YmfL0E78fjqx4aC2Xupgi0-_UaI",
    authDomain: "train-scheduler-a3dda.firebaseapp.com",
    databaseURL: "https://train-scheduler-a3dda.firebaseio.com",
    projectId: "train-scheduler-a3dda",
    storageBucket: "",
    messagingSenderId: "108557626599",
    appId: "1:108557626599:web:767162b4c7ece3ea"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database(); 

  $("#add-train").on("click", function(event) {
      event.preventDefault(); 

      var nTrainName = $("#train-name-input").val().trim();
      var nDestination = $("#destination-input").val().trim();
      var nFirstTrain = $("#first-train-time-input").val().trim();
      var nFrequency = $("#frequency-input").val().trim();

      var trainInfo = {
          name: nTrainName,
          destination: nDestination,
          first: nFirstTrain,
          frequency: nFrequency
      };

      database.ref().push(trainInfo);

      console.log(trainInfo.name);
      console.log(trainInfo.destination);
      console.log(trainInfo.first);
      console.log(trainInfo.frequency);

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-time-input").val("");
      $("#frequency-input").val("");
  })

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var nTrainName = childSnapshot.val().name;
    var nDestination = childSnapshot.val().destination;
    var fTrain = childSnapshot.val().first;
    var nFrequency = childSnapshot.val().frequency;

    console.log(nTrainName);
    console.log(nDestination);
    console.log(nFrequency);

var firstTimeConverted = moment(fTrain, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment(); 
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemaining = diffTime % nFrequency;
console.log(tRemaining);

var minutesAway = nFrequency - tRemaining;
console.log("MINUTES TILL TRAIN: " + minutesAway);

var nextArrival = moment().add(minutesAway, "minutes");
console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));


    var newRow = $("<tr>").append(
        $("<td>").text(nTrainName),
        $("<td>").text(nDestination),
        $("<td>").text(nFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    $("#train-schedule > tbody").append(newRow);
  })