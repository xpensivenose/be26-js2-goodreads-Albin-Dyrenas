import { getAllBooks, postBooks } from "./modules/firebaserequest.js";
import { Books } from "./modules/Books.js";
import { renderBooks } from "./modules/renderbooks.js";

const bookWrapper = document.querySelector('#bookWrapper');
const form = document.querySelector('form');
const allArray = [];


loadAndRenderBooks()
    .catch(error => console.log(error));


    form.addEventListener("submit", async event => {
        event.preventDefault();
        const formData = new FormData(form); 
        
        const newBooks = {
            title: formData.get('title'),
            author: formData.get('author'),
            isRead: false
        };
        
        try{
            const response = await postBooks(newBooks)
            console.log(response)
            await loadAndRenderBooks()
            form.reset();
        
        } catch (error) {
            throw error; 
        }
        
    });

    bookWrapper.addEventListener("click", async event => {
        if(event.target.classList.contains('btnAdd')) {
            const btnWrapper = event.target.parentElement; 
            const idWrapper = btnWrapper.id; 
            const correctBook = allArray.find(bok => bok.getId() === idWrapper);
            await correctBook.patchIsRead();
            await loadAndRenderBooks()
        } else if(event.target.classList.contains('btnDel')) {
            const btnWrapper = event.target.parentElement; 
            const idWrapper = btnWrapper.id; 
            const correctBook = allArray.find(bok => bok.getId() === idWrapper);
            await correctBook.deleteBook();
            await loadAndRenderBooks()
        }
    });

    bookWrapper.addEventListener("change", async event => {
        if(event.target.classList.contains('selectionGrade')) {
            const selectWrapper = event.target.parentElement; 
            const idSelWrapper = selectWrapper.id; 
            const changeSelect = allArray.find(bok => bok.getId() === idSelWrapper);
            await changeSelect.rateBook(event);
            await loadAndRenderBooks()
        };
    })

    async function loadAndRenderBooks() {
        allArray.length = 0;
        const dataForm = await getAllBooks();
        const booksObject = {};
        for(const [key, value] of Object.entries(dataForm)) {
            booksObject[key] = new Books(value.title, value.author, value.isRead, 
                value.score, key);
                allArray.push(booksObject[key]);
        }
        renderBooks(booksObject);
    }

    console.log(form); 