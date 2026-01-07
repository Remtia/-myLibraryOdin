const displayPopupBtn = document.querySelector(".display-popup");
const cancelBtn = document.querySelector("#cancel");
const addBookBtn = document.querySelector("#add-book");
const popup = document.querySelector(".overlay");
const bookshelf = document.querySelector(".bookshelf");
const library = [];
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const haveReadInput = document.querySelector("#has-read");

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
        authorInput.placeholder = "Enter the book title";
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


addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if(!validateForm()) return;

  const bookTitle = titleInput.value;
  const bookAuthor = authorInput.value;
  const bookPages = pagesInput.value;
  const haveReadBook = haveReadInput.checked;

  addBookToShelf(bookTitle, bookAuthor, bookPages, haveReadBook);

  popup.classList.remove('active')
});
