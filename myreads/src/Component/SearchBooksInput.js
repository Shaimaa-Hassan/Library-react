import React, {Component, useState} from 'react'

function SearchBooksInput({onSearch}) {
const[value, setValue]=useState('');

const handleChange = event => {
  setValue(event.target.value);
     onSearch(event.target.value);
};

return (
  <div className="search-books-input-wrapper">
    <input
      type="text"
      value={value}
      placeholder="Search by title or author"
      onChange={handleChange}
      autoFocus
    />
  </div>
);

}
export default SearchBooksInput