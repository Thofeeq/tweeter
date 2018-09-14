/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Hide the form when the page loads  
  $(".new-tweet").hide();
  

  //Upon clicking the compose button, activate slide toggle animation(1000ms) and focus on the textarea
  $("#compose").click(function() {
    $(".new-tweet").slideToggle(1000);
    $( "#tweet-box" ).focus();
    });


  //This event handler takes care of posting the tweet
  $( "form" ).on( "submit", function( event ) {
    //getting the text from the textbox
    var formValue =  $("#tweet-box").val();
    //Prevent html form's post/action default
    event.preventDefault(); 
    //Error handling - If length of chars is 0 or more than 140, or Null, then show/hide the respective errors.
    
    if(formValue.length > 140) {
      $("#error-tooLong").show();
      $("#error-empty").hide();
      } else if(formValue.length === 0 || formValue.length === null) {
      $("#error-empty").show();
      $("#error-tooLong").hide();
      } else {
      $("#error-empty").hide();
      $("#error-tooLong").hide();
      $.post( "/tweets/", $( this ).serialize(),function(){
        //Loading the tweets once the tweet has been posted
        (loadTweets());
        //Empty the text in form once the post has been completed.
        $("#tweet-box").val("");
        $("#counter-id").html("140");
        });
      }
    });


  //Makes an AJAX get request to "/tweets", then renders all the tweets
  function loadTweets(){
    $.ajax("/tweets/", { method: "GET" })
    .then(function (tweet_db) {
      renderTweets(tweet_db);     
    });
  }

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour:'2-digit', minute:'2-digit' };
  //This function takes data from the DB and parses it into HTML responsible for a single tweet
  function createTweetElement(tweetObj){

    function getRelativeTime(milliseconds){
      let relativeTime = "";
      const secondInMilli = 1000;
      const minuteInMilli = 60 * secondInMilli;
      const hourInMilli = 60 * minuteInMilli;
      const dayInMilli = 24 * hourInMilli;
      const monthInMilli = 30 * dayInMilli;
      if(Math.floor(milliseconds) <= minuteInMilli){
        relativeTime = "moments ago";
      } else if(Math.floor(milliseconds) < (hourInMilli)){
        relativeTime = Math.floor(milliseconds/minuteInMilli) + " minutes ago" 
      } else if(Math.floor(milliseconds) < (dayInMilli)){
        if(milliseconds < (hourInMilli * 2 ) ){
          relativeTime = Math.floor(milliseconds/hourInMilli) + "  hour ago";
        } else{
          relativeTime = Math.floor(milliseconds/hourInMilli) + " hours ago";
        }  
      } else if(Math.floor(milliseconds) < (monthInMilli)){
        if(milliseconds < (dayInMilli * 2 )) {
          relativeTime = Math.floor(milliseconds/dayInMilli) + "day ago"; 
        }
        else {
          relativeTime = Math.floor(milliseconds/dayInMilli) +" days ago"; 
        }
      } else {
        return new Date(milliseconds);
      }
      return relativeTime;
    }
    
  
    let newTweet = $("<article>").html(
    `<header>
      <img src="${$("<p>").text(tweetObj.user.avatars.small).html()}">
      <h3>${$("<h3>").text(tweetObj.user.name).html()}</h3>
      <p>${$("<p>").text(tweetObj.user.handle).html()}</p>
    </header>
    <p>${$("<p>").text(tweetObj.content.text).html()}</p>
    <hr>
    <footer>
      <p>${$("<p>").text(getRelativeTime(new Date() - new Date(tweetObj.created_at))).html()}</p>
      <div class="icons">
        <span class="glyphicon glyphicon-flag  " aria-hidden="true"></span>
        <span class="glyphicon glyphicon-retweet " aria-hidden="true"></span>
        <span class="glyphicon glyphicon-heart  " aria-hidden="true"></span> 
      </div>
    </footer>
    `).addClass("tweets");   
  
    return newTweet;
}

  //This will render tweets given a list of user objects
  function renderTweets(tweets) {
    // loops through the tweets
    tweets.forEach(function(tweet){
      //render the html for each tweet
      var $tweet = createTweetElement(tweet);
      //prepend the rended html to the container so it appears on top
      $(".tweet-container").prepend($tweet);

      //this takes of hover animation ( used JQuery event instead of CSS pseudo class)
      $(".tweets").mouseenter(function(event){
        $(this).find(".icons").addClass("hover-true"); 
        $(this).find("header").addClass("hover-true-bord");
        $(this).addClass("hover-true-body-bord");
        $(this).find("img").addClass("hover-true-image");
      }).mouseleave(function(){
        $(this).find(".icons").removeClass("hover-true");
        $(this).find("header").removeClass("hover-true-bord")
        $(this).removeClass("hover-true-body-bord");
        $(this).find( "img").removeClass("hover-true-image");
      });
    })
  }
  //load all stored tweets as soon page finishes loading 
  loadTweets();
  });