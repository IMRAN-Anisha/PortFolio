from flask import Flask, request
app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_email():
    email = request.form.get('email')
    if email:
        with open('emails.txt', 'a') as f:
            f.write(email + '\n')
        return 'OK'
    return 'No email received', 400

if __name__ == '__main__':
    app.run(debug=True)
