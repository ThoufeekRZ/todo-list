import React from 'react';
import LineItem from './LineItem';

const ItemList = ({items,handleClick,handleChange}) => {
  return (
    <ul>
        {items.map((item) => (
        <LineItem 
        item={item}
        key={item.id}
        handleClick={handleClick}
        handleChange={handleChange}
        />
        ))}
      </ul>
  )
}

export default ItemList