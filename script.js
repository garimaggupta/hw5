//Get Current date in Day, Month, Date format using moment.js library
let currentDate = moment().format("dddd, MMMM D");

//Display current date on the browser
$("#currentDay").text(currentDate);

/* Pull previously scheduled events from local storage if they exist, else initialize the schedule array with empty strings */
if (typeof localStorage.dayEvents !== "undefined")
  var currentSchedule = JSON.parse(localStorage.getItem("dayEvents"));
else currentSchedule = ["", "", "", "", "", "", "", "", ""];

/* This function will execute when the app first loads or browser window containing the app is refreshed */
$("document").ready(function () {
  // use moment.js library to get the current hour
  var currentHour = moment().hour();

  /* loop through all the timeblocks and color code them as grey, red and green based on time block in past, present or future respectively */
  $(".description").each(function () {

    //retrieve the hour set on the time-block
    var hourValue = $(this).parent().attr("hour-value");

    if (hourValue < currentHour) {
      $(this).addClass("past");
    } else if (hourValue == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
  
  /* Update the events inputs for specific time-blocks with events that were entered previously. this data is pulled from the local storage */
  currentSchedule.forEach(function (item, index) {
    let scheduleText = parseInt(index) + 9;
    console.log(scheduleText);
    $("#" + scheduleText).val(item);
  });
});

/* Click handler on the save button. This function saves the events inputted for specific time-blocks into local storage for future retrieval */
$(".saveBtn").click(function () {
  var hourClicked = $(this).parent().attr("hour-value");
  currentSchedule[hourClicked - 9] = $.trim($("#" + hourClicked).val());
  localStorage.setItem("dayEvents", JSON.stringify(currentSchedule));
});
