export const baseURL = "https://goodreads-1a2ce-default-rtdb.europe-west1.firebasedatabase.app/books";

export async function postBooks(newBooks) {
  try {
    const requestOption = {
      method: 'POST',
      body: JSON.stringify(newBooks),
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

