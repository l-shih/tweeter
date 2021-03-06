$(() => {
  // this will initialize the web app for the user
  function main() {
    // the compose box is hidden on page load
    $(".new-tweet").hide();

    // compose box is toggled by this function
    $("#nav-bar button.compose").on("click", function() {
      $(".new-tweet").slideToggle();
      $(".new-tweet textarea").select();
    });

    loadTweets();

    // this is run only when a user submits a new tweet
    $("#send-tweet").on("submit", sendNewTweet);
  }

  // this ensures that use cannot input script that will mess with other user's experience with Tweeter
  // currently is vulnerable to attacks via the URL of user's avatar
  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // note that this web app may be run on Vagrant, so the time returned .fromNow() may not match the actual time exactly
  function daysAgo(numDate) {
    return moment(numDate).fromNow();
  }

  function renderTweets(tweets) {
    const HTML = tweets.map((tweet) =>
      `<article class="tweet" data-tweet-id="${tweet._id}">
        <header>
          <img class="avatar" src="${tweet.user.avatars.small}" alt=""></img>
          <h2>${escape(tweet.user.name)}</h2>
          <h4>${escape(tweet.user.handle)}</h4>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <div class="tweet-date">${daysAgo(tweet.created_at)}</div>
          <div class="tweet-likes-number">${tweet.likes}</div>
          <div class="tweet-likes-text">likes</div>
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>`).reverse();
    $(".tweets-dash").html(HTML);
  }

  function loadTweets() {
    $.getJSON("/tweets")
      .done(renderTweets);
  }

  function sendNewTweet(event) {
    event.preventDefault();
    const $form = $(this);
    const tweetText = $form.find('textarea[name="text"]').val();
    if (tweetText.length > 140) { return alert(`Your tweet is over 140 characters long. Please try again.`); }
    if (!tweetText) { return alert(`You didn't seem to tweet anything. Please try again.`); }
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $form.serialize()
    })
      .done(() => {
        loadTweets();
        $(".new-tweet textarea").val('');
        $("#counter").text(140);
      });
  }

  main();

});

$(document).on("click", ".fa-heart", function () {
  const likeButton = $(this);
  const tweetArticle = likeButton.closest(".tweet");
  const tweetLikedId = tweetArticle.data("tweet-id");
  const url = `/tweets/${tweetLikedId}/like`;
  //Post request to like a tweet
  $.ajax({
    type: "POST",
    url: url,
  })
    .done((tweet) => {
      tweetArticle.find(".tweet-likes-number").text(tweet.likes);
    });
});




















