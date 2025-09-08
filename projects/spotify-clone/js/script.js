console.log('Lets write JavaScript');
let currentSong = new Audio();
let songs;
let currFolder;
let currentSongIndex = 0;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function loadAllSongs() {
    try {
        const albumFolders = ['ncs', 'cs', 'Angry_(mood)'];
        let allSongs = [];

        // Get songs from each album folder
        for (const folder of albumFolders) {
            try {
                let a = await fetch(`songs/${folder}/`);
                let response = await a.text();
                let div = document.createElement("div");
                div.innerHTML = response;
                let as = div.getElementsByTagName("a");

                for (let index = 0; index < as.length; index++) {
                    const element = as[index];
                    if (element.href.endsWith(".mp3")) {
                        allSongs.push({
                            name: element.href.split(`/${folder}/`)[1],
                            folder: folder
                        });
                    }
                }
            } catch (error) {
                console.error(`Error loading songs from ${folder}:`, error);
            }
        }

        // Update the library UI with all songs
        let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
        songUL.innerHTML = ""; // Clear existing songs

        for (const song of allSongs) {
            songUL.innerHTML += `<li>
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${song.name.replaceAll("%20", " ")}</div>
                    <div>Song Artist</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`;
        }

        // Add click event listeners to all songs
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e, index) => {
            e.addEventListener("click", element => {
                const song = allSongs[index];
                currFolder = `songs/${song.folder}`;
                playMusic(song.name);
            });
        });

        return allSongs;
    } catch (error) {
        console.error("Error loading all songs:", error);
        return [];
    }
}

async function getSongs(folder) {
    currFolder = folder;
    try {
        let a = await fetch(`${folder}/`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href.split(`/${folder}/`)[1]);
            }
        }

        return songs;
    } catch (error) {
        console.error("Error loading songs:", error);
        return [];
    }
}

const playMusic = (track, pause = false) => {
    if (!track) return;
    try {
        // Get the clean track name without URL encoding
        const cleanTrack = decodeURIComponent(track);
        currentSong.src = `${currFolder}/${cleanTrack}`;

        // Update currentSongIndex
        currentSongIndex = songs.findIndex(song => decodeURIComponent(song) === cleanTrack);
        console.log("Playing song index:", currentSongIndex);

        if (!pause) {
            currentSong.play()
                .then(() => {
                    play.src = "img/pause.svg";
                })
                .catch(error => {
                    console.error("Error playing song:", error);
                });
        }
        document.querySelector(".songinfo").innerHTML = cleanTrack;
        document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
    } catch (error) {
        console.error("Error in playMusic:", error);
    }
}

// Function to play the next song
function playNextSong() {
    if (!songs || songs.length === 0) return;
    console.log("Current song index before next:", currentSongIndex);
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    console.log("Playing next song at index:", currentSongIndex);
    playMusic(songs[currentSongIndex]);
}

// Function to play the previous song
function playPreviousSong() {
    if (!songs || songs.length === 0) return;
    console.log("Current song index before previous:", currentSongIndex);
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    console.log("Playing previous song at index:", currentSongIndex);
    playMusic(songs[currentSongIndex]);
}

async function displayAlbums() {
    console.log("displaying albums");
    try {
        // Clear existing content
        let cardContainer = document.querySelector(".cardContainer");
        cardContainer.innerHTML = "";

        // Define all album folders in the order you want them displayed
        const albumFolders = ['ncs', 'cs', 'Angry_(mood)'];

        for (const folder of albumFolders) {
            try {
                console.log(`Loading album: ${folder}`);
                let a = await fetch(`songs/${folder}/info.json`);
                let response = await a.json();

                cardContainer.innerHTML += `
                    <div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img src="songs/${folder}/cover.jpg" alt="${response.title}">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                    </div>`;
            } catch (error) {
                console.error(`Error loading album ${folder}:`, error);
            }
        }

        // Load the playlist whenever card is clicked
        Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async item => {
                console.log("Fetching Songs");
                const folder = item.currentTarget.dataset.folder;
                if (folder) {
                    songs = await getSongs(`songs/${folder}`);
                    if (songs && songs.length > 0) {
                        currentSongIndex = 0;
                        playMusic(songs[0]);
                    }
                }
            });
        });
    } catch (error) {
        console.error("Error displaying albums:", error);
    }
}

async function main() {
    try {
        // Load all songs in Your Library first
        await loadAllSongs();

        // Display all the albums on the page
        await displayAlbums();

        // Get the list of songs for the first album
        songs = await getSongs("songs/ncs");
        if (songs && songs.length > 0) {
            currentSongIndex = 0;
            playMusic(songs[0], true);
        }

        // Attach an event listener to play, next and previous
        play.addEventListener("click", () => {
            if (currentSong.paused) {
                currentSong.play()
                    .then(() => {
                        play.src = "img/pause.svg";
                    })
                    .catch(error => {
                        console.error("Error playing song:", error);
                    });
            } else {
                currentSong.pause();
                play.src = "img/play.svg";
            }
        });

        // Listen for timeupdate event
        currentSong.addEventListener("timeupdate", () => {
            document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
        });

        // Add an event listener to seekbar
        document.querySelector(".seekbar").addEventListener("click", e => {
            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent + "%";
            currentSong.currentTime = ((currentSong.duration) * percent) / 100;
        });

        // Add an event listener for hamburger
        document.querySelector(".hamburger").addEventListener("click", () => {
            document.querySelector(".left").style.left = "0";
        });

        // Add an event listener for close button
        document.querySelector(".close").addEventListener("click", () => {
            document.querySelector(".left").style.left = "-120%";
        });

        // Add an event listener to previous button
        document.querySelector("#previous").addEventListener("click", () => {
            console.log("Previous button clicked");
            playPreviousSong();
        });

        // Add an event listener to next button
        document.querySelector("#next").addEventListener("click", () => {
            console.log("Next button clicked");
            playNextSong();
        });

        // Add event listener for when a song ends
        currentSong.addEventListener("ended", () => {
            console.log("Song ended, playing next song");
            playNextSong();
        });

        // Add an event to volume
        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
            console.log("Setting volume to", e.target.value, "/ 100");
            currentSong.volume = parseInt(e.target.value) / 100;
            if (currentSong.volume > 0) {
                document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg");
            }
        });

        // Add event listener to mute the track
        document.querySelector(".volume>img").addEventListener("click", e => {
            if (e.target.src.includes("volume.svg")) {
                e.target.src = e.target.src.replace("volume.svg", "mute.svg");
                currentSong.volume = 0;
                document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            } else {
                e.target.src = e.target.src.replace("mute.svg", "volume.svg");
                currentSong.volume = .10;
                document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
            }
        });
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

main();