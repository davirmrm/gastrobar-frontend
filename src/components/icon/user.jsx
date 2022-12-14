import React from 'react'

export const IcoUser = ({style={}, cy=''}) => {
  return (
    <svg className='icon-user' viewBox="0 0 16 16" style={style} data-cy={`UserIcon${cy}`}>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
    </svg>
  )
}