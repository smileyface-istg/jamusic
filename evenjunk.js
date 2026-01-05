<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>JaMusic v2 | Free of charge!</title>
    <style>
        :root {
            --bg-color: #020617;
            --accent: #3b82f6;
            --player-height: 100px;
        }

        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            background-color: var(--bg-color);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            user-select: none;
            color: white;
            scroll-behavior: smooth;
        }

        /* Prevent scrolling initially */
        body.no-scroll {
            overflow: hidden;
        }

        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            padding: 100px;
            margin: -100px;
            z-index: 1;
        }

        /* Hero Content */
        .content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            /* Make interactive */
            pointer-events: auto;
            transition: opacity 0.8s ease, transform 1s cubic-bezier(0.23, 1, 0.32, 1);
            padding: 0 20px;
        }

        .content.hidden {
            opacity: 0;
            transform: scale(0.9);
            pointer-events: none;
        }

        h1 {
            font-size: clamp(2.5rem, 8vw, 5rem);
            font-weight: 800;
            letter-spacing: -0.04em;
            margin-bottom: 1rem;
            line-height: 1.1;
            background: linear-gradient(to bottom, #ffffff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .text-body {
            font-size: clamp(0.9rem, 1.5vw, 1.1rem);
            color: #94a3b8;
            max-width: 700px;
            margin-bottom: 2.5rem;
            line-height: 1.6;
            text-align: center;
        }

        /* Button Layout */
        .button-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            pointer-events: auto;
            margin-top: 50px;
        }

        .horizontal-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .cta-button {
            padding: 1rem 2.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: white;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 99px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            backdrop-filter: blur(10px);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            white-space: nowrap;
        }

        .cta-button:hover {
            background: var(--accent);
            border-color: var(--accent);
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
        }

        .cta-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .signout-button {
            padding: 0.8rem 2rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: #ef4444;
            background: rgba(239, 68, 68, 0.05);
            border: 1px solid rgba(239, 68, 68, 0.2);
            border-radius: 99px;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: none;
        }

        .signout-button:hover {
            background: #ef4444;
            color: white;
            border-color: #ef4444;
            transform: scale(1.05);
        }

        .secondary-button {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 0.8rem;
            cursor: pointer;
            text-decoration: underline;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }

        .secondary-button:hover {
            opacity: 1;
            color: white;
        }

        /* Form Styling */
        .form-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            text-align: left;
            pointer-events: auto;
        }

        .form-group {
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .form-group label {
            font-size: 0.8rem;
            color: #94a3b8;
            margin-left: 0.5rem;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="date"],
        select {
            width: 100%;
            padding: 0.8rem 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            color: white;
            font-family: inherit;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        input:focus, select:focus {
            outline: none;
            border-color: var(--accent);
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            color: #94a3b8;
            font-size: 0.9rem;
            cursor: pointer;
        }

        .submit-btn {
            width: 100%;
            padding: 1rem;
            background: var(--accent);
            border: none;
            border-radius: 12px;
            color: white;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .submit-btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }

        .submit-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .error-msg {
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            text-align: center;
            display: none;
        }

        /* Dashboard/Song Grid */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1.5rem;
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            pointer-events: auto;
            text-align: left;
        }

        /* Search Bar for Dashboard */
        .dashboard-search-container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto 100px auto; 
            pointer-events: auto;
        }

        .dashboard-search-input {
            width: 100%;
            padding: 1rem 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            color: white;
            font-size: 1rem;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .dashboard-search-input:focus {
            outline: none;
            border-color: var(--accent);
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
        }

        .song-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 1rem;
            transition: all 0.3s ease;
            cursor: pointer;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
        }

        .song-card.hidden {
            display: none;
        }

        .song-card:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-5px);
            border-color: var(--accent);
        }

        .song-card.playing {
            border-color: var(--accent);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }

        .song-art {
            aspect-ratio: 1;
            background: linear-gradient(45deg, #1e293b, #334155);
            border-radius: 12px;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: var(--accent);
            background-size: cover;
            background-position: center;
        }

        .song-title {
            font-weight: 700;
            font-size: 0.95rem;
            margin-bottom: 0.25rem;
            color: white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .song-artist {
            font-size: 0.8rem;
            color: #94a3b8;
        }

        .playing-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--accent);
            color: white;
            font-size: 0.6rem;
            padding: 2px 8px;
            border-radius: 10px;
            font-weight: bold;
            display: none;
        }

        .song-card.playing .playing-indicator {
            display: block;
        }

        /* Player Bar UI */
        #player-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: var(--player-height);
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(25px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 100;
            display: flex;
            flex-direction: column; 
            box-sizing: border-box;
            transform: translateY(100%);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        #player-bar.visible {
            transform: translateY(0);
        }

        .progress-container {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            cursor: pointer;
            position: relative;
            transition: height 0.2s ease;
        }

        .progress-container:hover {
            height: 6px;
        }

        .progress-bar {
            height: 100%;
            background: var(--accent);
            width: 0%;
            position: relative;
            transition: width 0.1s linear;
        }

        .player-main-content {
            display: flex;
            align-items: center;
            padding: 0 2rem;
            height: calc(100% - 4px);
            width: 100%;
            box-sizing: border-box;
        }

        .player-info {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex: 1;
            min-width: 0;
        }

        .player-art {
            width: 56px;
            height: 56px;
            border-radius: 8px;
            background-size: cover;
            background-position: center;
            background-color: #1e293b;
        }

        .player-meta {
            min-width: 0;
        }

        .player-title {
            font-weight: 700;
            font-size: 0.95rem;
            color: white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .player-artist {
            font-size: 0.8rem;
            color: #94a3b8;
        }

        .player-controls {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            flex: 2;
            justify-content: center;
        }

        .control-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            opacity: 0.8;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .control-btn:hover {
            opacity: 1;
            transform: scale(1.1);
        }

        .play-pause-btn {
            width: 44px;
            height: 44px;
            background: white;
            color: black;
            border-radius: 50%;
            font-size: 1.2rem;
        }

        .player-volume {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
        }

        .volume-slider {
            width: 100px;
            accent-color: var(--accent);
            cursor: pointer;
        }

        .noise {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            opacity: 0.05;
            z-index: 2;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* Go Back button styling (visible only in dashboard) */
        #goBackBtn {
            position: fixed;
            left: 16px;
            top: 16px;
            z-index: 200;
            display: none;
            padding: 0.6rem 1rem;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(0,0,0,0.4);
            color: white;
            cursor: pointer;
            font-weight: 600;
            backdrop-filter: blur(6px);
        }
        #goBackBtn:hover {
            background: var(--accent);
            border-color: var(--accent);
            transform: scale(1.03);
        }

        /* Profile UI */
        #profileBtn {
            position: fixed;
            right: 16px;
            top: 16px;
            z-index: 210;
            width: 44px;
            height: 44px;
            border-radius: 999px;
            background: linear-gradient(135deg,#111827,#0b1220);
            border: 1px solid rgba(255,255,255,0.06);
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        #profileBtn img {
            width: 36px;
            height: 36px;
            border-radius: 999px;
            object-fit: cover;
            display: block;
        }

        .profile-menu {
            position: fixed;
            right: 16px;
            top: 72px;
            z-index: 215;
            min-width: 260px;
            background: rgba(6,8,15,0.98);
            border: 1px solid rgba(255,255,255,0.04);
            padding: 12px;
            border-radius: 12px;
            display: none;
            box-shadow: 0 30px 80px rgba(0,0,0,0.6);
        }
        .profile-menu .user { display:flex; gap:10px; align-items:center; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.03); margin-bottom:8px; }
        .profile-menu .user .avatar { width:44px; height:44px; border-radius:999px; background:linear-gradient(135deg,#0f172a,#071027); display:flex; align-items:center; justify-content:center; color:var(--accent); font-weight:800; }
        .profile-menu .meta .name { font-weight:700; }
        .profile-menu .meta .muted { color:#94a3b8; font-size:0.85rem; }
        .profile-menu .actions { display:flex; flex-direction:column; gap:6px; margin-top:8px; }
        .profile-menu .actions button { background:transparent; border:none; color:#cbd5e1; padding:8px; border-radius:8px; text-align:left; cursor:pointer; }
        .profile-menu .actions button:hover { background: rgba(255,255,255,0.02); color:white; }

        /* Overlay + modal (Roblox-like pop/scale animation) */
        .overlay {
            position: fixed;
            inset: 0;
            z-index: 300;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(2,6,23,0.6);
        }
        .modal {
            width: min(920px, 96%);
            max-height: 90vh;
            overflow: auto;
            border-radius: 14px;
            background: linear-gradient(180deg,#ffffff,#f7fbff);
            box-shadow: 0 30px 80px rgba(0,0,0,0.6);
            transform-origin: top center;
            animation: popin .36s cubic-bezier(.22,1,.36,1);
            color: #071124;
        }
        @keyframes popin {
            0% { opacity: 0; transform: translateY(-12px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-header { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid rgba(0,0,0,0.06); }
        .modal-body { display:flex; gap:12px; padding:16px; }
        .modal-left { width:220px; border-right:1px solid rgba(0,0,0,0.04); padding-right:10px; }
        .modal-left button { display:block; width:100%; padding:10px; text-align:left; border-radius:8px; border:none; background:transparent; cursor:pointer; margin-bottom:8px; color:#334155; }
        .modal-left button.active { background: var(--accent); color: white; }
        .modal-right { flex:1; padding-left:10px; }

        /* small helpers */
        .muted { color:#94a3b8; }
        .error { color:#ef4444; }
        .success { color:#16a34a; }

        @media (max-width:720px) {
            .modal { width: 96%; }
            .modal-body { flex-direction: column; }
            .modal-left { width:100%; border-right:none; border-bottom:1px solid rgba(0,0,0,0.04); padding-bottom:10px; }
        }
    </style>
</head>
<body class="no-scroll">

    <div class="noise"></div>
    
    <main class="content" id="heroContent">
        <h1 id="headline">JaMusic v2</h1>
        <div class="text-body" id="subline">All in one and powerful modular discord bot. We thought its cool to turn it into a website cuz why not?</div>
        
        <div id="dynamicFormContainer" class="form-container" style="display: none;"></div>

        <div class="button-container" id="mainControls">
            <div class="horizontal-buttons" id="homeButtons">
                <button class="cta-button" id="mainButton">Read Terms</button>
                <button class="cta-button" id="dashboardButton">Dashboard</button>
            </div>
            <button class="signout-button" id="signOutBtn">Sign Out</button>
            <button class="secondary-button" id="doneButton">Done reading?</button>
        </div>
    </main>

    <div id="canvas-container">
        <canvas id="liquidCanvas"></canvas>
    </div>

    <!-- Player bar updated: added prev/next & loop button -->
    <div id="player-bar">
        <div class="progress-container" id="progressContainer">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="player-main-content">
            <div class="player-info">
                <div id="player-art" class="player-art"></div>
                <div class="player-meta">
                    <div id="player-title" class="player-title">Not Playing</div>
                    <div id="player-artist" class="player-artist">Select a track</div>
                </div>
            </div>
            <div class="player-controls">
                <button class="control-btn" id="prevBtn" title="Previous">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 6v12z"/></svg>
                </button>
                <button class="control-btn play-pause-btn" id="playPauseControl" title="Play/Pause">
                    <svg id="playIcon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg id="pauseIcon" style="display:none;" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                </button>
                <button class="control-btn" id="nextBtn" title="Next">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>

                <!-- loop control -->
                <button class="control-btn" id="loopBtn" title="Loop: off" style="background: rgba(255,255,255,0.03); border-radius:8px; padding:6px 8px;">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5a2 2 0 0 0-2 2v6h2V7zM17 17H7v-3l-4 4 4 4v-3h12a2 2 0 0 0 2-2v-6h-2v6z"/></svg>
                </button>
            </div>
            <div class="player-volume">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                <input type="range" class="volume-slider" min="0" max="1" step="0.01" value="0.8" id="volumeSlider">
            </div>
        </div>
    </div>

    <!-- Go Back button (will be shown only when dashboard is active) -->
    <button id="goBackBtn" aria-label="Go back to home">Go Back</button>

    <!-- Profile button + menu (visible in dashboard) -->
    <div id="profileBtn" title="Profile" style="display:none;">
        <img id="profileAvatar" src="https://avatars.dicebear.com/api/identicon/guest.svg" alt="avatar" />
    </div>

    <div class="profile-menu" id="profileMenu" aria-hidden="true">
        <div class="user">
            <div class="avatar" id="profileInitial">G</div>
            <div class="meta">
                <div id="profileName" class="name">Guest</div>
                <div id="profileEmail" class="muted">guest@example.com</div>
            </div>
        </div>
        <div class="actions">
            <button id="btnAccountSettings">Account Settings</button>
            <button id="btnGeneralSettings">General Settings</button>
            <button id="btnDisplayName">Display Name</button>
            <button id="btnLogout">Log Out</button>
        </div>
    </div>

    <!-- Overlay + Modals -->
    <div class="overlay" id="overlay" style="display:none;">
        <div class="modal" id="settingsModal" style="display:none;">
            <div class="modal-header">
                <div id="modalTitle">Settings</div>
                <button id="modalClose" style="background:transparent;border:none;cursor:pointer;font-weight:700;padding:.4rem .6rem;">✕</button>
            </div>
            <div class="modal-body">
                <div class="modal-left" id="modalLeft"></div>
                <div class="modal-right" id="modalRight"></div>
            </div>
        </div>
    </div>

    <!-- Display-name popup -->
    <div class="overlay" id="nameOverlay" style="display:none; align-items:center; justify-content:center;">
        <div class="modal" style="width:420px;">
            <div class="modal-header">
                <div>Change Display Name</div>
                <button id="nameClose">✕</button>
            </div>
            <div style="padding:14px;">
                <div class="form-group">
                    <label>New display name</label>
                    <input id="newDisplayName" placeholder="Your new display name" />
                </div>
                <div style="display:flex; gap:.5rem;">
                    <button id="saveDisplayName" class="cta-button" style="pointer-events:auto;">Save</button>
                    <button id="cancelDisplayName" class="secondary-button" style="pointer-events:auto;">Cancel</button>
                </div>
                <div id="displayNameMsg" class="muted"></div>
            </div>
        </div>
    </div>

    <script type="module">
        /* ------------- Firebase imports ------------- */
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
        import {
            getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
            onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, browserSessionPersistence,
            signInWithCustomToken, signInAnonymously, sendEmailVerification,
            updatePassword, reauthenticateWithCredential, EmailAuthProvider, updateProfile
        } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
        import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

        const envConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

        const firebaseConfig = {
            apiKey: "AIzaSyApKLZIjUZSQnKJCngvp0KZPYJf3zBNaCc",
            authDomain: "jamusic-v2.firebaseapp.com",
            projectId: "jamusic-v2",
            storageBucket: "jamusic-v2.firebasestorage.app",
            messagingSenderId: "765002295434",
            appId: "1:765002295434:web:a4c9ba98dbcd84f2573",
            measurementId: "G-XT4K7L1TVX"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        const initAuth = async () => {
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    try {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } catch (tokenErr) {
                        try {
                            await signInAnonymously(auth);
                        } catch (anonErr) {}
                    }
                } else {
                    // wait for onAuthStateChanged
                }
            } catch (err) {
                console.error("Auth init failed", err);
            }
        };
        initAuth();

        /* ---------------- DOM Refs ---------------- */
        const canvas = document.getElementById('liquidCanvas');
        const container = document.getElementById('canvas-container');
        const mainButton = document.getElementById('mainButton');
        const dashboardButton = document.getElementById('dashboardButton');
        const homeButtons = document.getElementById('homeButtons');
        const signOutBtn = document.getElementById('signOutBtn');
        const doneButton = document.getElementById('doneButton');
        const heroContent = document.getElementById('heroContent');
        const headline = document.getElementById('headline');
        const subline = document.getElementById('subline');
        const dynamicFormContainer = document.getElementById('dynamicFormContainer');
        const goBackBtn = document.getElementById('goBackBtn');
        const ctx = canvas.getContext('2d');

        const playerBar = document.getElementById('player-bar');
        const playerArt = document.getElementById('player-art');
        const playerTitle = document.getElementById('player-title');
        const playerArtist = document.getElementById('player-artist');
        const playPauseControl = document.getElementById('playPauseControl');
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const volumeSlider = document.getElementById('volumeSlider');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const loopBtn = document.getElementById('loopBtn');

        const profileBtn = document.getElementById('profileBtn');
        const profileMenu = document.getElementById('profileMenu');
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileInitial = document.getElementById('profileInitial');
        const profileAvatar = document.getElementById('profileAvatar');

        const overlay = document.getElementById('overlay');
        const settingsModal = document.getElementById('settingsModal');
        const modalLeft = document.getElementById('modalLeft');
        const modalRight = document.getElementById('modalRight');
        const modalClose = document.getElementById('modalClose');
        const modalTitle = document.getElementById('modalTitle');

        const nameOverlay = document.getElementById('nameOverlay');
        const newDisplayNameInput = document.getElementById('newDisplayName');
        const saveDisplayName = document.getElementById('saveDisplayName');
        const cancelDisplayName = document.getElementById('cancelDisplayName');
        const displayNameMsg = document.getElementById('displayNameMsg');
        const nameClose = document.getElementById('nameClose');

        /* ---------------- Animation / Canvas (unchanged) ---------------- */
        let width, height;
        let balls = [];
        let trail = [];
        let ripples = [];
        let shakeIntensity = 0;
        const shakeDecay = 0.96;
        let currentUser = null;

        let currentAudio = null;
        let currentTrackId = null;
        let loopState = 0; // 0 off, 1 loop-all, 2 loop-one

        const Tracks = [
            { id: "t1", name: "Never Gonna Give You Up", artist: "Rick Astley", imageurl: "https://i.scdn.co/image/ab67616d0000b273237665d08de01907e82a7d8a", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Video)%20(4K%20Remaster).mp3" },
            { id: "t2", name: "FTW", artist: "Lets be Friends", imageurl: "https://upload.wikimedia.org/wikipedia/en/5/53/FTW_Lets_Be_Friends_Orignal_Cover.jpeg", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/%5BElectro%5D%20-%20Lets%20Be%20Friends%20-%20FTW%20%5BMonstercat%20Release%5D.mp3" },
            { id: "t3", name: "River Flows In You", artist: "DJ Herjuana", imageurl: "https://i.scdn.co/image/ab67616d0000b27371cde6e77fc2d217cbc5f567", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/SpotiDownloader.com%20-%20River%20Flows%20in%20You%20-%20DJ%20HERJUANA.mp3" },
            { id: "t4", name: "Stereo Hearts", artist: "Gym Class Heroes", imageurl: "https://i.scdn.co/image/ab67616d0000b27318b8088fe0c3dbf78398b55a", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Gym%20Class%20Heroes%20-%20Stereo%20Hearts%20(Lyrics)%20%20Heart%20Stereo.mp3" },
            { id: "t5", name: "Heat Waves", artist: "Glass Animals", imageurl: "https://i.scdn.co/image/ab67616d0000b273712701c5e263efc8726b1464", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Glass%20Animals%20-%20Heat%20Waves%20(Lyrics).mp3" },
            { id: "t6", name: "Rap God", artist: "Eminem", imageurl: "https://i.scdn.co/image/ab67616d0000b273643e6ecebab400d52574e4b2", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Eminem%20-%20Rap%20God%20(Explicit).mp3" },
            { id: "t7", name: "End of Beginning", artist: "Djo", imageurl: "https://i.scdn.co/image/ab67616d0000b273fddfffec51b4580acae727c1", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Djo%20-%20End%20Of%20Beginning%20(Official%20Audio).mp3" },
            { id: "t8", name: "Corrupted", artist: "Danimal Cannon", imageurl: "https://i.scdn.co/image/ab67616d0000b27339be440fe5b4ef67f9de6cc7", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Danimal%20Cannon%20&%20Zef%20-%20Corrupted.mp3" },
            { id: "t9", name: "Get Lucky", artist: "Daft Punk", imageurl: "https://external-preview.redd.it/YhSfC0SPUFM1lKaznHyKvHb4mSa04ZtBfmd6vOUYuLM.jpg?width=1080&crop=smart&auto=webp&s=68f06ce15bc7a17b1792ebd7077803046191e139", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/Daft%20Punk%20-%20Get%20Lucky%20(Lyrics)%20ft.%20Pharrell%20Williams,%20Nile%20Rodgers.mp3" },
            { id: "t10", name: "A LITTLE THEORIZING", artist: "Stupendium", imageurl: "https://i.scdn.co/image/ab67616d0000b273bfebcc991d99e277f3260221", audiourl: "https://github.com/smileyface-istg/JaMusic-v2/raw/refs/heads/main/A%20Little%20Theorizing%20Lyrics.mp3" }
        ];

        const mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            targetX: window.innerWidth / 2,
            targetY: window.innerHeight / 2
        };

        class Ball {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.radius = Math.random() * 100 + 150;
                const colors = ['#3b82f6', '#1d4ed8', '#60a5fa'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                const dx = this.x - mouse.x, dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                if (dist < 300) {
                    const force = (300 - dist) / 300;
                    this.vx += (dx / dist) * force * 0.5;
                    this.vy += (dy / dist) * force * 0.5;
                }
                ripples.forEach(r => {
                    const rdx = this.x - r.x, rdy = this.y - r.y;
                    const rdist = Math.sqrt(rdx * rdx + rdy * rdy) || 1;
                    const diff = Math.abs(rdist - r.currentRadius);
                    if (diff < 60) {
                        const rforce = (60 - diff) * r.life * 0.45;
                        this.vx += (rdx / rdist) * rforce;
                        this.vy += (rdy / rdist) * rforce;
                    }
                });
                this.vx *= 0.98; this.vy *= 0.98;
                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
            }
            draw() {
                const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                g.addColorStop(0, this.color + '33');
                g.addColorStop(1, this.color + '00');
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            }
        }

        class Ripple {
            constructor(x, y, intensity = 12) {
                this.x = x; this.y = y; this.currentRadius = 0; this.life = 1.0; this.speed = intensity;
            }
            update() { this.currentRadius += this.speed; this.life -= 0.012; }
            draw() {
                ctx.beginPath(); ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(147, 197, 253, ${this.life * 0.6})`;
                ctx.lineWidth = 4 * this.life; ctx.stroke();
            }
        }

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            transition.maxRadius = Math.max(width, height) * 1.6;
            balls = [];
            for (let i = 0; i < 15; i++) balls.push(new Ball());
        }

        function triggerDrop(x, y, intensity = 15) {
            ripples.push(new Ripple(x, y, intensity * 0.8));
            shakeIntensity = intensity;
        }

        function applyShake() {
            if (shakeIntensity > 0.1) {
                const sx = (Math.random() - 0.5) * shakeIntensity;
                const sy = (Math.random() - 0.5) * shakeIntensity;
                container.style.transform = `translate(${sx}px, ${sy}px)`;
                shakeIntensity *= shakeDecay;
            } else {
                container.style.transform = `translate(0, 0)`;
            }
        }

        function animate() {
            applyShake();
            const dx = mouse.targetX - mouse.x, dy = mouse.targetY - mouse.y;
            mouse.x += dx * 0.12; mouse.y += dy * 0.12;

            if (Math.abs(dx) + Math.abs(dy) > 1 && !transition.active) {
                trail.push({ x: mouse.x, y: mouse.y, size: 60, life: 1.0 });
            }

            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'screen';

            balls.forEach(ball => { ball.update(); ball.draw(); });
            for (let i = ripples.length - 1; i >= 0; i--) {
                ripples[i].update(); ripples[i].draw();
                if (ripples[i].life <= 0) ripples.splice(i, 1);
            }
            for (let i = trail.length - 1; i >= 0; i--) {
                const t = trail[i]; t.life -= 0.025;
                if (t.life <= 0) { trail.splice(i, 1); continue; }
                const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size * (1 + (1 - t.life)));
                g.addColorStop(0, `rgba(37, 99, 235, ${t.life * 0.3})`);
                g.addColorStop(1, `rgba(37, 99, 235, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(t.x, t.y, t.size * (1 + (1 - t.life)), 0, Math.PI * 2); ctx.fill();
            }

            if (transition.active) {
                ctx.globalCompositeOperation = 'source-over';
                ctx.fillStyle = '#FFFFFF';
                
                if (transition.phase === 'out') {
                    transition.radius += transition.speed;
                    transition.speed = transition.speed * 1.045 + 0.1; 
                    if (transition.radius >= transition.maxRadius) {
                        performNavigation();
                        transition.phase = 'in';
                        transition.speed = 4;
                    }
                } else {
                    transition.radius -= transition.speed;
                    transition.speed = transition.speed * 1.06 + 0.2;
                    if (transition.radius <= 0) {
                        transition.active = false;
                        transition.radius = 0;
                    }
                }

                ctx.beginPath();
                ctx.arc(transition.x, transition.y, Math.max(0, transition.radius), 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalCompositeOperation = 'source-over';
            requestAnimationFrame(animate);
        }

        /* ---------------- Content & UI routing ---------------- */
        const contentData = {
            home: { 
                h: "JaMusic v2", 
                p: "All in one and powerful modular discord bot. We thought its cool to turn it into a website cuz why not?",
                b: "Read Terms",
                id: "home"
            },
            tos: { 
                h: "Terms of Service", 
                p: "By using JaMusic, you agree to follow the Discord ToS and not use the service for illegal streaming or disruption. We reserve the right to restrict access at any time.",
                b: "Privacy Policy",
                id: "tos"
            },
            privacy: { 
                h: "Privacy Policy", 
                p: "We do not store your private audio data. Minimal metadata like User IDs are used solely for configuration persistence and queue management.",
                b: "Back to Home",
                id: "privacy"
            },
            dashboard: {
                h: "Audio Dashboard",
                p: "Explore your audio library and AI-generated masterpieces. Your modular music hub starts here.",
                b: "Back to Home",
                id: "dashboard",
                customContent: `
                    <div class="dashboard-search-container">
                        <input type="text" id="dashboardSearch" class="dashboard-search-input" placeholder="Search by track name or artist...">
                    </div>
                    <div class="dashboard-grid" id="dashboardGrid">
                        ${Tracks.map(track => `
                            <div class="song-card ${currentTrackId === track.id ? 'playing' : ''}" data-track-id="${track.id}" data-name="${track.name.toLowerCase()}" data-artist="${track.artist.toLowerCase()}">
                                <div class="playing-indicator">Playing</div>
                                <div class="song-art" style="background-image: url('${track.imageurl}')"></div>
                                <div class="song-title">${track.name}</div>
                                <div class="song-artist">${track.artist}</div>
                            </div>
                        `).join('')}
                    </div>
                `
            },
            signup: {
                h: "Create Your Account",
                p: "Join the JaMusic ecosystem. Register now to save your custom modular configurations.",
                b: "Back to Home",
                id: "signup",
                form: `
                    <form id="signupForm">
                        <div class="form-group"><label>First Name</label><input type="text" id="regFirst" required placeholder="John"></div>
                        <div class="form-group"><label>Last Name</label><input type="text" id="regLast" required placeholder="Doe"></div>
                        <div class="form-group"><label>Email Address</label><input type="email" id="regEmail" required placeholder="john@example.com"></div>
                        <div class="form-group"><label>Password</label><input type="password" id="regPass" required placeholder="••••••••"></div>
                        <div class="form-group">
                            <label>Gender</label>
                            <select id="regGender" required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group"><label>Birthdate</label><input type="date" id="regDob" required></div>
                        <div id="signupError" class="error-msg"></div>
                        <button type="submit" class="submit-btn" id="signupSubmit">Submit Registration</button>
                    </form>
                `
            },
            login: {
                h: "Welcome Back",
                p: "Sign in to manage your bot instances and access your personalized dashboard.",
                b: "Back to Home",
                id: "login",
                form: `
                    <form id="loginForm">
                        <div class="form-group"><label>Email Address</label><input type="email" id="logEmail" required placeholder="john@example.com"></div>
                        <div class="form-group"><label>Password</label><input type="password" id="logPass" required placeholder="••••••••"></div>
                        <label class="checkbox-group">
                            <input type="checkbox" id="logRemember"> Remember me
                        </label>
                        <div id="loginError" class="error-msg"></div>
                        <button type="submit" class="submit-btn" id="loginSubmit">Login</button>
                    </form>
                `
            }
        };

        /* ---------------- Playback functions ---------------- */
        function playTrack(trackId) {
            const track = Tracks.find(t => t.id === trackId);
            if (!track) return;

            if (currentTrackId === trackId && currentAudio) {
                togglePlayback();
                return;
            }

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.ontimeupdate = null;
            }

            currentAudio = new Audio(track.audiourl);
            currentAudio.volume = parseFloat(volumeSlider.value);
            currentTrackId = trackId;
            // attempt play (may be blocked by autoplay policies)
            currentAudio.play().catch(()=>{});

            currentAudio.ontimeupdate = () => {
                if (currentAudio.duration) {
                    const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
                    progressBar.style.width = pct + '%';
                }
            };

            currentAudio.onended = () => {
                // Loop behavior:
                if (loopState === 2) {
                    // Loop one
                    currentAudio.currentTime = 0;
                    currentAudio.play().catch(()=>{});
                } else if (loopState === 1) {
                    // Loop all -> next track
                    playNext();
                } else {
                    progressBar.style.width = '0%';
                    updatePlaybackIcons(false);
                }
            };

            playerArt.style.backgroundImage = `url('${track.imageurl}')`;
            playerTitle.textContent = track.name;
            playerArtist.textContent = track.artist;
            
            playerBar.classList.add('visible');
            updatePlaybackIcons(true);

            if (transition.currentPage === 'dashboard') {
                updateDashboardUI();
            }
            
            triggerDrop(window.innerWidth / 2, window.innerHeight / 2, 40);
        }

        function togglePlayback() {
            if (!currentAudio) return;
            if (currentAudio.paused) {
                currentAudio.play().catch(()=>{});
                updatePlaybackIcons(true);
            } else {
                currentAudio.pause();
                updatePlaybackIcons(false);
            }
        }

        function updatePlaybackIcons(isPlaying) {
            playIcon.style.display = isPlaying ? 'none' : 'block';
            pauseIcon.style.display = isPlaying ? 'block' : 'none';
        }

        function playNext() {
            if (!currentTrackId) {
                playTrack(Tracks[0].id);
                return;
            }
            const idx = Tracks.findIndex(t => t.id === currentTrackId);
            const nextIdx = (idx + 1) % Tracks.length;
            playTrack(Tracks[nextIdx].id);
        }

        function playPrev() {
            if (!currentTrackId) {
                playTrack(Tracks[0].id);
                return;
            }
            const idx = Tracks.findIndex(t => t.id === currentTrackId);
            const prevIdx = (idx - 1 + Tracks.length) % Tracks.length;
            playTrack(Tracks[prevIdx].id);
        }

        prevBtn.addEventListener('click', playPrev);
        nextBtn.addEventListener('click', playNext);

        loopBtn.addEventListener('click', () => {
            loopState = (loopState + 1) % 3;
            if (loopState === 0) {
                loopBtn.title = 'Loop: off';
                loopBtn.style.background = 'rgba(255,255,255,0.03)';
            } else if (loopState === 1) {
                loopBtn.title = 'Loop: all';
                loopBtn.style.background = 'var(--accent)';
            } else {
                loopBtn.title = 'Loop: one';
                loopBtn.style.background = 'var(--accent)';
            }
        });

        playPauseControl.addEventListener('click', togglePlayback);
        
        volumeSlider.addEventListener('input', (e) => {
            if (currentAudio) currentAudio.volume = e.target.value;
        });

        progressContainer.addEventListener('click', (e) => {
            if (!currentAudio || !currentAudio.duration) return;
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            currentAudio.currentTime = pos * currentAudio.duration;
        });

        function updateDashboardUI() {
            const cards = document.querySelectorAll('.song-card');
            cards.forEach(card => {
                const id = card.getAttribute('data-track-id');
                if (id === currentTrackId) {
                    card.classList.add('playing');
                } else {
                    card.classList.remove('playing');
                }
            });
        }

        function handleSearch(e) {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.song-card');
            cards.forEach(card => {
                const name = card.getAttribute('data-name');
                const artist = card.getAttribute('data-artist');
                if (name.includes(term) || artist.includes(term)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }

        /* ---------------- Auth & Profile logic ---------------- */
        onAuthStateChanged(auth, (user) => {
            currentUser = user;
            if (user) {
                const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
                profileName.textContent = displayName;
                profileEmail.textContent = user.email || 'guest@example.com';
                profileInitial.textContent = (displayName[0] || 'G').toUpperCase();
                profileAvatar.src = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(displayName)}.svg`;
                if (transition.currentPage === 'home') {
                    signOutBtn.style.display = user.isAnonymous ? 'none' : 'block';
                    dashboardButton.style.display = user.isAnonymous ? 'none' : 'block';
                }
            } else {
                profileName.textContent = 'Guest';
                profileEmail.textContent = 'guest@example.com';
                profileInitial.textContent = 'G';
                profileAvatar.src = 'https://avatars.dicebear.com/api/identicon/guest.svg';
                signOutBtn.style.display = 'none';
                dashboardButton.style.display = 'none';
                signInAnonymously(auth).catch(() => {});
            }
        });

        signOutBtn.addEventListener('click', async (e) => {
            const rect = signOutBtn.getBoundingClientRect();
            triggerDrop(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);
            await signOut(auth);
            try { await signInAnonymously(auth); } catch (err) {}
        });

        /* ---------------- Signup / Login ---------------- */
        async function handleSignup(e) {
            e.preventDefault();
            const email = document.getElementById('regEmail').value;
            const pass = document.getElementById('regPass').value;
            const firstName = document.getElementById('regFirst').value;
            const lastName = document.getElementById('regLast').value;
            const gender = document.getElementById('regGender').value;
            const dob = document.getElementById('regDob').value;
            const errorDiv = document.getElementById('signupError');
            const submitBtn = document.getElementById('signupSubmit');

            errorDiv.style.display = 'none';
            submitBtn.disabled = true;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;
                await sendEmailVerification(user);
                await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'info'), {
                    firstName, lastName, gender, dob, createdAt: new Date().toISOString()
                });
                alert("Registration successful! A verification email has been sent to " + email);
                window.location.hash = ''; 
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
            }
        }

        async function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('logEmail').value;
            const pass = document.getElementById('logPass').value;
            const remember = document.getElementById('logRemember')?.checked;
            const errorDiv = document.getElementById('loginError');
            const submitBtn = document.getElementById('loginSubmit');

            errorDiv.style.display = 'none';
            submitBtn.disabled = true;

            try {
                const pType = remember ? browserLocalPersistence : browserSessionPersistence;
                await setPersistence(auth, pType);
                await signInWithEmailAndPassword(auth, email, pass);
                window.location.hash = '';
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
            }
        }

        /* ---------------- UI Routing & Transitions ---------------- */
        function updateUI(id) {
            transition.currentPage = id;
            headline.textContent = contentData[id].h;
            subline.textContent = contentData[id].p;
            
            if (id === 'home') {
                mainButton.textContent = "Read Terms";
                homeButtons.style.display = 'flex';
                dashboardButton.style.display = (currentUser && !currentUser.isAnonymous) ? 'block' : 'none';
                signOutBtn.style.display = (currentUser && !currentUser.isAnonymous) ? 'block' : 'none';
                goBackBtn.style.display = 'none';
                profileBtn.style.display = 'none';
                profileMenu.style.display = 'none';
            } else if (id === 'tos' || id === 'privacy') {
                mainButton.textContent = contentData[id].b;
                homeButtons.style.display = 'flex'; 
                dashboardButton.style.display = 'none';
                signOutBtn.style.display = 'none';
                goBackBtn.style.display = 'none';
                profileBtn.style.display = 'none';
                profileMenu.style.display = 'none';
            } else if (id === 'dashboard') {
                homeButtons.style.display = 'none'; 
                dashboardButton.style.display = 'none';
                signOutBtn.style.display = 'none';
                goBackBtn.style.display = 'block';
                profileBtn.style.display = 'flex';
                // profile menu hidden by default
                profileMenu.style.display = 'none';
            } else {
                mainButton.textContent = contentData[id].b;
                homeButtons.style.display = 'none';
                signOutBtn.style.display = 'none';
                goBackBtn.style.display = 'none';
                profileBtn.style.display = 'none';
                profileMenu.style.display = 'none';
            }
            
            if (contentData[id].customContent) {
                dynamicFormContainer.innerHTML = contentData[id].customContent;
                dynamicFormContainer.style.display = 'block';
                subline.style.marginBottom = '2rem';
                
                if (id === 'dashboard') {
                    document.getElementById('dashboardSearch').addEventListener('input', handleSearch);
                    document.querySelectorAll('.song-card').forEach(card => {
                        card.addEventListener('click', () => {
                            const trackId = card.getAttribute('data-track-id');
                            playTrack(trackId);
                        });
                    });
                }
            } else if (contentData[id].form) {
                dynamicFormContainer.innerHTML = contentData[id].form;
                dynamicFormContainer.style.display = 'block';
                subline.style.marginBottom = '1.5rem';
                if (id === 'signup') document.getElementById('signupForm').addEventListener('submit', handleSignup);
                if (id === 'login') document.getElementById('loginForm').addEventListener('submit', handleLogin);
            } else {
                dynamicFormContainer.style.display = 'none';
                subline.style.marginBottom = '2.5rem';
            }

            heroContent.classList.remove('hidden');
            doneButton.style.display = (id === 'home') ? 'block' : 'none';
        }

        function handleRouting() {
            const hash = window.location.hash;
            if (hash === '#terms') updateUI('tos');
            else if (hash === '#privacy') updateUI('privacy');
            else if (hash === '#signup') updateUI('signup');
            else if (hash === '#login') updateUI('login');
            else if (hash === '#dashboard') updateUI('dashboard');
            else updateUI('home');
        }

        function performNavigation() {
            let next;
            if (transition.targetHash !== null) {
                next = transition.targetHash;
                transition.targetHash = null;
            } else {
                if (transition.currentPage === 'home') next = 'terms';
                else if (transition.currentPage === 'tos') next = 'privacy';
                else next = '';
            }
            window.location.hash = next;
            handleRouting();
        }

        function startTransition(e, forcedHash = null) {
            if (transition.active) return;
            const target = e.target;
            const rect = target.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            transition.targetHash = forcedHash;
            triggerDrop(centerX, centerY, 80);
            transition.active = true;
            transition.phase = 'out';
            transition.x = centerX;
            transition.y = centerY;
            transition.radius = 0;
            transition.speed = 1.5;
            heroContent.classList.add('hidden');
        }

        window.handleAuthNav = (page, e) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => { startTransition(e, page); }, 300);
        };

        mainButton.addEventListener('click', (e) => {
            if (transition.currentPage === 'home') startTransition(e, 'terms');
            else if (transition.currentPage === 'tos') startTransition(e, 'privacy');
            else if (transition.currentPage === 'privacy') startTransition(e, '');
            else startTransition(e, '');
        });

        dashboardButton.addEventListener('click', (e) => {
            startTransition(e, 'dashboard');
        });
        
        doneButton.addEventListener('click', () => {
            // headlines removed — make this collapse the intro scroll and allow scrolling
            document.body.classList.remove('no-scroll');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            triggerDrop(window.innerWidth/2, window.innerHeight/2, 10);
        });

        // Go Back button behavior: sets hash to home (#)
        goBackBtn.addEventListener('click', () => {
            window.location.hash = '';
            updateUI('home');
            triggerDrop(window.innerWidth/2, window.innerHeight/2, 25);
        });

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => { mouse.targetX = e.clientX; mouse.targetY = e.clientY; });
        window.addEventListener('mousedown', (e) => {
            const isInteractive = (e.target.closest && (
                e.target.closest('button') || 
                e.target.closest('input') || 
                e.target.closest('select') || 
                e.target.closest('#player-bar') ||
                e.target.closest('#profileMenu')
            ));
            if (!isInteractive && !transition.active) triggerDrop(e.clientX, e.clientY, 15);
        });

        window.addEventListener('hashchange', handleRouting);

        /* ---------------- Profile menu behavior ---------------- */
        let profileOpen = false;
        profileBtn.addEventListener('click', (e) => {
            profileOpen = !profileOpen;
            profileMenu.style.display = profileOpen ? 'block' : 'none';
            profileMenu.setAttribute('aria-hidden', profileOpen ? 'false' : 'true');
        });
        document.addEventListener('click', (e) => {
            if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
                profileMenu.style.display = 'none';
                profileOpen = false;
            }
        });

        document.getElementById('btnLogout').addEventListener('click', async () => {
            try {
                await signOut(auth);
                try { await signInAnonymously(auth); } catch(e) {}
                alert('Logged out.');
                window.location.hash = '';
                updateUI('home');
            } catch (err) {
                alert('Error logging out: ' + err.message);
            }
        });

        /* ---------------- Settings modal (Roblox-style pop/scale) ---------------- */
        document.getElementById('btnAccountSettings').addEventListener('click', () => openSettingsModal('account'));
        document.getElementById('btnGeneralSettings').addEventListener('click', () => openSettingsModal('general'));

        function openSettingsModal(type='account') {
            overlay.style.display = 'flex';
            settingsModal.style.display = 'block';
            modalTitle.textContent = type === 'account' ? 'Account Settings' : 'General Settings';
            if (type === 'account') {
                buildModalLeft(['Safety', 'Personal Details'], 0);
                buildAccountRight('Safety');
            } else {
                buildModalLeft(['General', 'Zoom'], 0);
                buildGeneralRight('General');
            }
        }

        modalClose.addEventListener('click', closeSettingsModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSettingsModal(); });
        function closeSettingsModal() { overlay.style.display = 'none'; settingsModal.style.display = 'none'; }

        function buildModalLeft(items, activeIndex = 0) {
            modalLeft.innerHTML = '';
            items.forEach((it, idx) => {
                const btn = document.createElement('button');
                btn.textContent = it;
                if (idx === activeIndex) btn.classList.add('active');
                btn.addEventListener('click', () => {
                    modalLeft.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    if (it === 'Safety' || it === 'Personal Details') buildAccountRight(it);
                    if (it === 'General' || it === 'Zoom') buildGeneralRight(it);
                });
                modalLeft.appendChild(btn);
            });
        }

        function buildAccountRight(title) {
            modalRight.innerHTML = '';
            modalTitle.textContent = 'Account Settings — ' + title;
            if (title === 'Safety') {
                modalRight.innerHTML = `
                    <div>
                        <div style="font-weight:700;margin-bottom:8px;">Safety</div>
                        <div class="muted">Change your password (requires re-authentication).</div>
                        <div style="margin-top:12px;">
                            <div class="form-group"><label>Current password</label><input id="curPass" type="password" /></div>
                            <div class="form-group"><label>New password</label><input id="newPass" type="password" /></div>
                            <div class="form-group"><label>Confirm new password</label><input id="confirmPass" type="password" /></div>
                            <div style="display:flex;gap:.6rem;"><button id="changePasswordBtn" class="cta-button">Change password</button><button id="cancelChangePwd" class="secondary-button">Cancel</button></div>
                            <div id="pwdMsg"></div>
                        </div>
                    </div>
                `;
                document.getElementById('changePasswordBtn').addEventListener('click', async () => {
                    const cur = document.getElementById('curPass').value;
                    const np = document.getElementById('newPass').value;
                    const cp = document.getElementById('confirmPass').value;
                    const msg = document.getElementById('pwdMsg'); msg.innerHTML = '';
                    if (!auth.currentUser || !auth.currentUser.email) { msg.innerHTML = `<div class="error">You must be signed in to change password.</div>`; return; }
                    if (!cur || !np || !cp) { msg.innerHTML = `<div class="error">Please fill all fields.</div>`; return; }
                    if (np.length < 6) { msg.innerHTML = `<div class="error">New password must be at least 6 characters.</div>`; return; }
                    if (np !== cp) { msg.innerHTML = `<div class="error">Passwords do not match.</div>`; return; }
                    try {
                        const credential = EmailAuthProvider.credential(auth.currentUser.email, cur);
                        await reauthenticateWithCredential(auth.currentUser, credential);
                        await updatePassword(auth.currentUser, np);
                        msg.innerHTML = `<div class="success">Password updated successfully.</div>`;
                        document.getElementById('curPass').value = ''; document.getElementById('newPass').value = ''; document.getElementById('confirmPass').value = '';
                    } catch (err) {
                        msg.innerHTML = `<div class="error">${err.message}</div>`;
                    }
                });
                document.getElementById('cancelChangePwd').addEventListener('click', () => buildAccountRight('Safety'));
            } else if (title === 'Personal Details') {
                const display = auth.currentUser ? (auth.currentUser.displayName || '(not set)') : 'Guest';
                const email = auth.currentUser ? (auth.currentUser.email || 'guest@example.com') : 'guest@example.com';
                modalRight.innerHTML = `
                    <div>
                        <div style="font-weight:700;margin-bottom:8px;">Personal Details</div>
                        <div class="muted">Your profile information.</div>
                        <div style="margin-top:12px;">
                            <div class="form-group"><label>Display name</label><input value="${escapeHtml(display)}" disabled /></div>
                            <div class="form-group"><label>Email</label><input value="${escapeHtml(email)}" disabled /></div>
                        </div>
                    </div>
                `;
            }
        }

        function buildGeneralRight(title) {
            modalRight.innerHTML = '';
            modalTitle.textContent = 'General Settings — ' + title;
            if (title === 'General') {
                modalRight.innerHTML = `
                    <div>
                        <div style="font-weight:700;margin-bottom:8px;">General</div>
                        <div class="muted">App-wide settings.</div>
                        <div style="margin-top:12px;">
                            <label>Master volume</label>
                            <input id="generalVolume" type="range" min="0" max="1" step="0.01" value="${volumeSlider.value}" />
                            <div style="height:10px;"></div>
                            <label>Theme</label>
                            <div style="display:flex;gap:.6rem;margin-top:8px;"><button id="themeLight" class="cta-button">Light</button><button id="themeDark" class="cta-button">Dark</button></div>
                            <div style="height:10px;"></div>
                            <label>Other</label>
                            <div style="margin-top:8px;"><label style="display:flex;align-items:center;gap:.6rem;"><input id="toggleAutoplay" type="checkbox" /> Enable autoplay on first play</label></div>
                        </div>
                    </div>
                `;
                const generalVolume = document.getElementById('generalVolume');
                generalVolume.addEventListener('input', (e) => { volumeSlider.value = e.target.value; if (currentAudio) currentAudio.volume = e.target.value; });
                document.getElementById('themeLight').addEventListener('click', () => { document.body.classList.add('light-mode'); });
                document.getElementById('themeDark').addEventListener('click', () => { document.body.classList.remove('light-mode'); });
            } else if (title === 'Zoom') {
                modalRight.innerHTML = `
                    <div>
                        <div style="font-weight:700;margin-bottom:8px;">Zoom</div>
                        <div class="muted">Adjust base UI scale for easier reading on mobile.</div>
                        <div style="margin-top:12px;">
                            <label>UI Zoom</label>
                            <input id="zoomSlider" type="range" min="0.8" max="1.6" step="0.05" value="1" />
                            <div class="muted" style="margin-top:8px;">Tip: increase on small screens to make text larger.</div>
                        </div>
                    </div>
                `;
                document.getElementById('zoomSlider').addEventListener('input', (e) => {
                    const v = parseFloat(e.target.value);
                    document.documentElement.style.fontSize = (16 * v) + 'px';
                });
            }
        }

        function escapeHtml(s) { if (!s) return ''; return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

        /* ---------------- Display name popup ---------------- */
        function openNamePopup() {
            nameOverlay.style.display = 'flex';
            profileMenu.style.display = 'none';
            profileOpen = false;
            newDisplayNameInput.value = (auth.currentUser && auth.currentUser.displayName) ? auth.currentUser.displayName : '';
            displayNameMsg.textContent = '';
        }
        function closeNamePopup() { nameOverlay.style.display = 'none'; }
        document.getElementById('btnDisplayName').addEventListener('click', openNamePopup);
        document.getElementById('nameClose').addEventListener('click', closeNamePopup);
        document.getElementById('cancelDisplayName').addEventListener('click', closeNamePopup);
        document.getElementById('saveDisplayName').addEventListener('click', async () => {
            const newName = newDisplayNameInput.value.trim();
            if (!auth.currentUser) { displayNameMsg.textContent = 'You must be signed in.'; return; }
            if (!newName) { displayNameMsg.textContent = 'Enter a display name.'; return; }
            try {
                await updateProfile(auth.currentUser, { displayName: newName });
                profileName.textContent = newName;
                profileInitial.textContent = (newName[0] || 'G').toUpperCase();
                profileAvatar.src = `https://avatars.dicebear.com/api/initials/${encodeURIComponent(newName)}.svg`;
                displayNameMsg.textContent = 'Display name updated.';
                setTimeout(() => closeNamePopup(), 900);
            } catch (err) {
                displayNameMsg.textContent = err.message;
            }
        });

        /* ---------------- Dashboard interaction wiring at runtime ---------------- */

        /* Initialize interactions, routing, canvas */
        resize();
        handleRouting();
        requestAnimationFrame(animate);

        /* Make sure Done reading is only on home (already handled in updateUI), and profile button only visible on dashboard */
    </script>
</body>
</html>
