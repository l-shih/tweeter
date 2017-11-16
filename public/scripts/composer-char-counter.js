$(document).ready(function() {
  function countChar() {
    const maxLength = 140;
    const compare = maxLength - this.value.length;
    $("#counter").text(compare).css("color", compare < 0 ? "red" : "black");
  };

  $("#composed-tweet").on("input", countChar);
});
