import React from 'react'
const SearchButton = ({handleChange, search}) => {
  
    return (
      <form onSubmit={search}>
        <input 
          onChange = {handleChange}
        />
        <button type = 'submit'>Search</button>
      </form>
    )
}

export default SearchButton;
