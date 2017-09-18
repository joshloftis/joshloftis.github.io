var topics = ["Tyrion Lannister", "Jamie Lannister", "Cersi Lannister", "Jon Snow", "Ned Stark", "Bran Stark", "Sansa Stark", "Arya Stark", "Rickon Stark", "Catelyn Stark", "Petyr Baelish", "Robert Baratheon", "Joffery Baratheon", "Melisandre", "Stannis Baratheon"];
var queryURL = "http://api.giphy.com/v1/gifs/search"; //api_key= dc6zaTOxFJmzC &limit=10";
var api = "dc6zaTOxFJmzC";
var query, still, animate;

function setButtons(){
  $.each(topics, function(i) { $('#buttons').append('<button id="char-btns" class="btn btn-primary">' + topics[i] + '</button>'); });
}
setButtons();

function displayGifs() {
  queryURL += '?' + $.param({'api_key': api, 'q': query, 'limit': 10 });

  $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
    console.log(response);
    $.each(response.data, function(j) {
      var image_content = $('<div class="gifs">');
      var rating_area = $('<p>').text('Rating: ' + response.data[j].rating);
      var gif_area = $('<img class="img-responsive">');
      gif_area.attr({
        'src': response.data[j].images.fixed_height_still.url,
        'data-still': response.data[j].images.fixed_height_still.url,
        'data-animate': response.data[j].images.fixed_height.url,
        'data-state': 'still'
      });
      image_content.append(rating_area);
      image_content.append(gif_area);
      $('#images').prepend(image_content);
    });
  });
}

$('#add-characters').on('click', function(event){
  event.preventDefault(event);
  if ($('#search-bar').val().length > 0) {
  var newButton = $('#search-bar').val();
    $('#buttons').empty();
    topics.push(newButton);
    setButtons();
  }
});

$(document).on('click', 'img', function(){
  var state = $(this).attr('data-state');
  console.log(state);
  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});

$(document).on('click', '#char-btns', function(){
  $('#images').empty();
  query = $(this).html();
  displayGifs();
});
