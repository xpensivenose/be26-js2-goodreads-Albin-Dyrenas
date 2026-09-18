export async function getBookCover(title, author) {
    try{
        const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1`;
        const response = await fetch(url);
        if(!response.ok) {
            throw new error('Falied to fetch book cover'); 
        }
        const data = await response.json();
        const firstResult = data.docs[0];
        if (!firstResult || !firstResult.cover_i) {
            return "";
        }

        return `https://covers.openlibrary.org/b/id/${firstResult.cover_i}-M.jpg`;
    }
    catch (error) {
        console.log('Kunde inte hämta omslag:', error);
        return "";
    }
}