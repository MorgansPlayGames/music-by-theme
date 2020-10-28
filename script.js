$(document).ready(function () {
    var searchText;
    var searchText2;
    var searchType;
    //click search button set the searchBox as the value
<<<<<<< HEAD
    $("#searchSongsBtn").on('click', function (event) {
        //prevent default prevents page from auto refreshing 
           event.preventDefault();
           //take user input from index.html line 73
           searchType = 'tag.getTopTracks';
           populateSearchSong();  
    });
    $("#searchArtistBtn").on('click', function (event) {
        //prevent default prevents page from auto refreshing 
           event.preventDefault();
           //take user input from index.html line 73
           searchType = 'tag.getTopArtists';
           populateSearchArtist();  
    });
    $("#searchAlbumBtn").on('click', function (event) {
        //prevent default prevents page from auto refreshing 
        event.preventDefault();
           //take user input from index.html line 73
        searchType = 'tag.getTopAlbums';
        populateSearchAlbum();  
    });
    $("#getSongInfoBtn").on('click', function (event) {
        //prevent default prevents page from auto refreshing 
           event.preventDefault();
           //take user input from index.html line 73
           searchType = 'track.getInfo';
           populateSongInfo();  
       });
    $("#searchBtn").on('click', function(event){
        event.preventDefault();
        searchFM();
    });
    //get top tracks by tag

    function populateSearchSong(){
        emptyModel();
        $("#modalLabel").text("Songs by Mood"); 
        $('#inputLabel').text('Put in a Mood')
        $('#toggleBox').hide();
        
    }
    function populateSearchArtist(){
        emptyModel();
        $("#modalLabel").text("Artists by Mood"); 
        $('#inputLabel').text('Put in a Mood')
        $('#toggleBox').hide();
        
    }
    function populateSearchAlbum(){
        emptyModel();
        $("#modalLabel").text("Albums by Mood"); 
        $('#inputLabel').text('Put in a Mood')
        $('#toggleBox').hide();
        
    }
    function populateSongInfo(){
        emptyModel();
        $('#toggleBox').attr('style', "display:block");
        $("#modalLabel").text("Get song info");
        $('#inputLabel').text('Put in a song')
        
    }
    //Empties the Model so things can be populated
    function emptyModel(){
        $('#populateListHere').empty();
    }
    
    function searchFM() {
        var key = '4042e92bded8b7f879e7f753d9f06247';
        var queryURL;
        var searchText = $("#searchBox").val();
        var searchText2 = $("#searchBox2").val();
        if(searchType==="track.getInfo"){
            queryURL = 'https://ws.audioscrobbler.com/2.0/?method=' + searchType + '&artist=' + searchText2 + '&track='+ searchText + '&api_key=' + key + '&format=json';
        }else{
            queryURL = 'https://ws.audioscrobbler.com/2.0/?method=' + searchType + '&tag=' + searchText + '&api_key=' + key + '&format=json';
        }
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (songInfo) {
                if(searchType === 'tag.getTopTracks'){
                    populateSongList(songInfo.tracks.track)
                }
                if(searchType === 'tag.getTopArtists'){
                    populateArtistList(songInfo.topartists.artist);
                }
                if(searchType === 'tag.getTopAlbums'){
                    populateAlbumList(songInfo.albums.album);
                }
                if(searchType === 'track.getInfo'){
                    console.log(songInfo.track);
                }

            });
    }
    //populate the populateMeHere div with top tracks
    function populateSongList(songTag) {
        $('#populateListHere').empty();

        for (var i = 0; i < songTag.length; i++) {
            //create a div for each song
            //put in name, artist, and link to LastFM
            var songEl = $("<div>");
            var songName = songTag[i].name;
            var songArtist = songTag[i].artist.name;
            var numberEl = i + 1;
            var nameEl = $('<p>').text(numberEl + ' Song: ' + songName);
            var artistEl = $('<p>').text('Artist: ' + songArtist);
            var songURL = songTag[i].url;
            var songURLEl = $('<a>link</a>').attr('href', songURL).attr('target', '_blank' );
            songEl.append(nameEl);
            songEl.append(artistEl);
            songEl.append(songURLEl);
            $('#populateListHere').append(songEl);
        }
    }

    function populateArtistList(songTag) {
        for (var i = 0; i < songTag.length; i++) {
            var artistEl = $("<div>");
            var artistName = songTag[i].name;
            var numberEl = i + 1;
            var artistNameEl = $('<p>').text(numberEl + ' Artist: ' + artistName);
            var artistURL = songTag[i].url;
            var artistURLEl = $('<a>link</a>').attr('href', artistURL).attr('target', '_blank' );
            artistEl.append(artistNameEl);
            artistEl.append(artistURLEl);
            $('#populateListHere').append(artistEl);
        }
    }

    function populateAlbumList(songTag) {
        for (var i = 0; i < songTag.length; i++) {
            albumEl = $("<div>");
            var numberEl = i + 1;
            var albumName = songTag[i].name;
            var artistName = songTag[i].artist.name;
            var albumNameEl = $('<p>').text(numberEl + ' Album: ' + albumName);
            var artistNameEl = $('<p>').text('Artist: ' + artistName);
            var albumURL = songTag[i].url;
            var albumURLEl = $('<a>link</a>').attr('href', albumURL).attr('target', '_blank' );
            albumEl.append(albumNameEl);
            albumEl.append(artistNameEl);
            albumEl.append(albumURLEl);
            $('#populateListHere').append(albumEl);
        }
    }

    function populateSongInfo(songTag) {

    }
});
=======
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
const screen = document.querySelector('#screen');

function appendQuote(object) {
    quoteHtml.innerHTML = ''; // 
    const quote = document.createElement('h1');
    const span = document.createElement('span');
    span.classList.add('bg-black', 'fc-white', 'padding-0250', 'lh-title');
    span.textContent = object.quote;
    quote.appendChild(span);
    return quoteHtml.appendChild(quote);
}
//function to get quote
function kanyeRest() {
    isLoading(true);
    //async function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    return new Promise(async (resolve, reject) => {
        //try catch 
        try {
            const request = await fetch('https://api.kanye.rest/');
            const response = await request.json();
            isLoading(false);
            resolve(appendQuote(response));
        } catch (error) {
            reject(appendError(error));
        }
    });

}
screen.addEventListener("click", async function () {
return await kanyeRest();
});




});
>>>>>>> main
