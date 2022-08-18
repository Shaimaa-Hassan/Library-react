import './App.css';
import ListBooks from './Component/ListBooks';
import SearchBooks from './Component/SearchBooks';
import React, { Component, useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './Component/BooksAPI';
import getAll from './Component/data';
// import axios from 'axios';


function App() {
// const[books, setBooks]=useState(getAll);
// console.log(books);
  const[bookshelves, setBookshelves]= useState([ 
    { key: 'currentlyReading', name: 'Currently Reading' },
   { key: 'wantToRead', name: 'Want to Read' },
   { key: 'read', name: 'Read' }]);
  
  const  [myBooks, setMyBooks]=useState([]);//(getAll)
  const  [searchBooks, setSearchBooks ]=useState([]);
  const  [error, setError ]=useState(false)

  useEffect(()=>{
    BooksAPI.getAll().then(books => {console.log(books);setMyBooks(books);})
    .catch(err => {console.log(err);setError( true )});},[])
  
  // useEffect(() => {
  //   const getBooks = async () => {
  //     const books = await BooksAPI.getAll();
  //     setMyBooks(books);
  //   };

  //   getBooks();
  // }, []);
////////////////////////////////////////////////////////////////////////////////////////////////////
    const moveBook = (book, shelf) => {
      BooksAPI.update(book, shelf).then(books=>console.log(books)).catch(err => {
        console.log(err);
        setError(true);
      });
      if (shelf === 'none') {
        setMyBooks(myBooks.filter(b => b.id !== book.id));
      } else {
        book.shelf = shelf;
        setMyBooks(myBooks.filter(b => b.id !== book.id).concat(book));
      }
    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////

       const  searchForBooks = debounce(300, query => {
        // console.log(query);
          if (query.length > 0) {
            BooksAPI.search(query).then(books => {
              // console.log(books);
              if (books.error) {
               setSearchBooks([]);
              } else {
               setSearchBooks(books);
              }
            });
          } else {
            setSearchBooks([]);
          }
        });

////////////////////////////////////////////////////////////////////////////////////////////////

      const  resetSearch = () => {
          setSearchBooks([]);
        };
  
      if(error){
        return <div>Network error. Please try again later.</div>;
      }
  return (
    <Routes>
    <Route exact path="/"
         element={
            <ListBooks bookshelves={bookshelves} books={myBooks}
              onMove={moveBook}  />  }/>
        <Route path="/search" element={ <SearchBooks searchBooks={searchBooks} 
         myBooks={myBooks}  onSearch={searchForBooks}  onMove={moveBook}
         onResetSearch={resetSearch}  /> }  />
    </Routes>
  );
}

export default App;
