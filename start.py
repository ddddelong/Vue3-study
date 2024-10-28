# app.py
from flask import Flask, send_from_directory, jsonify
import os
from flask_cors import CORS

app = Flask(__name__, static_folder='./src/assets')

base_url = 'http://127.0.0.1:5000/'
# 设置静态文件夹
app.config['IMAGE_UPLOADS'] = 'src/assets/images'
app.config['AUDIO_UPLOADS'] = 'src/assets/audio'
# 初始化 Flask-Cors
CORS(app)  # 默认情况下，这将为所有路由启用 CORS


@app.route('/images/<filename>')
def send_image(filename):
    print(app.config['IMAGE_UPLOADS'])
    return send_from_directory(app.config['IMAGE_UPLOADS'], filename)


@app.route('/audio/<filename>')
def send_audio(filename):
    return send_from_directory(app.config['AUDIO_UPLOADS'], filename)


@app.route('/api/music/info')
def get_music_info():
    music_info = [
        {
            "title": "best-wish",
            "author": "b站-十壹-Eleven",
            "url": f"{os.path.join(base_url, 'audio/yuanshen-wish.MP3')}",
            "coverUrl": f"{os.path.join(base_url, 'images/cake-1.png')}",
            "cruMusic": True
        },
        {
            "title": "祝你生日快乐呀",
            "author": "b站-许里xurry",
            "url": f"{os.path.join(base_url, 'audio/xl_xurry-Happy-Birthday.mp4')}",
            "coverUrl": f"{os.path.join(base_url, 'images/cover-许里xurry-如果你也在今天生日_那也祝你生日快乐呀_原神生日祝福.jpg')}",
            "cruMusic": False
        }
    ]
    return jsonify({
        "code": 200,
        "message": "Success",
        "data": music_info
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
