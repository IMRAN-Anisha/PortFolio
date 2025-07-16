from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return '''
        <h2>Enter your email to be notified:</h2>
        <form method="POST" action="/notify">
            <input type="email" name="email" required>
            <button type="submit">Notify Me</button>
        </form>
    '''

@app.route('/notify', methods=['POST'])
def notify():
    email = request.form.get('email')
    if email:
        with open('emails.txt', 'a') as f:
            f.write(email + '\n')
        return '''
            <h2>Thank you!</h2>
            <p>We'll be in touch soon.</p>
            <a href="/">Back</a>
        '''
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
