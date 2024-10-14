import React, {useState} from "react";
import "../App.css";

export default function Bookfinder(){
        const [query, setQuery] = useState('');
        const [books, setBooks] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
      
        const searchBooks = async () => {
          setLoading(true);
          setError(null);
      
          try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=${query}`
            );
            const data = await response.json();
            setBooks(data.items || []); // Ensure it’s an empty array if no items.
          } catch (error) {
            setError('Error fetching data');
          } finally {
            setLoading(false);
          }
        };
      
        const handleSearch = (e) => {
          e.preventDefault();
          if (query.trim()) {
            searchBooks();
          }
        };


    return(
        <>
         <h1>Book Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="book-results">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
          </div>
        ))}
      </div>
        </>
    );
    
};