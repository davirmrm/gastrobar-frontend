import React from 'react'

export const IcoEmbed = ({style={}, cy=''}) => {
  return (
    <svg className="icon-embed" viewBox="0 0 40 32" style={style} data-cy={`IcoEmbed${cy}`}>
     <path d="M26 23l3 3 10-10-10-10-3 3 7 7z"></path>
      <path d="M14 9l-3-3-10 10 10 10 3-3-7-7z"></path>
      <path d="M21.916 4.704l2.171 0.592-6 22.001-2.171-0.592 6-22.001z"></path>
    </svg>
  )
}
