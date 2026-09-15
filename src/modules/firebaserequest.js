export const baseURL = "https://goodreads-1a2ce-default-rtdb.europe-west1.firebasedatabase.app";

export async function postBooks(newBook) {
  try {
    const requestOption = {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-type': 'application/json'
      }
    }

    const response = await fetch (baseURL + '.json', requestOption);

    if(!response.ok){
      throw new Error('Failed post');
    }
    const data = await response.json();
    return data;
  }
  catch(error) {
    throw error;
  }
} 

export async function getAllBooks(){
  try {
    const response = await fetch (baseURL + '.json'); 
    if(!response.ok) {
      throw new Error('Failed to fetch books');
    }
    const data = await response.json();
    return data;
  }
  catch(error) {
    throw error; 
  }
}












/* // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYjG3_JE3u049loSrolAIJIQYpqSJB9Ww",
  authDomain: "goodreads-1a2ce.firebaseapp.com",
  databaseURL: "https://goodreads-1a2ce-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goodreads-1a2ce",
  storageBucket: "goodreads-1a2ce.firebasestorage.app",
  messagingSenderId: "1021370246622",
  appId: "1:1021370246622:web:d06e775a4122b4aa36294f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); */