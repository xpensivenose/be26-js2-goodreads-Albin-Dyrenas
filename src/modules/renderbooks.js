export function renderBooks(renderObj){
    const bookWrapper = document.querySelector('#bookWrapper');
    bookWrapper.textContent = "";
    
    for(const key in renderObj) {
        
        const cardDiv = document.createElement('div'); 
        const title = document.createElement('h2');
        const liCard = document.createElement('li');
        const pCard = document.createElement('p'); 
        const btnAdd = document.createElement('button');
        const btnDel = document.createElement('button');
        const selectionGrade = document.createElement('select');
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        const option3 = document.createElement('option');
        const option4 = document.createElement('option');
        const option5 = document.createElement('option');
        const option6 = document.createElement('option');
        const option7 = document.createElement('option');
        const option8 = document.createElement('option');
        const option9 = document.createElement('option');
        const option10 = document.createElement('option');
        
        cardDiv.classList.add('cardDiv'); 
        liCard.classList.add('liCard'); 
        btnAdd.classList.add('btnAdd');
        btnDel.classList.add('btnDel');
        pCard.classList.add('pCard'); 
        title.classList.add('title'); 
       
        btnDel.innerText = ('Ta bort bok')
        bookWrapper.append(cardDiv);
        cardDiv.append(liCard); 
        
        liCard.id = key; 
        
        title.innerText = `${renderObj[key].getTitle()}`;
        pCard.innerHTML = `Author: ${renderObj[key].getAuthor()}
        <br>Read: ${renderObj[key].getIsRead()}`;
        
        if(renderObj[key].getIsRead() === true) {
            btnAdd.innerText = 'Markera som oläst';
            btnAdd.classList.add('isRead');
            pCard.innerText += `\nRating: ${renderObj[key].getScore()}`;
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
            option6.innerText = ('6');
            option6.value = ('6');
            option7.innerText = ('7');
            option7.value = ('7');
            option8.innerText = ('8');
            option8.value = ('8');
            option9.innerText = ('9');
            option9.value = ('9');
            option10.innerText = ('10');
            option10.value = ('10');

            selectionGrade.append(option1, option2, option3, option4, option5, option6, option7, option8, option9, option10); 
            
            if (renderObj[key].getScore()) {
                selectionGrade.value = renderObj[key].getScore();
            } else {
                selectionGrade.value = '';
            }
        
        } else {
            btnAdd.classList.add('isUnread');
            btnAdd.innerText = 'Markera som läst';
        }

        liCard.append(title, pCard, btnAdd, btnDel);
    }
    
}