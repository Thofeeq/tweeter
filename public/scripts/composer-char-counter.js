$(document).ready(function() {
  var maxChars = 140;
  $(".new-tweet textarea").keyup(function(event){
    var currentNum = maxChars - $(this).val().length;
    if($(this).val().length > 140){
      $(".counter").html(currentNum).css({color:"red"});
    }else{
      $(".counter").html(currentNum).css({color:"#244751"});
    }
  });
});

