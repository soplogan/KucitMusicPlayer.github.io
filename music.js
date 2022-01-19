    const music = document.querySelector('audio');
    const play = document.getElementById("play");
    const img = document.querySelector('img');
    const artist = document.getElementById("artist");
    const title = document.getElementById("title");
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const btn = document.getElementById('boton');

    let progress = document.getElementById("progress");
    let total_duration = document.getElementById("duration");
    let current_time = document.getElementById("current_time");
    const progress_div = document.getElementById("progress_div");
    // const bdy = document.querySelector('body');

    const songs = [{
            name: "Grv-1",
            title: "SOMETHING LIKE",
            artist: "ChainSmokers",
        },
        {
            name: "Grv-2",
            title: "let me down",
            artist: "Alec Benjamin",
        },
        {
            name: "Grv-3",
            title: "Kabhi Tumhe",
            artist: "Darshan Raval",
        },
        {
            name: "Grv-4",
            title: "FADED",
            artist: "Alan Walker",
        },
        {
            name: "Grv-5",
            title: "STAY",
            artist: "Justin Bieber",
        },
    ]

    let isPlaying = false;

    // Play Function
    const playMusic = () => {
        isPlaying = true;
        music.play();
        play.classList.replace('fa-play', 'fa-pause');
        img.classList.add("anime");
    };

    // Pause Function
    const pauseMusic = () => {
        isPlaying = false;
        music.pause();
        play.classList.replace('fa-pause', 'fa-play');
        img.classList.remove("anime");
    };

    play.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    })

    // Change MUSIC DATA
    const loadSongs = (songs) => {
        title.textContent = songs.title;
        artist.textContent = songs.artist;
        music.src = "music/" + songs.name + ".mp3";
        img.src = "image/" + songs.name + ".png";
    };

    songIndex = 0;
    // loadSongs(songs[3]);

    const nextSong = () => {
        songIndex = (songIndex + 1) % songs.length;
        loadSongs(songs[songIndex]);
        playMusic();
    }

    const prevSong = () => {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSongs(songs[songIndex]);
        playMusic();
    }

    // progessJSWork
    music.addEventListener('timeupdate', (event) => {
        const {
            currentTime,
            duration
        } = event.srcElement;
        let progress_time = (currentTime / duration) * 100;
        progress.style.width = `${progress_time}%`;

        // music duration update 
        let min_duration = Math.floor(duration / 60);
        let sec_duration = Math.floor(duration % 60);
        let tot_duration = `${min_duration}:${sec_duration}`;
        if (duration) {
            total_duration.textContent = tot_duration;
        }

        // current duration
        let min_currentTime = Math.floor(currentTime / 60);
        let sec_currentTime = Math.floor(currentTime % 60);
        if (sec_currentTime < 10) {
            sec_currentTime = `0${sec_currentTime}`;
        }
        let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
        current_time.textContent = `${tot_currentTime}`;

    });

    // Progress On Click 
    progress_div.addEventListener('click', (event) => {
        const {
            duration
        } = music;
        let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
        music.currentTime = move_progress;
    })

    music.addEventListener('ended', nextSong);

    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);


    let isDark = false
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if(isDark)
        {
            btn.innerHTML = 'Dark MODE'
            isDark = false
        }
        else
        {
            btn.innerHTML = 'Light Mode'
            isDark = true
        }
    })