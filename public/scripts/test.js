// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

function createTweetElement(tweetObj){
  let newTweet = $("<article>").html(
  `<header>
  <img src="${tweetObj.user.avatars.small}">
  <h3>${tweetObj.user.name}</h3>
  <p>${tweetObj.user.handle}</p>
  </header>
  <p>${tweetObj.content.text}</p>
  <hr>
  <footer>
  <p>${tweetObj.created_at}</p>
  <div class="icons">
  <span class="glyphicon glyphicon-flag  " aria-hidden="true"></span>
  <span class="glyphicon glyphicon-retweet " aria-hidden="true"></span>
  <span class="glyphicon glyphicon-heart  " aria-hidden="true"></span> 
</div>
  </footer>
  `).addClass("tweets")                  
  return newTweet;
}


var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)

$('.tweet-container').append($tweet);// to add it to the page so we can make sure it's got all the right elements, classes, etc
});