import React from "react";
import AppBar from "../Components/AppBar";
import StarRating from "../Components/StarRating";
import "../styles/Dashboard.css";
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import Shuffle from "../assets/shuffle.svg";

function Dashboard() {
    const [selectedTab, setSelectedTab] = useState('Upcoming Books'); // Add this line
    const { userDetails } = useContext(UserContext);
    const APIKEY = "AIzaSyBlkjVx_pktQUW2-wYWi4ErtOR1Ik7zDIY"
    const [books, setBooks] = useState([]);
    const [catalogueBooks, setCatalogueBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('relevance');
    const [page, setPage] = useState(1);
    const booksPerPage = 10;
    const [inputValue, setInputValue] = useState('');
    const [reviewBook, setReviewBook] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
    console.log("Selected Rating: ", newRating); // You can remove this line later
  };

    useEffect(() => {
        const fetchPromises = userDetails.currentRecommendations.map(isbn => {
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${APIKEY}`;
            return fetch(apiUrl).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
        });

        Promise.all(fetchPromises).then(data => {
            const books = data.map(response => response.items[0]);
            setBooks(books);
        }).catch(error => {
            console.error(error);
        });
    }, [userDetails, APIKEY]);

    useEffect(() => {
        if (selectedTab === 'Catalogue') {
            const startIndex = (page - 1) * booksPerPage;
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&orderBy=${sortOption}&startIndex=${startIndex}&maxResults=${booksPerPage}&printType=books&country=UK&key=${APIKEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.items) {
                        console.log(data.items);
                        setCatalogueBooks(data.items);
                    } else {
                        setCatalogueBooks([]);
                    }
                })
        }
    }, [selectedTab, searchQuery, sortOption, page]);


    return <div>
        <AppBar transparent={false} />
        <div className="dashboard-page">
            <div className="dashboard-menu">
                {['Upcoming Books', 'Book History', 'Catalogue', 'Your Book Reviews'].map(tab => (
                    <button
                        key={tab}
                        className={`dashboard-menu-button ${selectedTab === tab ? 'active' : ''}`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="dashboard-books">
                {selectedTab === 'Upcoming Books' && books.map((book, index) => (
                    <div key={index} className="book-container">
                        <img src={book.volumeInfo.imageLinks?.smallThumbnail || 'default-image.jpg'} alt="Book Cover" className="book-cover"/>
                            <div className="book-details">
                                <p className="book-title">{book.volumeInfo.title}</p>
                                <p className="book-info">{book.volumeInfo.authors} ({book.volumeInfo.publishedDate})</p>
                                <p className="book-description">{book.volumeInfo.description.substring(0, 170) + '...'}</p>
                            </div>
                            <img src={Shuffle} alt="Shuffle" className="shuffle"/>
                    </div>
                ))}
                {selectedTab === 'Catalogue' && (
                <div className="catalogue">
                    <form onSubmit={e => { e.preventDefault(); setSearchQuery(inputValue); }} className="search-form">
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Search books..." className="search-input"/>
                        <button type="submit" className="search-button" value="Search">Search</button>
                    </form>
                    <div className="sorting-options">
                        <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="sort-select">
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                    <div className="catalogue-books-container">
                        {catalogueBooks.map((book, index) => (
                            <div key={index} className="catalogue-book-container">
                                <img src={book.volumeInfo.imageLinks?.smallThumbnail || 'default-placeholder-image.jpg'} alt="Book Cover" className="catalogue-book-cover"/>
                                <div className="catalogue-book-details">
                                    <p className="catalogue-book-title">{book.volumeInfo.title}</p>
                                    <p className="catalogue-book-info">{book.volumeInfo.authors?.join(', ')} ({book.volumeInfo.publishedDate})</p>
                                </div>
                                <button className="catalogue-book-button" onClick={() => { setSelectedTab("Review Book"); setReviewBook(book); }}>I have read this book</button>
                            </div>
                        ))}
                    </div>
                    <div className="pagination-controls">
                        <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} className="page-button">Previous</button>
                        <button onClick={() => setPage(prevPage => prevPage + 1)} className="page-button">Next</button>
                    </div>
                </div>
            )}
            {selectedTab === 'Review Book' && ( 
                <div className="review-book-container">
                    <p>{reviewBook.volumeInfo.title}</p>
                    <StarRating onRatingChange={handleRatingChange} />
                    <p>{selectedRating}</p>
                </div>
            )}
            </div>
        </div>
    </div>
}

export default Dashboard;