// Fake data taken from tweets.json
const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  // loops through tweets
  tweets.forEach(function(tweet){
    $tweet =createTweetElement(tweet);
$('.tweet-container').append(tweet[0].outerHTML);
  })
   

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
  `).addClass("tweets");                  
  return newTweet;
}


renderTweets(data);