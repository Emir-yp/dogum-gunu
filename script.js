* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color 0.4s, color 0.4s;
}

body {
    background: linear-gradient(135deg, #a8edd9 0%, #fed6e3 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
}

/* Gece Modu Stili */
body.dark-mode {
    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
}

body.dark-mode .card {
    background: rgba(30, 39, 46, 0.95);
    color: white;
    border-color: rgba(255, 255, 255, 0.1);
}

body.dark-mode .title {
    color: #ff7f50;
}

body.dark-mode .message-box {
    background: #2d3436;
}

body.dark-mode .message-box p {
    color: #dfe6e9;
}

.card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    padding: 30px 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 420px;
    width: 100%;
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
}

.music-control {
    position: absolute;
    top: 15px;
    right: 20px;
    background: #ff4757;
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 4px 10px rgba(255, 71, 87, 0.3);
}

.music-control:hover {
    transform: scale(1.1);
}

.title {
    color: #2f3542;
    font-size: 1.7rem;
    margin-top: 10px;
}

.subtitle {
    color: #747d8c;
    font-size: 0.9rem;
    font-style: italic;
    margin-bottom: 15px;
}

.img-container {
    position: relative;
    display: inline-block;
    margin: 10px 0;
}

.img-container img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #ff4757;
    box-shadow: 0 8px 20px rgba(255, 71, 87, 0.25);
}

.slide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 14px;
}

.slide-btn.prev { left: -10px; }
.slide-btn.next { right: -10px; }

.message-box {
    background: #f1f2f6;
    padding: 15px;
    border-radius: 16px;
    margin: 15px 0;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.message-box p {
    color: #57606f;
    font-size: 0.95rem;
    line-height: 1.5;
}

.button-group {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    border: none;
    padding: 10px 16px;
    font-size: 0.85rem;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
}

.btn-primary { background: #ff4757; color: white; }
.btn-secondary { background: #70a1ff; color: white; }
.btn-accent { background: #2ed573; color: white; }

.btn:hover { opacity: 0.9; transform: translateY(-2px); }

.footer-note {
    margin-top: 20px;
    font-size: 0.8rem;
    color: #a4b0be;
}

