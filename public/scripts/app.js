/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $(".tweets").mouseenter(function(event){
      $(".icons").addClass("hover-true"); 
      $("header").addClass("hover-true-bord");
      $(".tweets").addClass("hover-true-body-bord");
      $(".tweets img").addClass("hover-true-image");
    }).mouseleave(function(){
      $(".icons").removeClass("hover-true");
      $("header").removeClass("hover-true-bord")
      $(".tweets").removeClass("hover-true-body-bord");
      $(".tweets img").removeClass("hover-true-image");
    }) 
  });