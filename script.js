document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM loaded");
  var searchButton = document.getElementById('searchButton')
  var removeButton = document.getElementById('removeButton')
  var giphyContainer = document.getElementsByClassName('giphyContainer')[0];
  var giphySearchBar = document.getElementById('giphySearch')

  function parseSearchSendRequest() {
    var giphySearch = document.getElementById('giphySearch').value
    var giphyKey = "DF7ZhMxrYCRQdPqmESdgwwwZLuXiLJTu"
    var giphyxhr = "http://api.giphy.com/v1/gifs/search?q=" + giphySearch + "&api_key=" + giphyKey + "&limit=1";

    var newRequest = new XMLHttpRequest();
    newRequest.onreadystatechange = function () {
      if (newRequest.readyState === 4 && newRequest.status === 200) {
        var returnedGiphy = JSON.parse(newRequest.responseText)

        if (returnedGiphy) {
          var newImg = document.createElement("IMG");
          newImg.src = returnedGiphy.data[0].images.downsized_medium.url;
          newImg.height = returnedGiphy.data[0].images.downsized_medium.height;
          newImg.width = returnedGiphy.data[0].images.downsized_medium.width;
          
          giphyContainer.appendChild(newImg)
        }
      }
    }

    newRequest.open("GET", giphyxhr);
    newRequest.send();
  }

  function removeAllGiphys() {
    while(giphyContainer.hasChildNodes()) {
      giphyContainer.removeChild(giphyContainer.lastChild)
    }
  }

  searchButton.addEventListener('click', parseSearchSendRequest)
  removeButton.addEventListener('click', removeAllGiphys)
  giphySearchBar.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      parseSearchSendRequest()
    }
  })
})