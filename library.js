const myLibrary = [];
const cardContainer = document.getElementById("cardContainer");
const newBook = document.getElementById("newBook");
const submit = document.getElementById("submit");
const formTitle = document.getElementById('bookTitle');
const formAuthor = document.getElementById('bookAuthor');
const formPages = document.getElementById('bookPages');
const formStatus = document.getElementById('bookReadStatus');

//Clicking on new book button does this
newBook.addEventListener("click", ()=>{
    const form = document.querySelector('form');
    form.classList.toggle('active');  
})

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
//test function for chatgpt that fetches a book cover from openlibrary
async function fetchBookCover(title) {
    const query = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
    const response = await fetch(query);
    const data = await response.json();
    
    if (data.docs && data.docs.length > 0) {
      const coverId = data.docs[0].cover_i;
      if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
      } else {
        return "No cover available";
      }
    } else {
      return "Book not found";
    }
  }

//Function thatt creates a new book and adds it to myLibrary array
function addToLibrary (title, author, numOfPages, readStatus){

    const book = new Book(title, author, numOfPages, readStatus);
    myLibrary.push(book);
}

//Function that displays all books in library array on html
async function displayBook(book) {
    const card = document.createElement('div');
    cardContainer.appendChild(card);
    card.classList.add('bookCard');
    
    
    const cover = document.createElement('img');
    const bookCover = await fetchBookCover(book.title);
    
    cover.setAttribute('src', bookCover);
    card.appendChild(cover);

    if (bookCover.startsWith('http')) {
        cover.setAttribute('src', bookCover);
    } else {
        cover.alt = bookCover; // if "No cover available" or "Book not found"
    }

    const infoDiv = document.createElement('div');
    infoDiv.id = 'infoDiv';
    card.insertBefore(infoDiv, cover);
    

    const cardTitle = document.createElement("h2");
    cardTitle.textContent = `${book.title}`;
    card.insertBefore(cardTitle, infoDiv);

    const cardAuthor = document.createElement("p");
    cardAuthor.textContent = `by ${book.author}`;
    infoDiv.appendChild(cardAuthor);

    const cardNumOfPages = document.createElement("p");
    cardNumOfPages.textContent = ` ${book.numOfPages} pages.`;
    infoDiv.appendChild(cardNumOfPages);

    const cardReadStatus = document.createElement("p");
    let flag = false;
    if(book.readStatus===true){
      flag = true;
      cardReadStatus.textContent = 'Read! :)';
    }
    else {
      cardReadStatus.textContent = 'Not read yet :(';
    }

    infoDiv.appendChild(cardReadStatus);


    //Delete & Read Buttons on the right end
    const buttonDiv = document.createElement('div');
    card.appendChild(buttonDiv);
    buttonDiv.id = 'buttonDiv';

    const readButton = document.createElement('input');
    readButton.setAttribute('type', 'image');
    readButton.setAttribute('src','icons/readIcon.svg');
    readButton.classList.add('cardButtons');

    buttonDiv.appendChild(readButton);

    
    readButton.addEventListener('click', ()=>{
      
      if (flag === true){
        cardReadStatus.textContent = 'Not read yet :(';
        flag = false;
      }
      else {
        cardReadStatus.textContent = 'Read! :)';
        flag = true;
      }
    });

    const deleteButton = document.createElement("input");
    deleteButton.setAttribute('type', 'image');
    deleteButton.setAttribute('src', 'icons/deleteIcon.svg');
    deleteButton.classList.add('cardButtons');
    
    buttonDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", ()=>{
      
      card.remove();
    })
};
//function for clicking submit on form and showing book on library
submit.addEventListener("click", async (event)=>{
    event.preventDefault();

    
    addToLibrary(formTitle.value, formAuthor.value, formPages.value, formStatus.checked);
    

    displayBook(myLibrary[myLibrary.length -1]);

    
});




