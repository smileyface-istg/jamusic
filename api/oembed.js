const tracks = require('./tracks.js');

module.exports = async (req, res) => {
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;

    const embedUrl = `${baseUrl}/embed/${track.id}`;

    const oembedResponse = {
        type: "video",
        version: "1.0",
        provider_name: "JaMusic v2",
        provider_url: baseUrl,
        title: track.title,
        author_name: track.artist,
        thumbnail_url: track.img,
        thumbnail_width: 1200,
        thumbnail_height: 630,
        html: `<iframe src="${embedUrl}" width="1200" height="400" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`,
        width: 1200,
        height: 400
    };

    res.status(200).json(oembedResponse);
};