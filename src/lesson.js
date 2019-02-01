// ES5
const library = [];
const form = document.getElementById('bookForm');

function Book(title, author, pageCount) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
}

function addBook(x, y, z) {
  const bookIRead = new Book(x, y, z);
  library.push(bookIRead);
}

form.addEventListener('submit', addBook(title.value, author.value, pageCount.value));

// ES6
class Book {
  constructor(title, author, pageCount) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
  }
}

let addBook = (x, y, z) => {
  const bookIRead = new Book(x, y, z);
  library.push(bookIRead);
};
