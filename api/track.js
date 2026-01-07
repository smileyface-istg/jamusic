
const tracks = require('./tracks.js');

module.exports = async (req, res) => {
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
    const oembedUrl = `${baseUrl}/api/oembed?id=${track.id}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${track.title} - JaMusic v2</title>
    
    <!-- OEmbed Discovery -->
    <link rel="alternate" type="application/json+oembed" href="${oembedUrl}" title="${track.title} on JaMusic v2">

    <!-- Primary Meta Tags -->
    <meta name="title" content="${track.title}">
    <meta name="description" content="${track.artist} • JaMusic v2">
    <meta name="theme-color" content="#0d4f5b">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="music.song">
    <meta property="og:url" content="${baseUrl}/track/${track.id}">
    <meta property="og:title" content="${track.title}">
    <meta property="og:description" content="${track.artist}">
    <meta property="og:image" content="${track.img}">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:site_name" content="JaMusic v2">

    <!-- Video / Player (The Playable Part) -->
    <meta property="og:video" content="${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}">
    <meta property="og:video:secure_url" content="${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}">
    <meta property="og:video:type" content="text/html">
    <meta property="og:video:width" content="500">
    <meta property="og:video:height" content="150">

    <!-- Twitter -->
    <meta name="twitter:card" content="player">
    <meta name="twitter:site" content="@JaMusic">
    <meta name="twitter:title" content="${track.title}">
    <meta name="twitter:description" content="${track.artist}">
    <meta name="twitter:image" content="${track.img}">
    <meta name="twitter:player" content="${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}">
    <meta name="twitter:player:width" content="500">
    <meta name="twitter:player:height" content="150">

    <script>
        window.location.href = "/#track/${track.id}";
    </script>
</head>
<body style="background: #0d4f5b; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
    <div style="text-align: center;">
        <img src="${track.img}" style="width: 200px; height: 200px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); margin-bottom: 20px;">
        <h1>${track.title}</h1>
        <p>${track.artist}</p>
        <p>Redirecting to JaMusic v2...</p>
    </div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};
