const addBtn = document.getElementById('add-button'),
    inputTitle = document.getElementById('book-name'),
    inputAuthor = document.getElementById('book-author'),
    inputPages = document.getElementById('book-pages'),
    inputRead = document.getElementById('book-read'),
    form = document.getElementById('input-book-form'),
    bookShelf = document.getElementById('book-shelf');

let library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function refreshBookShelf() {
    const allBooks = document.querySelectorAll('.book');

    allBooks.forEach((e) => {
        e.remove();
    });
}

function showBooks() {

    refreshBookShelf();

    for (let i = 0; i < library.length; i++) {
        let newBook = document.createElement('div'),
            newBookReadBtn = document.createElement('button'),
            newBookDeleteBtn = document.createElement('button'),
            newBookTitle = document.createElement('h3'),
            newBookAuthor = document.createElement('h4'),
            newBookPages = document.createElement('h5');

        newBook.classList.add('book');
        newBookDeleteBtn.classList.add('delete-btn');
        newBookReadBtn.classList.add('read-btn');

        if (library[i].read === true) {
            newBook.classList.add('read-check');
        } else { }

        newBookTitle.innerText = `${library[i].title}`;
        newBookAuthor.innerText = `${library[i].author}`;
        newBookPages.innerText = `${library[i].pages}`;

        newBookReadBtn.innerText = 'Read';
        newBookDeleteBtn.innerText = 'Delete'

        newBook.appendChild(newBookTitle);
        newBook.appendChild(newBookAuthor);
        newBook.appendChild(newBookPages);
        newBook.appendChild(newBookReadBtn);
        newBook.appendChild(newBookDeleteBtn);

        bookShelf.appendChild(newBook);
    }


    // Creates an event listener for every delete button created
    const deleteButton = document.querySelectorAll('.delete-btn');

    deleteButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            deleteBook();
        })
    })

    // Creates an event listener for every read button created
    const readButton = document.querySelectorAll('.read-btn');

    readButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            toggleRead(index);
        })
    })
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
    showBooks();
}

function deleteBook(index) {
    library.splice(index, 1);
    showBooks();
}

function toggleRead(index) {
    if (library[index].read === true) {
        library[index].read = false;
    } else {
        library[index].read = true;
    }
    showBooks();
}

function validateForm(event) {
    event.preventDefault();
    if (inputTitle.value === '') {
        console.log('Please enter a book name');
    } else {

    }
    if (inputAuthor.value === '') {
        console.log('Please enter an author name');
    } else {

    }
    if (inputPages.value === '' || inputPages.value.match(/[^1-9]/) || inputPages.value <= 0) {
        console.log('Please enter a valid number');
    } else {

    }
    if (inputTitle.value != '' && inputAuthor.value != '' && inputPages.value != '') {
        if (inputRead.checked) {
            addBook(inputTitle.value, inputAuthor.value, inputPages.value, true);
        } else {
            addBook(inputTitle.value, inputAuthor.value, inputPages.value, false);
        }
        form.reset();
    }
}

addBtn.addEventListener('click', (e) => {
    validateForm(e);
})

