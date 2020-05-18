import React from 'react';


const getHighlightedSearchTerm = (text, searchTerm) => {
    const index = text.toLowerCase().indexOf(searchTerm)
    return (
        <React.Fragment>
            {text.slice(0, index)}
            <span className='highlighted'>{text.slice(index, index + searchTerm.length)}</span>
            {text.slice(index + searchTerm.length)}
        </React.Fragment>
    )
}
  


const ListItem = ({text, searchTerm , handleItemClick}) => (
    <div onClick={() => handleItemClick(text)} className='list-item'>
    {searchTerm ? getHighlightedSearchTerm(text,searchTerm) : text}
    </div>
)

export default ListItem