import React from 'react'

export const IcoArrowBack = ({style={}, cy=''}) => {
  return (
    <svg 
    className='ico-back-arrow' 
    style={style} 
    width="16.001" 
    height="16.001" 
    viewBox="0 0 16.001 16.001" 
    transform="rotate(90)" 
    data-cy={`ArrowBackIcon${cy}`}
    >
      <path id="Caminho_1" data-name="Caminho 1" d="M7.128,8.59,10.8,12.254,14.473,8.59,15.6,9.718l-4.8,4.8L6,9.718Z" transform="translate(-2.8 -3.375)" fill="#a1a9b4"/>
      <path id="Caminho_2" data-name="Caminho 2" d="M0,0H16V16H0Z" fill="none"/>
    </svg>
  )
}
