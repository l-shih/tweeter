function countChar() {
  const maxLength = 140;
  const compare = maxLength - this.value.length;
  $("span#counter").text(compare).css("color", compare < 0 ? "red" : "black");
};

$(document).ready(function() {
  $("textarea#composed-tweet").on("input", countChar);
});
