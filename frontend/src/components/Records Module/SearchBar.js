import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';

export default function SearchBar (props) {
       
    const handleFilterTextChange = (e) => {
      props.onFilterTextChange(e.target.value);
    }
    

      return (
        <form>
          <div className="row">
        <FontAwesome.FaSearch size={props.size} />
            <input
              type="text"
              placeholder={props.placeholder}
              className="searchInput"
              value={props.filterText}
              onChange={handleFilterTextChange}
              style={{width: props.width}}
            />
          </div>
        </form>
      );
    }