const books = [];
const booksData = JSON.parse(localStorage.getItem("books"));
let edit = false;
let bookEditId = 0;

if (booksData !== null) {
  for (const book of booksData) {
    books.push(book);
  }
}

const generateId = () => {
  return +new Date();
}

const generateBookObject = (id, title, author, year, isCompleted) => {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  }
}

document.getElementById('inputBook').addEventListener('submit', (e) => {
  if(edit) {
    books.map((book) => {
      if (book.id === bookEditId) {
        book.title = document.getElementById('inputBookTitle').value;
        book.author = document.getElementById('inputBookAuthor').value;
        book.year = document.getElementById('inputBookYear').value;
        book.isCompleted = document.getElementById('inputBookIsComplete').checked;
      }
    })
    localStorage.setItem("books", JSON.stringify(books));
  } else {
    const generatedID = generateId();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const bookObject = generateBookObject(generatedID, title, author, year, isCompleted);
    books.push(bookObject);

    e.target.reset();
    localStorage.setItem("books", JSON.stringify(books));
  }
})

const handleComplete = (obj) => {
  books.map((book) => {
    if (book.id === obj.id) {
      book.isCompleted = !obj.isCompleted;
      return book;
    }
    return book;
  });
  localStorage.setItem("books", JSON.stringify(books));
  location.reload();
}

const handleEdit = (obj) => {
  document.getElementById('inputBookTitle').value = obj.title
  document.getElementById('inputBookAuthor').value = obj.author
  document.getElementById('inputBookYear').value = obj.year
  const check = document.getElementById('inputBookIsComplete')
  obj.isCompleted ? check.setAttribute("checked", "") : null;
  bookEditId = obj.id;
  edit = true;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const handleDelete = (obj) => {
  for (let i = 0; i < books.length; i++) {
    (books[i].id === obj.id) ?  books.splice(i, 1) : books
  }
  localStorage.setItem("books", JSON.stringify(books));
  location.reload();
}


const incompleteList = document.getElementById('incompleteBookshelfList');
const completedList = document.getElementById('completeBookshelfList');

const bookElement = (obj) => {
  const el = document.createElement('article');
  el.classList.add("book_card")

  // book detail
  const bookDetail = document.createElement('div');
  bookDetail.classList.add("book_detail")
  const title = document.createElement('h3');
  title.innerHTML = obj.title
  const author = document.createElement('h4');
  author.innerHTML = obj.author;
  const year = document.createElement('p');
  year.innerHTML = obj.year;
  bookDetail.append(title, author, year)

  // book action
  const action = document.createElement('div');
  action.classList.add("action");
  const btnComplete = document.createElement('button')
  btnComplete.innerHTML = obj.isCompleted ? "Unfinished" : "Finish"
  btnComplete.onclick = function (){handleComplete(obj)}
  btnComplete.classList.add("green")
  const btnEdit = document.createElement('button')
  btnEdit.innerHTML = "Edit"
  btnEdit.onclick = function (){handleEdit(obj)}
  btnEdit.classList.add("orange")
  const btnDelete = document.createElement('button')
  btnDelete.innerHTML = "Delete"
  btnDelete.onclick = function (){handleDelete(obj)}
  btnDelete.classList.add("red")
  action.append(btnComplete, btnEdit, btnDelete)

  el.append(bookDetail, action)
  return el
}

books.map((book) => {
  if (!book.isCompleted) {
    incompleteList.append(bookElement(book));
  } else {
    completedList.append(bookElement(book));
  }
})