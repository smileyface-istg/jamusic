
const { tracks } = require('./tracks.js');

export default async function handler(req, res) {
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    const baseUrl = `https://${req.headers.host}`;
    const oembedUrl = `${baseUrl}/api/oembed?id=${track.id}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${track.title} - JaMusic v2</title>
    
    <!-- OEmbed Discovery -->
    <link rel="alternate" type="application/json+oembed" href="${oembedUrl}" title="${track.title} on JaMusic v2">

    <!-- Essential Meta Tags -->
    <meta property="og:site_name" content="JaMusic v2">
    <meta property="og:title" content="${track.title}">
    <meta property="og:description" content="${track.artist}">
    <meta property="og:image" content="${track.img}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:type" content="video.other">
    <meta property="og:url" content="${baseUrl}/track/${track.id}">
    
    <!-- Video / Player Tags -->
    <meta property="og:video" content="${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}">
    <meta property="og:video:secure_url" content="${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}">
    <meta property="og:video:type" content="text/html">
    <meta property="og:video:width" content="500">
    <meta property="og:video:height" content="150">

    <!-- Twitter Player -->
    <meta name="twitter:card" content="player">
    <meta name="twitter:player" content="${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}">
    <meta name="twitter:player:width" content="500">
    <meta name="twitter:player:height" content="150">
    <meta name="twitter:image" content="${track.img}">

    <meta name="theme-color" content="#0d4f5b">

    <script>
        window.location.href = "/#track/${track.id}";
    </script>
</head>
<body style="background: #0d4f5b; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh;">
    <p>Redirecting to JaMusic v2...</p>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
