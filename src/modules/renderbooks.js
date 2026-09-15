export function renderBooks(renderObj){
    const bookWrapper = document.querySelector('#bookWrapper');
    bookWrapper.textContent = "";
    
    for(const key in renderObj) {
       
        const cardDiv = document.createElement('div'); 
        const title = document.createElement('h2');
        const liCard = document.createElement('li');
        const pCard = document.createElement('p'); 
        const btnCard = document.createElement('button');
        const selectionGrade = document.createElement('select');
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        const option3 = document.createElement('option');
        const option4 = document.createElement('option');
        const option5 = document.createElement('option');
        
        cardDiv.classList.add('cardDiv'); 
        liCard.classList.add('liCard'); 
        btnCard.classList.add('btnCard');
        btnCard.innerText = ('Ta bort bok')
        bookWrapper.append(cardDiv);
        cardDiv.append(liCard, btnCard); 
        
        liCard.id = key; 
        
        title.innerText = `${renderObj[key].getTitle()}`;
        pCard.innerText =`${renderObj[key].getAuthor()}
        ${renderObj[key].getIsRead()}
        ${renderObj[key].getCategory()}`
        
        pCard.classList.add('pCard'); 
        title.classList.add('title'); 
        
        if(renderObj[key].getIsRead() === true) {
           
            selectionGrade.classList.add('selectionGrade'); 
            liCard.append(selectionGrade);

            option1.innerText = ('1');
            option1.value = ('1');
            option2.innerText = ('2');
            option2.value = ('2');
            option3.innerText = ('3');
            option3.value = ('3');
            option4.innerText = ('4');
            option4.value = ('4');
            option5.innerText = ('5');
            option5.value = ('5');

            selectionGrade.append(option1, option2, option3, option4, option5); 
           
            if (renderObj[key].getScore()) {
                selectionGrade.value = renderObj[key].getScore();
            } else {
                selectionGrade.value = '';
            }
        }
        liCard.append(pCard, title);
    }
    
}