songList=[];

var Song = function (songname, artist, album) {
    this.ID=Math.random().toString(16).slice(5);
    this.songname=songname;
    this.artist=artist;
    this.album=album;
}

document.addEventListener("DOMContentLoaded", function(event) {
    //Add to Library
    this.getElementById("add").addEventListener("click", function() {
        let songname = document.getElementById("songname").value
        let artist = document.getElementById("artist").value
        let album = document.getElementById("album").value
        if((songname == "") || (artist == "") || (album == "")) {
            alert("Please enter text in all fields");
        } else {
            var newSong = new Song(songname, artist, album);
            songList.push(newSong);
            console.log(songList);
            document.getElementById("added").value = (songname + ' by ' + artist + ' successfully added to Library!');
            document.getElementById("songname").value = "";
            document.getElementById("artist").value = "";
            document.getElementById("album").value = "";
        }

        $.ajax({
            url:"/addSongs",
            type: "POST",
            data: JSON.stringify(newSong),
            contentType:"application/json; char=utf-8",
            success: function(result) {
                console.log(result);
            }
        })
    })

    //View Library
    var viewListElements = document.getElementsByClassName("viewList");
    for (var i = 0; i < viewListElements.length; i++) {
        viewListElements[i].addEventListener("click", function() {
            document.getElementById("myList").innerHTML = "";
            document.getElementById("added").value = '';
            createList("myList");
        });
    }

    /* $(document).on("pagebeforeshow", "#viewAll", function(event) {
        createList("myList");
    }) */

    //Search Library
    var searchListEvents = document.getElementsByClassName("searchList");
    for (var i = 0; i < searchListEvents.length; i++) {
        searchListEvents[i].addEventListener("click", function() {
            document.getElementById("myList2").innerHTML = "";
            createList("myList2");
        })
    }

    /* $(document).on("pagebeforeshow", "#search", function(event) {
        createList("myList2");
    }) */
})

//create list and details to display
function createList(listToCreate) {
    $.get("/viewAll", function(data, status) {
        songList = data;
    })

    let list = document.getElementById(listToCreate);
    list.innerHTML = "";
    songList.forEach(function(element, i) {
        let li = document.createElement('li');
        li.classList.add('oneSong');
        li.innerHTML = songList[i].songname;
        li.setAttribute('key', element.ID);
        list.appendChild(li);
        console.log('li= ' + li.value);
    })

    let lilist = document.getElementsByClassName("oneSong");
    let newSongList = Array.from(lilist);
    newSongList.forEach(function (element,i) {
        element.addEventListener("click", function() {
            var key = this.getAttribute("key");
            localStorage.setItem("key", key);
            document.location.href = "index.html#details";
            getDetails()
        })
    })

    let deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", function() {
        var key = this.getAttribute("key");
        deleteSong(getArrayPointer(key));
    })
}

//delete song from list
function deleteSong(i) {
    songList.splice(i, 1);
    createList("myList");
    createList("myList2");

    /* $.ajax({
        type:"DELETE",
        url:"/DeleteSong/" + ID,
        success: function(result) {
            alert(result);
        },
        error: function(xhr, textStatus,errorThrown) {
            alert("Server could not delete Song with ID " + ID)
        }
    }); */

    document.location.href = "index.html#viewAll";
    
}

//get array index from song id
function getArrayPointer(key) {
    for (let i = 0; i < songList.length; i++) {
        if (key === songList[i].ID) {
            return i;
        }
    }
}

//Display details page
function getDetails() {
    let key = localStorage.getItem('key');
    let i = getArrayPointer(key);
    var details = document.getElementById("detailsList");
    details.innerHTML = "";
    var detailsName = document.createElement('li');
    detailsName.innerHTML = "Song: " + songList[i].songname;
    var detailsArtist= document.createElement('li');
    detailsArtist.innerHTML = "Artist: " + songList[i].artist;
    var detailsAlbum= document.createElement('li');
    detailsAlbum.innerHTML = "Album: " + songList[i].album;
    details.appendChild(detailsName);
    details.appendChild(detailsArtist);
    details.appendChild(detailsAlbum);
}