import React from 'react'

export const IcoMenu = ({style={}, cy=''}) => {
  return (
    <svg className='icon-menu' viewBox='0 0 48 48' style={style} data-cy={`IcoMenu${cy}`}>
      <path d='M0 6h40v4h-40v-4zM0 18h40v4h-40v-4zM0 30h40v4h-40v-4z'></path>
    </svg>
  )
}
