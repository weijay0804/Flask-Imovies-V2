from flask import Flask, make_response, jsonify


app = Flask(__name__)

@app.route('/')
def index():

    a = '1'
    res = make_response(jsonify({'test' : True}))
    res.set_cookie('test', value=a)

    return res


if __name__ == '__main__':
    app.run(debug=True)