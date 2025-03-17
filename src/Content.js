import React from 'react';
import ItemList from './ItemList';


const Content = ({items,handleClick,handleChange}) => {

 

  return (
    <>
   {(items.length)?(
    <ItemList 
    items={items}
    handleClick={handleClick}
    handleChange={handleChange}
    />
   )
   : <p>There are no item in your list</p>
}
    </>
  )
}

export default Content
