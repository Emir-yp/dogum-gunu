* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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

.card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    padding: 35px 25px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    text-align: center;
    max-width: 420px;
    width: 100%;
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    animation: fadeIn 1.2s ease-in-out;
}

.music-control {
    position: absolute;
    top: 15px;
    right: 20px;
    background: #ff4757;
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    box-shadow: 0 4px 10px rgba(255, 71, 87, 0.3);
    transition: transform 0.2s;
}

.music-control:hover {
    transform: scale(1.1);
}

.title {
    color: #2f3542;
    font-size: 1.8rem;
    margin-top: 10px;
    margin-bottom: 5px;
}

.subtitle {
    color: #747d8c;
    font-size: 0.95rem;
    font-style: italic;
    margin-bottom: 20px;
}

.img-box {
    margin: 15px 0;
    display: inline-block;
    position: relative;
}

.img-box img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #ff4757;
    box-shadow: 0 8px 20px rgba(255, 71, 87, 0.25);
    transition: transform 0.3s;
}

.img-box img:hover {
    transform: scale(1.04) rotate(2deg);
}

.message-box {
    background: #f1f2f6;
    padding: 18px;
    border-radius: 16px;
    margin: 20px 0;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.message-box p {
    color: #57606f;
    font-size: 1rem;
    line-height: 1.5;
}

.button-group {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    border: none;
    padding: 12px 20px;
    font-size: 0.95rem;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary {
    background: #ff4757;
    color: white;
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
}

.btn-primary:hover {
    background: #ff6b81;
    transform: translateY(-2px);
}

.btn-secondary {
    background: #70a1ff;
    color: white;
    box-shadow: 0 4px 12px rgba(112, 161, 255, 0.3);
}

.btn-secondary:hover {
    background: #1e90ff;
    transform: translateY(-2px);
}

.footer-note {
    margin-top: 25px;
    font-size: 0.8rem;
    color: #a4b0be;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

