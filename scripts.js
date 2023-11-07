const myLibrary = [];

const submitButton = document.getElementById("add-book-button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

function Book(title, author, rating = 0, readStatus = false) {
  this.title = title;
  this.author = author;
  this.rating = rating;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  const bookTitle = document.getElementById("book_title").value;
  const author = document.getElementById("author").value;
  const rating = document.getElementById("rating").value;
  const readStatus = !!document.getElementById("readStatus").value;

  const new_book = new Book(bookTitle, author, rating, readStatus);
  myLibrary.unshift(new_book);
  displayBooks();
}

function displayLibraryInfo() {
  const totalCount = myLibrary.length;
  let totalCompleted = 0;
  for (const book of myLibrary) {
    if (book.readStatus === true) {
      totalCompleted++;
    }
  }
  const infoList = document.querySelector("#info-list");
  infoList.textContent = "";
  const totalInfo = document.createElement("div");
  totalInfo.classList.add("info-element");
  totalInfo.textContent = `Total: ${totalCount}`;
  const readInfo = document.createElement("div");
  readInfo.classList.add("info-element");
  readInfo.textContent = `Read: ${totalCompleted}`;
  infoList.appendChild(totalInfo);
  infoList.appendChild(readInfo);
}

function displayBooks() {
  displayLibraryInfo();
  const bookList = document.querySelector("#table-body");
  bookList.textContent = "";
  for (const book of myLibrary) {
    const bookRow = document.createElement("tr"); // creates a row in the table
    bookRow.classList.add("book-info");
    bookList.appendChild(bookRow);
    // BOOK TITLE
    const title = document.createElement("td");
    title.textContent = book.title;
    bookRow.appendChild(title);
    // BOOK AUTHOR
    const author = document.createElement("td");
    author.textContent = book.author;
    bookRow.appendChild(author);
    // BOOK RATING
    const rating = document.createElement("td");
    rating.textContent = book.rating;
    bookRow.appendChild(rating);
    // BOOK STATUS
    const readStatus = document.createElement("td");
    const statusSymbol = document.createElement("i");
    statusSymbol.classList.add("readStatus");
    if (book.readStatus === false) {
      statusSymbol.textContent = "✖️";
    } else {
      statusSymbol.textContent = "✔️";
    }
    readStatus.appendChild(statusSymbol);
    bookRow.appendChild(readStatus);
    // BOOK REMOVAL
    const bookDelete = document.createElement("td");
    const deleteSymbol = document.createElement("i");
    deleteSymbol.classList.add("delete-icon");
    deleteSymbol.textContent = "delete";
    bookDelete.appendChild(deleteSymbol);
    bookRow.appendChild(bookDelete);
  }
}

function listenClicks() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.classList.contains("readStatus")) {
      console.log(typeof myLibrary[tr].readStatus);
      myLibrary[tr].readStatus = !myLibrary[tr].readStatus;
    } else if (target.classList.contains("delete-icon")) {
      myLibrary.splice(tr, 1);
    }
    displayBooks();
  });
}

listenClicks();
displayLibraryInfo();
