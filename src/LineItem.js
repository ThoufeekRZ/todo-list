import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({item,handleClick,handleChange}) => {
  return (
    <li className='item'>
    <input type="checkbox"
      onChange={() => handleChange(item.id)}
      checked={item.checked} />

    <label 
    style={(item.checked)?{textDecoration:'line-through'}:null}
    onDoubleClick={() => handleChange(item.id)}>
      {item.content}
    </label>

    <FaTrashAlt
      role='button'
      tabIndex="0"
      onClick={() => handleClick(item.id)}
      aria-label={`Delete ${item.item  }`}
    />
  </li>
  )
}

export default LineItem