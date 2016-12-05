import os
from flask import Flask
from flask import render_template

app = Flask(__name__, static_folder='static', template_folder='static')
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
# db = SQLAlchemy(app)

@app.route("/")
@app.route("/login")
def main():
  return render_template('index.html')

@app.route("/landing")
def landing():
  return render_template('landing.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
