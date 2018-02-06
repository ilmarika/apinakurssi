// HTTP GET

var URL;
function getName() {
  URL = 'http://www.omdbapi.com/?apikey=8fd06dfe&t='+ document.getElementById("nimi").value +'';
}

function fetchRequest() {
    fetch(URL)
      .then( (result) => {
        return result.json();
      })
      .then( (jsonresult) => {
        //console.log('JSON result: '+JSON.stringify(jsonresult));
        var movie = document.getElementById('movie');
        movie.innerHTML = JSON.stringify(jsonresult);
        var poster = document.getElementById('poster');
        poster.innerHTML = "<img src="+ jsonresult.Poster +"></img>";
    });
}
elem = fetchRequest();