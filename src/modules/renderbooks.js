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

        const {btnAdd, btnDel} = createButtons(booksObj[key]);
        const renderBookCover = createBookCover(booksObj[key].getCoverUrl());
        
        bookWrapper.append(cardDiv);
        cardDiv.append(liCard); 
        
        liCard.id = key; 
        
        title.innerText = `${booksObj[key].getTitle()}`;
        pCard.innerHTML = `Author: ${booksObj[key].getAuthor()}
        <br>Read: ${booksObj[key].getIsRead()}`;
    
        if(booksObj[key].getIsRead() === true) {
            const {selectionGrade} = createSelectScore(booksObj[key]);
            pCard.innerText += `\nRating: ${booksObj[key].getScore()}`; //använde\n på rating för att det inte blev bra med <br>
            liCard.append(selectionGrade);
        } 
        liCard.append(title, pCard, btnAdd, btnDel, renderBookCover);
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
    const btnAdd = document.createElement('button');
    const btnDel = document.createElement('button');
    btnAdd.classList.add('btnAdd');
    btnDel.classList.add('btnDel');
    btnDel.innerText = ('Ta bort bok');
    
    if(book.getIsRead() === true) {
        btnAdd.classList.add('isRead');
        btnAdd.innerText = 'Markera som oläst';
    }
    else {
        btnAdd.classList.add('isUnread');
        btnAdd.innerText = 'Markera som läst';
    } 

    return { btnAdd, btnDel }; 
}

function createBookCover(coverUrl) { 
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