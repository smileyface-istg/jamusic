const trackHandler = require('./api/track.js');
const oembedHandler = require('./api/oembed.js');

async function test() {
    console.log("--- STARTING RIGOROUS VERIFICATION ---\n");

    const mockReq = {
        query: { id: '1', v: 'test_123' },
        headers: { host: 'localhost:3000', 'x-forwarded-proto': 'http' }
    };

    let trackHtml = '';
    const mockResTrack = {
        setHeader: (k, v) => {},
        status: (code) => ({
            send: (html) => { trackHtml = html; }
        })
    };

    // 1. Test Track Metadata
    console.log("Testing api/track.js...");
    await trackHandler(mockReq, mockResTrack);
    
    const criticalTags = [
        'type="application/json+oembed"',
        'property="og:type" content="music.song"',
        'property="og:video"',
        'property="og:video:type" content="text/html"',
        'property="og:image"',
        'property="og:audio"',
        'name="twitter:card" content="player"'
    ];

    criticalTags.forEach(tag => {
        if (trackHtml.includes(tag)) {
            console.log(`[PASS] Found tag: ${tag}`);
        } else {
            console.error(`[FAIL] Missing critical tag: ${tag}`);
        }
    });

    // 2. Test OEmbed Response
    console.log("\nTesting api/oembed.js...");
    let oembedJson = {};
    const mockResOembed = {
        status: (code) => ({
            json: (json) => { oembedJson = json; }
        })
    };

    await oembedHandler(mockReq, mockResOembed);

    if (oembedJson.type === 'video' && oembedJson.html.includes('<iframe')) {
        console.log("[PASS] OEmbed returns valid interactive iframe type");
    } else {
        console.error("[FAIL] OEmbed response is invalid for rich interactive cards");
        console.log("Received:", JSON.stringify(oembedJson, null, 2));
    }

    if (oembedJson.provider_name === 'Spotify') {
        console.log("[PASS] Provider name spoofed to Spotify");
    }

    console.log("\n--- VERIFICATION COMPLETE ---");
}

test().catch(console.error);
