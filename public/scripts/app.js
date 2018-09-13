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
    //since serialize contains "text=", slice string to get the actual input(tweet) 
    var formValue =  $(this).serialize().slice(5);
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
        $('#tweet-box').val('');
        });
      }
    });
////////////////

////////////////////////////////////////////
    function loadTweets(){
      var arr = [];
      $.ajax('/tweets/', { method: 'GET' })
    .then(function (test) {
      renderTweets(test);
     
    });
  
    }


/////////////////////////////////////////////////////////////////////

function createTweetElement(tweetObj){
  let newTweet = $("<article>").html(`<header>
  <img src="${$("<p>").text(tweetObj.user.avatars.small).html()}">
  <h3>${$("<h3>").text(tweetObj.user.name).html()}</h3>
  <p>${$("<p>").text(tweetObj.user.handle).html()}</p>
  </header>
  <p>${$("<p>").text(tweetObj.content.text).html()}</p>
  <hr>
  <footer>
  <p>${$("<p>").text(Date(tweetObj.createdAt)).html()}</p>
  <div class="icons">
  <span class="glyphicon glyphicon-flag  " aria-hidden="true"></span>
  <span class="glyphicon glyphicon-retweet " aria-hidden="true"></span>
  <span class="glyphicon glyphicon-heart  " aria-hidden="true"></span> 
</div>
  </footer>
  `).addClass("tweets");   
  
  
  return newTweet;
}

//////////////////////////////////////////
function renderTweets(tweets) {
  // loops through tweets
  tweets.forEach(function(tweet){
   var $tweet = createTweetElement(tweet);

   $('.tweet-container').prepend($tweet);
   $('.tweets').mouseenter(function(event){
    console.log("here");
    $(this).find(".icons").addClass("hover-true"); 
    $(this).find("header").addClass("hover-true-bord");
    $(this).find(".tweets").addClass("hover-true-body-bord");
    $(this).find(".tweets img").addClass("hover-true-image");
  }).mouseleave(function(){
    $(this).find(".icons").removeClass("hover-true");
    $(this).find("header").removeClass("hover-true-bord")
    $(this).find(".tweets").removeClass("hover-true-body-bord");
    $(this).find( ".tweets img").removeClass("hover-true-image");
  });
  })
}

function escape1(str) {
  var article = document.createElement('article');
  article.appendChild(document.createTextNode(str));
  return article.innerHTML;
}

loadTweets();
  });