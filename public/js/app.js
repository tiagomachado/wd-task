(function() {
  $(document).ready(function() {
    var authorName, closeDiv, countCharact, getImages, getJson, lazyload, tags, titleImg, url,search;
    url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?';
    closeDiv = '</div>';

    countCharact = function(text) {
      if (text.length > 10) {
        return text.substring(0, 10) + '...';
      }
      return text;
    };

    tags = function(tags) {
      var tag;
      if (tags !== '') {
        if (tags.length > 25) {
          tag = tags.substring(0, 25) + '...';
          return '<span>Tags:</span><p class=\'label label-success\'>' + tag + '</p>';
        }
        return '<span>Tags:</span><p class=\'label label-success\'>' + tag + '</p>';
      }
      return '<span class=\'label label-danger\'>No Tags</span>';
    };

    authorName = function(name) {
      var author, regExp;
      regExp = /\(([^)]+)\)/;
      author = regExp.exec(name);
      return countCharact(author[1]);
    };

    titleImg = function(title) {
      if (title === ' ') {
        return 'No Title';
      }
      return countCharact(title);
    };

    lazyload = function() {
      $('img.lazy').lazyload({
        effect: 'fadeIn'
      });
    };

    getImages = function(flickr) {
      $('#images').empty();
      $.each(flickr.items, function(key, items) {
        var markup;
        markup = '<div class=\'col-sm-6 col-md-3\'>' + '<div class=\'thumbnail\'>';
        markup += '<img class=\'lazy\' src=' + items.media.m + ' alt=\'\' data-original=' + items.media.m + '>';
        markup += '<div class=\'caption\'>';
        markup += '<span>' + '<a href=\'' + items.link + '\'>' + titleImg(items.title) + '</a>';
        markup += ' by: <a href=\'https://www.flickr.com/people/' + items.author_id + '\'>' + authorName(items.author) + '</a></span>';
        markup += '<br>' + tags(items.tags);
        markup += closeDiv;
        markup += closeDiv;
        markup += closeDiv;
        $(markup).appendTo('#images');
      });
    };

    getJson = function(tags) {
      $.getJSON(url, {
        format: 'json',
        tags: tags
      }).done(function(flickr) {
          getImages(flickr);
          lazyload();
      });
    }

    search = function(){
      var tags;
      tags = $('#text-tags').val();
      getJson(tags);
  }

  $('#text-tags').keydown(function(event) {
      if (event.keyCode == 13) {
          search();
      }
      });

  $('#btn-tags').click(function() {
      search();
  });

    getJson();


  });

}).call(this);
