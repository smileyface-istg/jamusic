const tracks = require('./tracks.js');

module.exports = async (req, res) => {
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];

    const html = `
<!DOCTYPE html>
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
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        .track-artist {
            font-size: 18px;
            color: #a7c8cd;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 12px;
            font-weight: 500;
        }
        .preview-badge {
            background: #000000;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 4px;
            text-transform: uppercase;
            width: fit-content;
            letter-spacing: 0.05em;
        }
        .controls-container {
            display: flex;
            align-items: center;
            gap: 32px;
            margin-left: 40px;
        }
        .play-btn {
            width: 72px;
            height: 72px;
            background: #ffffff;
            color: #0d4f5b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
            box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .play-btn:hover { transform: scale(1.06); }
        .play-btn i { font-size: 32px; margin-left: 6px; }
        .play-btn.playing i { margin-left: 0; }
        
        .spotify-logo {
            position: absolute;
            top: 16px;
            right: 20px;
            color: #ffffff;
            font-size: 22px;
            opacity: 0.8;
        }
        .progress-bar-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255,255,255,0.1);
            cursor: pointer;
        }
        .progress-bar {
            height: 100%;
            background: #ffffff;
            width: 0%;
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
            } else {
                audio.play().catch(console.error);
                playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
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
            progress.style.width = '0%';
        });
    </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};