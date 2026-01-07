const tracks = [
    { id: '1', title: 'Never Gonna Give You Up', artist: 'Rick Astley', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCuAC8hFa8nHMv1kf61oWZXQVLXLDhEuW1g&s', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Video)%20(4K%20Remaster).mp3' },
    { id: '2', title: 'End of Beginning', artist: 'Djo', img: 'https://images.genius.com/00875ec415993c9cf0e554666bf16b45.1000x1000x1.png', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Djo%20-%20End%20Of%20Beginning%20(Official%20Audio).mp3' },
    { id: '3', title: 'Heat Waves', artist: 'Glass Animals', img: 'https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Glass%20Animals%20-%20Heat%20Waves%20(Lyrics).mp3' },
    { id: '4', title: 'Stereo Hearts', artist: 'Gym Class Heroes', img: 'https://i.scdn.co/image/ab67616d0000b273706dcf46953a040b8ed4b333', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Gym%20Class%20Heroes%20-%20Stereo%20Hearts%20(Lyrics)%20%20Heart%20Stereo.mp3' },
    { id: '5', title: 'Get Lucky', artist: 'Daft Punk', img: 'https://static.wikia.nocookie.net/daftpunk/images/7/71/Get_Lucky.jpg', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Daft%20Punk%20-%20Get%20Lucky%20(Lyrics)%20ft.%20Pharrell%20Williams,%20Nile%20Rodgers.mp3' },
    { id: '6', title: 'Rap God', artist: 'Eminem', img: 'https://i.scdn.co/image/ab67616d0000b273643e6ecebab400d52574e4b2', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Eminem%20-%20Rap%20God%20(Explicit).mp3' },
    { id: '7', title: 'A LITTLE THEORIZING', artist: 'Stupendium', img: 'https://i.scdn.co/image/ab67616d0000b273bfebcc991d99e277f3260221', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/A%20Little%20Theorizing%20Lyrics.mp3' },
    { id: '8', title: 'Corrupted', artist: 'Danimal Cannon', img: 'https://i.scdn.co/image/ab67616d0000b27339be440fe5b4ef67f9de6cc7', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Danimal%20Cannon%20&%20Zef%20-%20Corrupted.mp3' },
    { id: '9', title: 'River Flows In You', artist: 'DJ Herjuana', img: 'https://i.scdn.co/image/ab67616d0000b27371cde6e77fc2d217cbc5f567', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/SpotiDownloader.com%20-%20River%20Flows%20in%20You%20-%20DJ%20HERJUANA.mp3' },
    { id: '10', title: 'FTW', artist: 'Lets be Friends', img: 'https://upload.wikimedia.org/wikipedia/en/5/53/FTW_Lets_Be_Friends_Orignal_Cover.jpeg', src: 'https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/%5BElectro%5D%20-%20Lets%20Be%20Friends%20-%20FTW%20%5BMonstercat%20Release%5D.mp3' }
];

module.exports = async (req, res) => {
    try {
        const { id } = req.query;
        const track = tracks.find(t => t.id === id) || tracks[0];

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JaMusic Player</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body, html {
            margin: 0; padding: 0; width: 500px; height: 150px; overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: #0d4f5b; color: white;
        }
        .player-container {
            display: flex; align-items: center; padding: 16px; gap: 16px;
            width: 500px; height: 150px; box-sizing: border-box; position: relative;
        }
        .album-art {
            width: 118px; height: 118px; border-radius: 4px; flex-shrink: 0;
            background-size: cover; background-position: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .info { flex-grow: 1; min-width: 0; }
        .track-title { font-size: 18px; font-weight: 700; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .artist-name { font-size: 14px; opacity: 0.8; margin-bottom: 12px; }
        .controls { display: flex; align-items: center; gap: 16px; }
        .play-btn {
            width: 42px; height: 42px; background: white; color: black; border-radius: 50%;
            display: flex; align-items: center; justify-content: center; cursor: pointer;
            border: none; transition: transform 0.1s;
        }
        .play-btn:hover { transform: scale(1.05); }
        .play-btn i { font-size: 18px; margin-left: 2px; }
        .progress-container { flex-grow: 1; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; position: relative; cursor: pointer; }
        .progress-bar { height: 100%; background: white; border-radius: 2px; width: 0%; }
        .spotify-badge { position: absolute; top: 12px; right: 12px; opacity: 0.8; font-size: 20px; }
        #error-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); display: none; flex-direction: column;
            justify-content: center; align-items: center; padding: 10px; text-align: center;
            z-index: 100; color: #ff5555; font-size: 12px;
        }
    </style>
</head>
<body>
    <div id="error-overlay">
        <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 8px;"></i>
        <div id="error-msg"></div>
    </div>
    <div class="player-container">
        <div class="album-art" style="background-image: url('${track.img}')"></div>
        <div class="info">
            <div class="track-title">${track.title}</div>
            <div class="artist-name">${track.artist}</div>
            <div class="controls">
                <button class="play-btn" id="playBtn"><i class="fas fa-play"></i></button>
                <div class="progress-container" id="progressContainer">
                    <div class="progress-bar" id="progressBar"></div>
                </div>
            </div>
        </div>
        <i class="fab fa-spotify spotify-badge"></i>
    </div>
    <audio id="audio" src="${track.src}"></audio>

    <script>
        const audio = document.getElementById('audio');
        const playBtn = document.getElementById('playBtn');
        const progressBar = document.getElementById('progressBar');
        const progressContainer = document.getElementById('progressContainer');
        const errorOverlay = document.getElementById('error-overlay');
        const errorMsg = document.getElementById('error-msg');

        function showError(msg, err) {
            console.error(msg, err);
            errorOverlay.style.display = 'flex';
            errorMsg.innerText = msg + (err ? ': ' + err.message : '');
        }

        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                }).catch(err => showError('Playback failed. Check your browser permissions or audio source.', err));
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';
        });

        audio.addEventListener('error', (e) => showError('Audio source error. The file might be missing or inaccessible.', audio.error));
        
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        });

        console.log('Player initialized for track: ${track.title}');
    </script>
</body>
</html>`;

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    } catch (error) {
        console.error("EMBED_API_ERROR:", error);
        res.status(500).send(`<h1>Player Error</h1><pre>${error.stack}</pre>`);
    }
};
