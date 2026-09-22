export function renderBooks(booksObj){
    const bookWrapper = document.querySelector('#bookWrapper');
    bookWrapper.textContent = "";
    
    for(const key in booksObj) {
        
        const cardDiv = document.createElement('div'); 
        const title = document.createElement('h2');
        const liCard = document.createElement('li');
        const pCard = document.createElement('p'); 
        
        cardDiv.classList.add('cardDiv'); 
        title.classList.add('title'); 
        liCard.classList.add('liCard'); 
        pCard.classList.add('pCard'); 

        const {btnToggle, btnDel} = createButtons(booksObj[key]);
        const renderBookCover = createBookCover(booksObj[key].getCoverUrl());
        
        bookWrapper.append(cardDiv);
        cardDiv.append(liCard); 
        
        liCard.id = key; 
        
        title.innerText = `${booksObj[key].getTitle()}`;
        pCard.innerHTML = `Author: ${booksObj[key].getAuthor()}
        <br>Read: ${booksObj[key].getIsRead()}`;
    
        if(booksObj[key].getIsRead() === true) {
            const {selectionGrade} = createSelectScore(booksObj[key]);
            //använde \n på rating för att det inte fungerar med <br>
            //Eftersom kodraden ovanför bytte tillbaka till innerText. 
            pCard.innerText += `\nRating: ${booksObj[key].getScore()}`; 
            liCard.append(selectionGrade);
        } 
        liCard.append(title, pCard, btnToggle, btnDel, renderBookCover);
    }
}

function createSelectScore(book) {
    const selectionGrade = document.createElement('select');
    selectionGrade.classList.add('selectionGrade');
    const optionsSelectArray = [1, 2, 3, 4, 5, 6, 7 ,8 ,9 ,10];

    for(const grade of optionsSelectArray) {
        const optionsSelect = document.createElement('option');
        optionsSelect.classList.add('optionsGrade');
        optionsSelect.innerText = grade; 
        optionsSelect.value = grade; 
        selectionGrade.append(optionsSelect)
    }
    
    if (book.getScore()) {
        selectionGrade.value = book.getScore();
    } else {
        selectionGrade.value = '';
    }

    return {selectionGrade};
}

function createButtons(book){
    const btnToggle = document.createElement('button');
    const btnDel = document.createElement('button');
    btnToggle.classList.add('btnToggle');
    btnDel.classList.add('btnDel');
    btnDel.innerText = ('Ta bort bok');
    
    if(book.getIsRead() === true) {
        btnToggle.classList.add('isRead');
        btnToggle.innerText = 'Markera som oläst';
    }
    else {
        btnToggle.classList.add('isUnread');
        btnToggle.innerText = 'Markera som läst';
    } 

    return { btnToggle, btnDel }; 
}

function createBookCover(coverUrl) { 
    //CoverUrl är tomt om API:et inte hittar en bild. 
    const noBookCover = document.createElement('span');
    noBookCover.innerText = 'Hittar inte bild';

    if(!coverUrl){
        return noBookCover;
    } else {
        const bookCover = document.createElement('img');
        bookCover.classList.add('bookCover');
        bookCover.src = coverUrl;
        return bookCover;
    }
}