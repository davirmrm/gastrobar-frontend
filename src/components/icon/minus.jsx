import React from 'react'

export const IcoMinus = ({style={}, cy}) => {
  return (
    <svg className='icon-minus' viewBox="0 0 48 48" style={style} data-cy={`MinusIcon${cy}`}>
      <path d="M10 26h28c1.104 0 2-0.896 2-2s-0.896-2-2-2h-28c-1.104 0-2 0.896-2 2s0.896 2 2 2z"></path>
    </svg>
  )
}
