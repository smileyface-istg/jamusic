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
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JaMusic v2 Player</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { 
            background: #0d4f5b; 
            color: white; 
            overflow: hidden; 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            display: flex;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .spotify-container {
            background: #0d4f5b;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 40px;
            position: relative;
        }
        .art-container {
            width: 100px;
            height: 100px;
            flex-shrink: 0;
            margin-right: 24px;
            position: relative;
        }
        .art-container img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            object-fit: cover;
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        .info-container {
            flex-grow: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .track-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #ffffff;
            letter-spacing: -0.01em;
        }
        .track-artist {
            font-size: 16px;
            color: #a7c8cd;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 8px;
            font-weight: 500;
        }
        .preview-badge {
            background: rgba(0,0,0,0.3);
            color: #ffffff;
            font-size: 10px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 3px;
            text-transform: uppercase;
            width: fit-content;
            letter-spacing: 0.05em;
        }
        .controls-container {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-left: 20px;
        }
        .play-btn {
            width: 56px;
            height: 56px;
            background: #ffffff;
            color: #0d4f5b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .play-btn:hover { transform: scale(1.06); }
        .play-btn i { font-size: 24px; margin-left: 4px; }
        .play-btn.playing i { margin-left: 0; }
        
        .progress-bar-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255,255,255,0.1);
        }
        .progress-bar {
            height: 100%;
            background: #ffffff;
            width: 0%;
            transition: width 0.1s linear;
        }
        .spotify-logo {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            color: rgba(255,255,255,0.5);
        }
    </style>
</head>
<body>
    <div class="spotify-container">
        <i class="fa-brands fa-spotify spotify-logo"></i>
        <div class="art-container">
            <img src="${track.img}" alt="Art">
        </div>
        <div class="info-container">
            <div class="track-title">${track.title}</div>
            <div class="track-artist">${track.artist}</div>
            <div class="preview-badge">Preview</div>
        </div>
        <div class="controls-container">
            <div id="playBtn" class="play-btn">
                <i class="fa-solid fa-play"></i>
            </div>
        </div>
        <div class="progress-bar-container">
            <div id="progress" class="progress-bar"></div>
        </div>
    </div>
    <audio id="audio" src="${track.src}"></audio>
    <script>
        const audio = document.getElementById('audio');
        const playBtn = document.getElementById('playBtn');
        const progress = document.getElementById('progress');
        let isPlaying = false;
        
        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                playBtn.classList.remove('playing');
            } else {
                audio.play().catch(console.error);
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                playBtn.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
        
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                progress.style.width = (audio.currentTime / audio.duration) * 100 + '%';
            }
        });
        
        audio.addEventListener('ended', () => {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            playBtn.classList.remove('playing');
            progress.style.width = '0%';
        });
    </script>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};