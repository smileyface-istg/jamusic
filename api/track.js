const tracks = [
    { 
        id: '1', 
        title: 'Never Gonna Give You Up', 
        artist: 'Rick Astley', 
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPCuAC8hFa8nHMv1kf61oWZXQVLXLDhEuW1g&s'
    },
    { 
        id: '2', 
        title: 'End of Beginning', 
        artist: 'Djo', 
        img: 'https://images.genius.com/00875ec415993c9cf0e554666bf16b45.1000x1000x1.png'
    },
    { 
        id: '3', 
        title: 'Heat Waves', 
        artist: 'Glass Animals', 
        img: 'https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea'
    },
    { 
        id: '4', 
        title: 'Stereo Hearts', 
        artist: 'Gym Class Heroes', 
        img: 'https://i.scdn.co/image/ab67616d0000b273706dcf46953a040b8ed4b333'
    },
    { 
        id: '5', 
        title: 'Get Lucky', 
        artist: 'Daft Punk', 
        img: 'https://images-ext-1.discordapp.net/external/xR3pl2SlUtADo9357RJ1lvKlsgnie7faJtruZyDKNu8/%3Fcb%3D20140421225330%26path-prefix%3Des/https/static.wikia.nocookie.net/daftpunk/images/7/71/Get_Lucky.jpg/revision/latest?format=png'
    },
    { 
        id: '6', 
        title: 'Rap God', 
        artist: 'Eminem', 
        img: 'https://images-ext-1.discordapp.net/external/5NjINKSPrPYMPecFhmRVSyb_aMQAQTUEB_7EmfB9EME/https/i.scdn.co/image/ab67616d0000b273643e6ecebab400d52574e4b2?format=webp'
    },
    { 
        id: '7', 
        title: 'A LITTLE THEORIZING', 
        artist: 'Stupendium', 
        img: 'https://i.scdn.co/image/ab67616d0000b273bfebcc991d99e277f3260221'
    },
    { 
        id: '8', 
        title: 'Corrupted', 
        artist: 'Danimal Cannon', 
        img: 'https://i.scdn.co/image/ab67616d0000b27339be440fe5b4ef67f9de6cc7'
    },
    { 
        id: '9', 
        title: 'River Flows In You', 
        artist: 'DJ Herjuana', 
        img: 'https://i.scdn.co/image/ab67616d0000b27371cde6e77fc2d217cbc5f567'
    },
    { 
        id: '10', 
        title: 'FTW', 
        artist: 'Lets be Friends', 
        img: 'https://upload.wikimedia.org/wikipedia/en/5/53/FTW_Lets_Be_Friends_Orignal_Cover.jpeg'
    }
];

module.exports = (req, res) => {
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${track.title} • ${track.artist} | JaMusic v2</title>
    
    <meta property="og:type" content="music.song">
    <meta property="og:title" content="${track.title}">
    <meta property="og:description" content="${track.artist} • JaMusic v2">
    <meta property="og:image" content="${track.img}">
    <meta property="og:url" content="https://jamusic.vercel.app/track/${track.id}">
    <meta name="theme-color" content="#3b82f6">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${track.title}">
    <meta name="twitter:description" content="${track.artist} • JaMusic v2">
    <meta name="twitter:image" content="${track.img}">

    <script>
        // Redirect to main app with hash
        window.location.href = "/#track/${track.id}";
    </script>
</head>
<body>
    Redirecting to JaMusic v2...
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};
