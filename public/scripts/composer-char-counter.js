//This script will take care of the char counter at the corner of tweet text box
$(document).ready(function() {
  var maxChars = 140;
  //listens for "keyup", if event fired, then update the counter accordingly
  $(".new-tweet textarea").keyup(function() {
    var currentNum = maxChars - $(this).val().length;
    //takes care of the styling [turns red if # of chars is over 140]
    if($(this).val().length > 140) {
      $(".counter").html(currentNum).css({color:"red"});
    } else{
      $(".counter").html(currentNum).css({color:"#244751"});
    }
  });
});

