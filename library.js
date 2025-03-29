const myLibrary = [];
const cardContainer = document.getElementById("cardContainer");
const newBook = document.getElementById("newBook");
const form = document.querySelector("form");

//Book Constructor
function Book (title, author, numOfPages, readStatus) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
      }
    this.ID = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
}

//Function taht creates a new book and adds it to myLibrary array
function addToLibrary (title, author, numOfPages, readStatus){

    const book = new Book(title, author, numOfPages, readStatus);
    myLibrary.push(book);
}

//Clicking on new book button does this
newBook.addEventListener("click", ()=>{
    
})
//added some dummy books in array
addToLibrary('Dune', 'Frank Herbert', 896, false);
addToLibrary('Please Kill Me', 'Legs McNeil', 448, false);
addToLibrary('Patagonia Express', 'Luis Sepulveda', 192, true);
addToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, false);


//Function that displays all books in library array on html
myLibrary.forEach(Book => {
    const card = document.createElement('div');
    cardContainer.appendChild(card);
    card.classList.add('bookCard');
    
    const infoDiv = document.createElement('div');
    card.appendChild(infoDiv);
    

    const cardTitle = document.createElement("h2");
    cardTitle.textContent = `${Book.title}`;
    card.insertBefore(cardTitle, infoDiv);

    const cardAuthor = document.createElement("p");
    cardAuthor.textContent = `by ${Book.author}`;
    infoDiv.appendChild(cardAuthor);

    const cardNumOfPages = document.createElement("p");
    cardNumOfPages.textContent = ` ${Book.numOfPages} pages.`;
    infoDiv.appendChild(cardNumOfPages);

    const cardReadStatus = document.createElement("p");
    (Book.readStatus) ? cardReadStatus.textContent = 'Read!' : cardReadStatus.textContent = 'Not read yet.';
    infoDiv.appendChild(cardReadStatus);
});

