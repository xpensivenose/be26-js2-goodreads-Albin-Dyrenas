export async function getBookCover(title, author) {
    try{
        const url = `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(title)}&author_name=${encodeURIComponent(author)}`;
        const response = await fetch(url);
        if(!response.ok) {
            throw new error('Falied to fetch book cover'); 
        }
        const data = await response.json();
        return data.url;
    }
    catch (error) {
        throw error; 
    }
}