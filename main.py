from flask import Flask, request, redirect, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['DEBUG'] = True
#connection string to connect to DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://1kb4k:1kb4k@localhost:8889/1kb4k'
#db type + database driver connecting db to app ://user:password@where database lives:port/name of database
app.config['SQLALCHEMY_ECHO'] = True #echoes the SQL commands generated by SQLAlchemy in the terminal

db = SQLAlchemy(app) 

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True) #primary key
    title = db.Column(db.String(120))
    author = db.Column(db.String(120))
    description = db.Column(db.String(600))
    #add image later

    def __init__(self, title, author, description):
        self.title = title
        self.author = author
        self.description = description

@app.route('/', methods=['POST', 'GET'])
def index():

    return render_template('index.html')

@app.route('/add-book', methods=['POST'])
def add_book():
    book_title = request.form['book_title']
    author_name = request.form['author_name'] 
    book_img_thumbnail = request.form['book_img_thumbnail']
    book_description = request.form['book_description']
    return render_template('addBook.html', book_title=book_title, author_name=author_name, book_description=book_description, book_img_thumbnail=book_img_thumbnail)

@app.route('/book-confirmation', methods=['POST'])
def book_confirmation():

    book_title = request.form['book_title']
    author_name = request.form['author_name'] 
    book_description = request.form['book_description']
    new_book = Book(book_title, author_name, book_description) 
    db.session.add(new_book)
    db.session.commit()

    return render_template('bookConfirmation.html', book_title=book_title)

@app.route('/library', methods=['POST', 'GET'])
def library():

    books = Book.query.all()

    return render_template('library.html', books=books)

@app.route('/delete-book', methods=['POST', 'GET'])
def delete_book():
    book_id = int(request.form['book-id'])
    book = Book.query.get(book_id)
    db.session.delete(book)
    db.session.commit()

    return render_template('bookDeletionConfirmation.html', book=book)

@app.route('/edit-book', methods=['POST', 'GET'])
def edit_book():
    book_id = int(request.form['book-id'])
    book = Book.query.get(book_id)

    return render_template('editBook.html', book=book)

@app.route('/edit-confirmation', methods=['POST'])
def edit_confirmation():

    book_title = request.form['book-title']
    book_id = request.form['book-id']
    if len(book_title) > 0:
        update_book_title = Book.query.filter_by(id=book_id).first()
        print(update_book_title.title)
        update_book_title.title = book_title
        print(update_book_title.title)
        db.session.commit()

    return render_template('editConfirmation.html', book_title=book_title)
        

if __name__ == '__main__': 
    app.run()