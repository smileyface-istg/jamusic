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
    const { id, v } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
    
    const oembedUrl = `${baseUrl}/api/oembed?id=${track.id}${v ? `&v=${v}` : ''}`;
    const embedUrl = `${baseUrl}/embed/${track.id}${v ? `?v=${v}` : ''}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${track.title} - JaMusic v2</title>
    <link rel="alternate" type="application/json+oembed" href="${oembedUrl}">

    <meta name="theme-color" content="#0d4f5b">
    <meta property="og:site_name" content="JaMusic v2">
    <meta property="og:title" content="${track.title}">
    <meta property="og:description" content="Artist: ${track.artist} • Play now on JaMusic">
    <meta property="og:image" content="${track.img}">
    
    <!-- Large Card Triggers -->
    <meta property="og:type" content="video.other">
    <meta property="og:video" content="${embedUrl}">
    <meta property="og:video:secure_url" content="${embedUrl}">
    <meta property="og:video:type" content="text/html">
    <meta property="og:video:width" content="500">
    <meta property="og:video:height" content="150">

    <meta name="twitter:card" content="player">
    <meta name="twitter:player" content="${embedUrl}">
    <meta name="twitter:player:width" content="500">
    <meta name="twitter:player:height" content="150">
    <meta name="twitter:image" content="${track.img}">

    <script>window.location.href = "/#track/${track.id}";</script>
</head>
<body style="background:#0d4f5b;color:white;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:sans-serif;">
    <div style="text-align:center;">
        <img src="${track.img}" style="width:200px;height:200px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.5);">
        <h1>${track.title}</h1>
        <p>${track.artist}</p>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};