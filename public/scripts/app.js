$(() => {
  function main() {
    // the compose box is hidden on page load
    $("section.new-tweet").hide();

    // compose box is toggled by this function
    $("#nav-bar button.compose").on("click", function() {
      $("section.new-tweet").slideToggle();
      $("section.new-tweet textarea").select();
    })

    // this is run whenever page is loaded
    loadTweets();

    // this is run only when a user submits a new tweet
    $("#send-tweet").on("submit", sendNewTweet);
  }

  function daysAgo(numDate) {
    const dateObj = new Date(numDate);
    const compare = Date.now() - dateObj;
    const numOfDays = Math.round(compare / (1000*60*60*24));
    return numOfDays > 0 ? `${numOfDays} days ago` : `today`;
  }

  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function renderTweets(tweets) {
    const HTML = tweets.map((tweet) =>
        `<article class="tweet">
          <header>
            <img class="avatar" src="${tweet.user.avatars.small}" alt=""></img>
            <h2>${escape(tweet.user.name)}</h2>
            <h4>${escape(tweet.user.handle)}</h4>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer> ${daysAgo(tweet.created_at)}
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
    if (!tweetText) return alert(`You didn't seem to tweet anything. Please try again.`);
    if (tweetText.length > 140) return alert(`Your tweet is over 140 characters long. Please try again.`);
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: $form.serialize()
    })
    .done(() => {
      //$(".tweets-dash").prepend(loadTweets(tweetText));
      loadTweets();
      $("section.new-tweet textarea").val('');
    })
  }

  main();

});






















