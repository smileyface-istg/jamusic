const tracks = require('./tracks.js');

module.exports = async (req, res) => {
    const { id, v } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Pass the version tag to oembed to break its cache too
    const oembedUrl = `${baseUrl}/api/oembed?id=${track.id}${v ? `&v=${v}` : ''}`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${track.title} - JaMusic v2</title>
    
    <link rel="alternate" type="application/json+oembed" href="${oembedUrl}" title="${track.title} on JaMusic v2">

    <!-- Meta Tags to force Large Playable Card -->
    <meta name="theme-color" content="#0d4f5b">
    <meta property="og:site_name" content="JaMusic v2">
    <meta property="og:title" content="${track.title}">
    <meta property="og:description" content="${track.artist}">
    <meta property="og:image" content="${track.img}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <!-- This "video.movie" type is the secret for the large layout -->
    <meta property="og:type" content="video.movie">
    <meta property="og:video" content="${baseUrl}/embed/${track.id}">
    <meta property="og:video:secure_url" content="${baseUrl}/embed/${track.id}">
    <meta property="og:video:type" content="text/html">
    <meta property="og:video:width" content="1200">
    <meta property="og:video:height" content="400">

    <!-- Twitter Player -->
    <meta name="twitter:card" content="player">
    <meta name="twitter:title" content="${track.title}">
    <meta name="twitter:description" content="${track.artist}">
    <meta name="twitter:image" content="${track.img}">
    <meta name="twitter:player" content="${baseUrl}/embed/${track.id}">
    <meta name="twitter:player:width" content="1200">
    <meta name="twitter:player:height" content="400">

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
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
};