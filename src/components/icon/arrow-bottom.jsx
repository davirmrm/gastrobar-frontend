import React from 'react'

export const IcoArrowBottom = ({style={}, cy=''}) => {
  return (
  <svg 
  className='icon-eye' 
  stroke="currentColor" 
  fill="currentColor" 
  viewBox="0 0 24 24" 
  style={style} 
  data-cy={`ArrowBottomIcon${cy}`}>
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
  </svg>
  )
}