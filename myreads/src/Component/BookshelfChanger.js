import React, {Component, useState} from 'react'

 function Bookshelfchanger({shelf, onMove, book}) {
const [value, setValue]= useState(shelf);
      const  handleChange = event => {
        setValue(event.target.value)
          onMove(book, event.target.value);
        };
          return (
            <div className="book-shelf-changer">
              <select value={value} onChange={handleChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          );
        }
      
      

export default Bookshelfchanger