import { getAllBooks, postBooks } from "./modules/firebaserequest.js";
import { Book } from "./modules/Book.js";
import { renderBooks } from "./modules/renderbooks.js";

const bookWrapper = document.querySelector('#bookWrapper');
const form = document.querySelector('form');
const allBooksArray = [];


loadAndRenderBooks()
    .catch(error => console.log(error));


    form.addEventListener("submit", async event => {
        event.preventDefault();
        const formData = new FormData(form); 
        
        const newBook = {
            title: formData.get('title'),
            author: formData.get('author'),
            isRead: false
        };
        
        try{
            const response = await postBooks(newBook)
            console.log(response)
            await loadAndRenderBooks()
            form.reset();
        
        } catch (error) {
            throw error; 
        }
        
    });

    //Hittar rätt ID och patchar rätt bok, och när man trycker på add/delknappen så förändras förälden(liCard),
    // Så event.target.parentElement.id hittar parentElementet och ger rätt bok iD utan att behöva söka i domen 
    bookWrapper.addEventListener("click", async event => {
        if(event.target.classList.contains('btnToggle')) {
            const btnWrapper = event.target.parentElement; 
            const idWrapper = btnWrapper.id; 
            const correctBook = allBooksArray.find(bok => bok.getId() === idWrapper);
            await correctBook.patchIsRead();
            await loadAndRenderBooks()
        } else if(event.target.classList.contains('btnDel')) {
            const btnWrapper = event.target.parentElement; 
            const idWrapper = btnWrapper.id; 
            const correctBook = allBooksArray.find(bok => bok.getId() === idWrapper);
            await correctBook.deleteBook();
            await loadAndRenderBooks()
        }
    });

    bookWrapper.addEventListener("change", async event => {
        if(event.target.classList.contains('selectionGrade')) {
            const selectWrapper = event.target.parentElement; 
            const idSelWrapper = selectWrapper.id; 
            const changeWrapper = allBooksArray.find(bok => bok.getId() === idSelWrapper);
            await changeWrapper.rateBook(event);
            await loadAndRenderBooks()
        };
    })

    async function loadAndRenderBooks() {
        allBooksArray.length = 0;
        const dataForm = await getAllBooks();
        const booksObject = {};
        const coverPromises = [];

        for(const [key, value] of Object.entries(dataForm)) {
            booksObject[key] = new Book(value.title, value.author, value.isRead, 
                value.score, key);
                coverPromises.push(booksObject[key].fetchCover());
                allBooksArray.push(booksObject[key]);
        }
        //Väntar in alla anrop till covers innan rendering, så sidan inte blir seg 
        // av att hämta ett omslag i taget 
        await Promise.all(coverPromises);
        renderBooks(booksObject);
    }
