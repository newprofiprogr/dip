from flask import Flask, render_template, request, redirect, session
import psycopg2

app = Flask(__name__)
app.secret_key = 'secret_key'


def get_db_connection():
    conn = psycopg2.connect(
        dbname="users",
        user="postgres",
        password="Kjgu7Hhfy5!",
        host="amvera-crot-cnpg-dipdb-rw",
        port="5432"
    )
    return conn


@app.route('/')
def index():
    return render_template('register.html')


@app.route('/register_page')
def register_page():
    return render_template('register.html')


@app.route('/register', methods=['POST'])
def register():
    conn = get_db_connection()
    cur = conn.cursor()

    name = request.form['name']
    username = request.form['username']
    password = request.form['password']

    cur.execute("INSERT INTO users (name, username, password) VALUES (%s, %s, %s)", (name, username, password))
    conn.commit()

    cur.close()
    conn.close()

    return redirect('/login_page')


@app.route('/login_page')
def login_page():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    conn = get_db_connection()
    cur = conn.cursor()

    username = request.form['username']
    password = request.form['password']

    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cur.fetchone()

    cur.close()
    conn.close()

    if user:
        session['username'] = user[2]
        return redirect('/main')
    else:
        return "Неверные данные"


@app.route('/main')
def main():
    if 'username' in session:
        return render_template('main.html')
    else:
        return redirect('/')

if __name__ == '__main__':
    app.run()
