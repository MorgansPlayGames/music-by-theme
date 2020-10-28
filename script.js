//jshint esversion: 6 
//jshint esversion: 8

$(document).ready(function () {
    var searchText;
    //click search button set the searchBox as the value
    //prevent default prevents page from auto refreshing 
    event.preventDefault();
    //take user input from index.html line 73
    searchText = $("#searchBox").val();
    //method call 
    searchTag();
});
//get top tracks by tag
function searchTag() {
    var key = '4042e92bded8b7f879e7f753d9f06247';
    var searchType = 'tag.getTopTracks';

    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=' + searchType + '&tag=' + searchText + '&api_key=' + key + '&format=json';
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (songTag) {
            populateList(songTag.tracks.track);
        });
}
//populate the populateMeHere div with top tracks
function populateList(songTag) {
    console.log(songTag);
    $('#populateListHere').empty();

    for (var i = 0; i < songTag.length; i++) {
        //create a div for each song
        //put in name, artist, and link to LastFM
        songEl = $("<div>");
        songName = songTag[i].name;
        songArtist = songTag[i].artist.name;
        numberEl = i + 1;
        nameEl = $('<p>').text(numberEl + ' Song: ' + songName);
        artistEl = $('<p>').text('Artist: ' + songArtist);
        songURL = songTag[i].url;
        songURLEl = $('<a>link</a>').attr('href', songURL).attr('target', '_blank');
        songEl.append(nameEl);
        songEl.append(artistEl);
        songEl.append(songURLEl);
        $('#populateListHere').append(songEl);
    }
}

const quoteHtml = document.querySelector('#Kanyequote');
const kanyeBtn = document.querySelector('#kanyeRestbtn');

//function to append quote to DOM
function appendQuote(object) {
    quoteHtml.innerHTML = ''; //
    //create h4 tags so it implements 
    const quote = document.createElement('h4');
    const span = document.createElement('span');
    span.textContent = object.quote;
    quote.appendChild(span);
    return quoteHtml.appendChild(quote);
}
//function to get quote
function kanyeRest() {
    loadKanyeQuote(true);
    //async function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    return new Promise(async function (resolve, reject) {
        //try catch 
        try {
            //use Fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            const request = await fetch('https://api.kanye.rest/');
            const response = await request.json();
            //isLoading(false);
            resolve(appendQuote(response));
        } catch (error) {
            reject(appendError(error));
            console.log(error);
        }
    });

}

kanyeBtn.addEventListener("click", function () {
    console.log("Kanye clicked me");
    kanyeRest();
});

function loadKanyeQuote(yes) {
    if (yes) {
        return quoteHtml.textContent == 'slow your roll, I am loading';
    } else {
        return quoteHtml.innerHTML == '';
    }
}