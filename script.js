$( document ).ready(function() {
    var searchText;
    //click search button set the searchBox as the value
    $("#searchBtn").on('click', function(event){
        event.preventDefault();
        searchText = $("#searchBox").val();
        searchTag()
    })
    //get top tracks by tag
    function searchTag(){
        var key = '4042e92bded8b7f879e7f753d9f06247';
        var searchType = 'tag.getTopTracks'
        
        var queryURL = 'http://ws.audioscrobbler.com/2.0/?method='+searchType+'&tag='+searchText+'&api_key='+key+'&format=json';
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(songTag){
                populateList(songTag.tracks.track);
            }); 
    //populate the populateMeHere div with top tracks
    }
    function populateList(songTag){
        console.log(songTag)
        $('#populateListHere').empty();

        for(var i = 0; i<songTag.length; i++){
            //console.log(songTag[i]);
            songEl = $("<div>")
            songName = songTag[i].name;
            songArtist = songTag[i].artist.name;
            numberEl = i+1;
            nameEl = $('<p>').text(numberEl + ' Song: '+songName);
            artistEl = $('<p>').text('Artist: '+songArtist);
            songURL = songTag[i].url;
            songURLEl = $('<a>link</a>').attr('href', songURL);
            songEl.append(nameEl);
            songEl.append(artistEl);
            songEl.append(songURLEl);
            $('#populateListHere').append(songEl);
        }       
    }
});
