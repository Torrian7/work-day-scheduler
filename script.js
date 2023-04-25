// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Get current hour using Day.js
  var currentHour = dayjs().format("H");

  // Add click event listener to save buttons
  $(".saveBtn").on("click", function () {
    // Get the parent time-block element
    var timeBlock = $(this).closest(".time-block");
    // Get the hour from the id of the time-block element
    var hour = timeBlock.attr("id");
    // Get the description from the textarea in the same time-block
    var description = timeBlock.find(".description").val();
    // Save the description in local storage using the hour as the key
    localStorage.setItem(hour, description);
  });

  // Loop through each time-block and apply past, present, or future class based on current hour
  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Loop through each time-block and get the corresponding description from local storage
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var description = localStorage.getItem(hour);
    // Set the description in the textarea
    $(this).find(".description").val(description);
  });

  // Display the current date in the header of the page
  $("#currentDay").text("Today is " + dayjs().format("MMMM D, YYYY"));
});
