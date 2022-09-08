import React from 'react'

export const IcoListView = ({style={}, cy=''}) => {
  return (
    <svg width="18" style={style} data-cy={`ListViewIcon${cy}`} height="10" viewBox="0 0 18 12" >
    <path d="M0 6H2V4H0V6ZM0 10H2V8H0V10ZM0 2H2V0H0V2ZM4 6H18V4H4V6ZM4 10H18V8H4V10ZM4 0V2H18V0H4Z" fill="currentColor"/>
    </svg>
  )
}
