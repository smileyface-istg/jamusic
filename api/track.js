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
        title: 'BIRDS OF A FEATHER', 
        artist: 'Billie Eilish', 
        img: 'https://images.genius.com/66847c945417834483754d909d738023.1000x1000x1.jpg'
    },
    { 
        id: '4', 
        title: 'Espresso', 
        artist: 'Sabrina Carpenter', 
        img: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Sabrina_Carpenter_-_Espresso.png'
    },
    { 
        id: '5', 
        title: 'Stereo Hearts', 
        artist: 'Gym Class Heroes', 
        img: 'https://i.scdn.co/image/ab67616d0000b273706dcf46953a040b8ed4b333'
    },
    { 
        id: '6', 
        title: 'Not Like Us', 
        artist: 'Kendrick Lamar', 
        img: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Not_Like_Us.png'
    },
    { 
        id: '7', 
        title: 'Million Dollar Baby', 
        artist: 'Tommy Richman', 
        img: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Tommy_Richman_-_Million_Dollar_Baby.png'
    },
    { 
        id: '8', 
        title: 'A Bar Song (Tipsy)', 
        artist: 'Shaboozey', 
        img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Shaboozey_-_A_Bar_Song_%28Tipsy%29.png'
    },
    { 
        id: '9', 
        title: 'Good Luck, Babe!', 
        artist: 'Chappell Roan', 
        img: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Chappell_Roan_-_Good_Luck%2C_Babe%21.png'
    },
    { 
        id: '10', 
        title: 'FTW', 
        artist: 'Lets Be Friends', 
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
