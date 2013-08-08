$(function() {

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '556298371071963', // App ID
      channelUrl : '//www.firstwebproblems.com/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
      if (response.status === 'connected' && window.gameComplete) {
        window.enterHallOfFame();
      }
    });
  };

  // Load the SDK asynchronously
  (function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));

  var fbRootRef = new Firebase('https://firstwebproblems.firebaseIO.com/');
  var scoreBoard = fbRootRef.child('scoreBoard');

  function enterHallOfFame() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $.get('https://graph.facebook.com/' + FB.getAuthResponse().userID, {
          fields: 'name,picture.type(large),location'
        }, function(data) {
          if (data) {
            scoreBoard.child(data.id).setWithPriority({
              name: data.name,
              pic: data.picture.data.url,
              location: data.location ? data.location : '',
              score: 0
            }, new Date().getTime());
          }
        });

        $('html, body').animate({ scrollTop: $("#hall-of-fame").offset().top },
          800);
      }
      else {
        FB.login();
      }
    });
  }
  window.enterHallOfFame = enterHallOfFame;

  $('#dialog2-bt').click(function() {
    window.enterHallOfFame();
    $('#dialog2').dialog('close');
  });

  $('#bt-remove').click(function() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        scoreBoard.child(FB.getAuthResponse().userID).remove();
      }
    });
  });

  scoreBoard.on('child_added', function(snapshot) {
    var data = snapshot.val();
    var entry = $('.scoreboard-entry.template').clone();
    entry.removeClass('template');
    entry.attr('data-fbid', snapshot.name());
    entry.find('img')[0].src = data.pic;
    entry.find('.scoreboard-entry-text-name').text(data.name);
    entry.find('.scoreboard-entry-text-location').text(data.location);
    entry.find('.scoreboard-entry-text-score').text(data.score);
    $('#hall-of-fame').append(entry);
    entry.css('opacity', 0);
    entry.animate({ opacity: 1 }, 2500);
  });

  scoreBoard.on('child_removed', function(snapshot) {
    $('.scoreboard-entry[data-fbid="' + snapshot.name() + '"]').remove();
  });

});