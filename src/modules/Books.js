import { baseURL } from "./firebaserequest.js"

export class Books {
    #title 
    #author
    #isRead
    #score
    #id
    #url
    constructor(title, author, isRead, score, id){
        this.#title = title;
        this.#author = author; 
        this.#isRead = isRead;
        this.#score = score; 
        this.#id = id;
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
    getId(){
        return this.#id;
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

