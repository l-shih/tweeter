const tweetData = [
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

$(() => {

function daysAgo(numDate) {
  const dateObj = new Date(numDate);
  const compare = Date.now() - dateObj;
  const numOfDays = Math.round(compare / (1000*60*60*24));
  if (numOfDays > 0) {
    return numOfDays + " days ago";
  } else {
    return "today";
  }
}

function escape(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTweets(tweet) {
  for (let tweet in tweetData) {
    createTweetElement(tweetData[tweet]);
  }
}

function createTweetElement(tweet) {
  const $tweet = $("section.tweets-dash").append(`
    <article class="tweet">
      <header>
        <img class="avatar" src="${escape(tweet.user.avatars.small)}" alt=""></img>
        <h2>${escape(tweet.user.name)}</h2>
        <h4>${escape(tweet.user.handle)}</h4>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer> ${escape(daysAgo(tweet.created_at))}
        <div class="icons">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    </article>`);
  return $tweet;
};

//currently returns text=[inputted text]
function sendNewTweet(event) {
  event.preventDefault();
  const $form = $(this);

  $.ajax({
    type: "POST",
    url: "/tweets",
    data: $form.serialize()
  })

  console.log($form.serialize());

  // .done(() => {
  //   const type = $form.find("input[name="type"]").val();
  //   console.log(type);
  // })
}

//currently console logs all tweet objects created
function loadTweets(tweetData) {
  $.getJSON("/tweets")
    .done((tweetData) => {
      console.log(tweetData);
    })
    .done((tweetData) => {
      renderTweets(tweetData)
    })
}

const $form = $("#send-tweet");

$form.on("submit", sendNewTweet);

loadTweets(tweetData);
//renderTweets(tweetData);

});






















