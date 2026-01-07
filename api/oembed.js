
export default async function handler(req, res) {
    const { id, title, artist, img, src } = req.query;
    const host = req.headers.host;
    const baseUrl = `https://${host}`;

    const embedUrl = `${baseUrl}/embed/${id}?src=${encodeURIComponent(src)}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}&img=${encodeURIComponent(img)}`;

    const oembedResponse = {
        type: "rich",
        version: "1.0",
        provider_name: "JaMusic v2",
        provider_url: baseUrl,
        title: title || "Music Track",
        author_name: artist || "Unknown Artist",
        thumbnail_url: img || "",
        thumbnail_width: 512,
        thumbnail_height: 512,
        html: `<iframe src="${embedUrl}" width="500" height="150" frameborder="0" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`,
        width: 500,
        height: 150
    };

    res.status(200).json(oembedResponse);
}
