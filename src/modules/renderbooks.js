export function renderBooks(renderObj){
    /* const ul = document.querySelector('ul');  */
    ul.innerText = ""; 

    for(const key in renderObj) {
        if(renderObj[key].isRead === true) {
            getScore();
            continue; 
        } else {

        }

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

        title.innerText = renderObj[key].title
        cardDiv.append(liCard, btnCard); 
        liCard.append(pCard);

        liCard.id = key; 

        pCard.innerText = `
        ${renderObj[key].title}
        ${renderObj[key].author}
        ${renderObj[key].isRead}
        ${renderObj[key].score}
        `




    }
    
}