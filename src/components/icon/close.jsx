import React from 'react'

export const IcoClose = ({style={}, cy=''}) => {
  return (
    <svg 
    className='icon-close' 
    viewBox="0 0 24 24" 
    style={style}
    data-cy={`CloseIcon${cy}`}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
    </svg>
  )
}