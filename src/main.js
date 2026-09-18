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

    //Hittar rätt ID och patchar rätt bok, och när man trycket på add/delknappen så förändras förälden(liCard),
    bookWrapper.addEventListener("click", async event => {
        if(event.target.classList.contains('btnAdd')) {
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

    //Tömmer arrayn för att det inte ska bli dubletter vid rendering. 
    // hämtar sedan alla böcker från firebase
    // Gör ett tomt bok objekt som sedan fylls med flera böcker 
    // sedan loopar jag för att sätta dit den nya bok-instansen av klassen med nyckelparen key och value i det tomma bok objektet.
    // pushar sedan bok instansen med rätt id till den tomma arrayn 
    // hämtar renderingen av alla böcker och sätter in booksobjectet så allting får rätt struktur på hemsidan 
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
        await Promise.all(coverPromises);
        renderBooks(booksObject);
    }

    console.log(form); 