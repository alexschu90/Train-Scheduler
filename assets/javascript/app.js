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

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-time-input").val("");
      $("#frequency-input").val("");
  })

  database.ref().on("child_added", function(childSnapshot) {

    var nTrainName = childSnapshot.val().name;
    var nDestination = childSnapshot.val().destination;
    var fTrain = childSnapshot.val().first;
    var nFrequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(fTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment(); 
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemaining = diffTime % nFrequency;
    var minutesAway = nFrequency - tRemaining;
    var nextArrival = moment().add(minutesAway, "minutes");

    var newRow = $("<tr>").append(
        $("<td>").text(nTrainName),
        $("<td>").text(nDestination),
        $("<td>").text(nFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)
    );

    $("#train-schedule > tbody").append(newRow);
  })