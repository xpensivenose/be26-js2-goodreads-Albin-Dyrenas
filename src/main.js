import { baseURL, getAllBooks, postBooks } from "./modules/firebaserequest.js";
import { Books } from "./modules/Books.js";
import { renderBooks } from "./modules/renderbooks.js";

const bookWrapper = document.querySelector('#bookWrapper');
const form = document.querySelector('form');
const inputAuthor = document.querySelector('#authorBook');
const inputTitle = document.querySelector('#titleBook');

getAllBooks() 
    /* .then(renderBooks) */
    .then(data => console.log(data))
    .catch(error => console.log(error));


    form.addEventListener("submit", async event => {
        event.preventDefault();

        const authorValue = inputAuthor.value;
        const inputValue = inputTitle.value;

        const newBooks = {
            title: inputValue,
            author: authorValue
        }

        postBooks(newBooks)

        
    })

    console.log(form); 