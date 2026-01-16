const displayPopupBtn = document.querySelector(".display-popup");
const cancelBtn = document.querySelector("#cancel");
const addBookBtn = document.querySelector("#add-book");
const popup = document.querySelector(".overlay");
const form = document.querySelector('.form-content');
const bookshelf = document.querySelector(".bookshelf");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const haveReadInput = document.querySelector("#has-read");
const library = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.id = crypto.randomUUID();
}

function addBookToShelf(title, author, pages, hasRead) {
  library.push(new Book(title, author, pages, hasRead));
}

function deleteBook(id) {
  const index = library.findIndex(book => book.id === id);
  library.splice(index, 1);
  renderBook();
}

displayPopupBtn.addEventListener("click", () => {
  popup.classList.add("active");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
  }
});

function validateForm() {
    if (titleInput.value.trim() === '') {
        titleInput.style.border = "2px solid red";
        titleInput.placeholder = "Enter the book title";
        titleInput.focus();
        return false;
    }

    if (authorInput.value.trim() === '') {
        authorInput.style.border = "2px solid red";
        authorInput.placeholder = "Enter the author's name";
        authorInput.focus();
        return false;
    }

    if (pagesInput.value === '' || pagesInput.value <= 0) {
        pagesInput.style.border = "2px solid red";
        pagesInput.focus();
        return false;
    }

    return true;
}


function renderBook() {
    bookshelf.innerHTML = '';

    library.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        const cardContent = document.createElement('div');
        cardContent.classList.add('book-card-content');

        const title = document.createElement('h3');
        title.textContent = book.title;

        const authorDiv = document.createElement('div');
        const by = document.createElement('p')
        by.innerText = `by`;
        by.style.fontStyle = "italic";
        by.style.marginBottom = "3px"

        const author = document.createElement('p');
        author.textContent = `${book.author}`;

        authorDiv.append(by, author)

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const status = document.createElement('span');
        status.textContent = book.hasRead ? 'Read' : 'Not read';
        status.classList.add(book.hasRead ? 'read' : 'not-read');

        const deleteBookBtn = document.createElement('img');
        deleteBookBtn.classList.add('trashcan');
        deleteBookBtn.src = './svgviewer-output.svg';
        deleteBookBtn.addEventListener('click', () => {
          deleteBook(book.id)
        })
        cardContent.append(title, authorDiv, pages, status, deleteBookBtn);
        card.append(cardContent);
        bookshelf.appendChild(card);
    });
}



addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if(!validateForm()) return;

  const bookTitle = titleInput.value;
  const bookAuthor = authorInput.value;
  const bookPages = pagesInput.value;
  const haveReadBook = haveReadInput.checked;

  addBookToShelf(bookTitle, bookAuthor, bookPages, haveReadBook);

  renderBook();
  form.reset();
  popup.classList.remove('active');
});

