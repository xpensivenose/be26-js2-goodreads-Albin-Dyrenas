import { baseURL } from "./firebaserequest.js"

export class Books {
    #title 
    #author
    #isRead
    #score
    #id
    #category
    #url
    constructor(title, author, isRead, score, id, category){
        this.#title = title;
        this.#author = author; 
        this.#isRead = isRead;
        this.#score = score; 
        this.#id = id;
        this.#category = category;
        this.#url = `${baseURL}/${this.#id}.json`; 
    }
    getTitle(){
        return this.#title;
    }
    getAuthor(){
        return this.#author;
    }
    getIsRead(){
        return this.#isRead;
    }
    getScore(){
        if(this.#isRead === true){
            return this.#score
        }
    }
    getid(){
        return this.#id;
    }
     getCategory(){
        return this.#category;
    }
    deleteBook(){
        const delOptions = { 
            method: 'DELETE'
        };
        return fetch(this.#url, delOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete');
                }
                return 'Book deleted';
            })
            .catch(error => { 
                throw error;
            });
    }

    patchIsRead(){
        const patchOptions = {
            method: 'PATCH',
            body: JSON.stringify({ isRead: !this.#isRead}),
            headers: {
                'Content-type': 'application/json'
            }
        };
        return fetch(this.#url, patchOptions)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Failed to patch')
                }
                this.#isRead = !this.#isRead;
                return 'Patch succeded!'
            })
            .catch(error => { 
                throw error;
            });
    }

    rateBook(event){
         const patchOptions = {
            method: 'PATCH',
            body: JSON.stringify({ score: event.target.value}),
            headers: {
                'Content-type': 'application/json'
            }
        };
        return fetch(this.#url, patchOptions)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Failed to patch')
                }
                this.#score = event.target.value;
                return this.#score
            })
            .catch(error => { 
                throw error;
            });
    }    
}

/*     try {
    const response = await fetch(this.#url, delOptions); 
    if(!response.ok) {
        throw new Error('Failed to delete')
    }
    const data = await response.json();
    return 'Book deleted'; 
}
catch (error) {
    throw error; 
} */