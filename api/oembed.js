
const tracks = require('./tracks.js');

module.exports = async (req, res) => {
    const { id } = req.query;
    const track = tracks.find(t => t.id === id) || tracks[0];
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const baseUrl = `${protocol}://${host}`;

    const embedUrl = `${baseUrl}/embed/${track.id}?src=${encodeURIComponent(track.src)}&title=${encodeURIComponent(track.title)}&artist=${encodeURIComponent(track.artist)}&img=${encodeURIComponent(track.img)}`;

    const oembedResponse = {
        type: "rich",
        version: "1.0",
        provider_name: "JaMusic v2",
        provider_url: baseUrl,
        title: track.title,
        author_name: track.artist,
        thumbnail_url: track.img,
        thumbnail_width: 512,
        thumbnail_height: 512,
        html: `<iframe src="${embedUrl}" width="500" height="150" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`,
        width: 500,
        height: 150
    };

    res.status(200).json(oembedResponse);
};
