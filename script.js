const addBtn = document.getElementById('add-button'),
    inputTitle = document.getElementById('book-name'),
    invalidMessages = document.querySelectorAll('.invalid'),
    inputAuthor = document.getElementById('book-author'),
    inputPages = document.getElementById('book-pages'),
    inputRead = document.getElementById('book-read'),
    form = document.getElementById('input-book-form'),
    deleteBtn = document.querySelector('.delete-button'),
    readCounterText = document.querySelector('.read-counter'),
    notReadCounterText = document.querySelector('.not-read-counter'),
    bookShelf = document.getElementById('book-shelf');

let library = [];
let invalid = Array.from(invalidMessages);
let readCounter = 0;

class Book {
    constructor(title, author, pages, read, color) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.color = color;
    }
}

function refreshBookShelf() {
    const allBooks = document.querySelectorAll('.book');

    allBooks.forEach((e) => {
        e.remove();
    });

    readCounter = 0;
}

function showBooks() {

    refreshBookShelf();

    if (retrieveLocal() != null) {
        library = retrieveLocal();
    }else{
        
    }

    for (let i = 0; i < library.length; i++) {
        let newBook = document.createElement('div'),
            bookInfoContainer = document.createElement('div'),
            bookInfo = document.createElement('div'),
            bookBtns = document.createElement('div'),
            newBookImg = document.createElement('img'),
            newBookReadBtn = document.createElement('button'),
            newBookDeleteBtn = document.createElement('button'),
            newBookTitle = document.createElement('h3'),
            newBookAuthor = document.createElement('h4'),
            newBookPages = document.createElement('h5');

        newBook.classList.add('book');
        bookInfoContainer.classList.add('book-info-container')
        bookInfo.classList.add('book-info');
        bookBtns.classList.add('book-buttons');
        newBookDeleteBtn.classList.add('delete-btn');
        newBookReadBtn.classList.add('read-btn');

        newBookImg.src = `./images/book${library[i].color}.svg`;

        if (library[i].read === true) {
            newBook.classList.add('read-check');
            newBookReadBtn.innerText = 'Read';
        } else {
            newBookReadBtn.innerText = 'Not Read';
        }

        newBookTitle.innerText = `${library[i].title}`;
        newBookAuthor.innerText = `${library[i].author}`;
        newBookPages.innerText = `Pages: ${library[i].pages}`;


        newBookDeleteBtn.innerText = 'Delete'

        bookInfo.appendChild(newBookTitle);
        bookInfo.appendChild(newBookAuthor);
        bookInfo.appendChild(newBookPages);

        bookInfoContainer.appendChild(newBookImg);
        bookInfoContainer.appendChild(bookInfo);

        bookBtns.appendChild(newBookReadBtn);
        bookBtns.appendChild(newBookDeleteBtn);

        newBook.appendChild(bookBtns);
        newBook.appendChild(bookInfoContainer);

        bookShelf.appendChild(newBook);

        if (library[i].read === true) {
            readCounter += 1;
        } else {

        }
    }

    readCounterText.innerHTML = `${readCounter}`;
    notReadCounterText.innerHTML = `${(library.length) - readCounter}`;

    // Creates an event listener for every delete button created
    const deleteButton = document.querySelectorAll('.delete-btn');

    deleteButton.forEach((button, index) => {
        button.addEventListener('click', () => {
            deleteBook(index);
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

function addBook(title, author, pages, read, colorNumber) {
    const book = new Book(title, author, pages, read, colorNumber);
    library.push(book);
    saveLocal();
    showBooks();
}

function deleteBook(index) {
    library.splice(index, 1);
    saveLocal();
    showBooks();
}

function toggleRead(index) {
    if (library[index].read === true) {
        library[index].read = false;
    } else {
        library[index].read = true;
    }
    saveLocal();
    showBooks();
}

function validateForm(event) {
    event.preventDefault();
    let bookColorNumber = Math.floor(Math.random() * 4) + 1;
    if (inputTitle.value === '') {
        invalid[0].innerHTML = 'Please enter a title name';
    } else {
        invalid[0].innerHTML = '';
    }
    if (inputAuthor.value === '') {
        invalid[1].innerHTML = 'Please enter an author name';
    } else {
        invalid[1].innerHTML = '';
    }
    if (inputPages.value === '' || inputPages.value <= 0) {
        invalid[2].innerHTML = 'Please enter a valid number of pages';
    } else {
        invalid[2].innerHTML = '';
    }
    if (inputTitle.value != '' && inputAuthor.value != '' && inputPages.value != '' && inputPages.value > 0) {
        if (inputRead.checked) {
            addBook(inputTitle.value, inputAuthor.value, inputPages.value, true, bookColorNumber);
        } else {
            addBook(inputTitle.value, inputAuthor.value, inputPages.value, false, bookColorNumber);
        }
        form.reset();
    }

}

addBtn.addEventListener('click', (e) => {
    validateForm(e);
})

deleteBtn.addEventListener('click', (e) => {
    refreshBookShelf(e);
    library = [];
    saveLocal();
    readCounterText.innerHTML = `0`;
    notReadCounterText.innerHTML = `0`;
});

// Local storage

function saveLocal() {
    localStorage.setItem('library', JSON.stringify(library));
}

function retrieveLocal() {
    return JSON.parse(localStorage.getItem('library'));
}

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    if (books) {
        library = books.map((book) => JSONToBook(book))
    } else {
        library = []
    }
}

window.onload = () => {
    if (library === null) {
        saveLocal();
    }else{
        showBooks();
    }
}