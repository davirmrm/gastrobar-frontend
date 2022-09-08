import React from 'react'

export const IcoTree = ({style={}, cy=''}) => {
  return (
    <svg className='icon-tree' viewBox="0 0 18 22" style={style} data-cy={`IcoTree${cy}`}>
      <path d="M10.5 8V10H7.5V8H5V6H7.5V0H0.5V6H3V8H0.5V14H3V16H0.5V22H7.5V16H5V14H7.5V12H10.5V14H17.5V8H10.5ZM2.5 2H5.5V4H2.5V2ZM5.5 20H2.5V18H5.5V20ZM5.5 12H2.5V10H5.5V12ZM15.5 12H12.5V10H15.5V12Z" fill="currentColor"/>
    </svg>
    
  )
}