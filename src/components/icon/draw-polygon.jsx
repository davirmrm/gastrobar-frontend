import React from 'react' 

export const IcoDrawPolygon = ({style={}, cy=''}) => {
  return (
    <svg 
    width="20" 
    height="20" 
    viewBox="0 0 15 14" 
    style={style} 
    cy={`DrawPolygonIcon`} 
    fill="currentColor" 
    >
        <path d="M2.08102 9H0.0724945V14H5.09382V12H2.08102V9ZM0.0724945 5H2.08102V2H5.09382V0H0.0724945V5ZM12.1237 12H9.11087V14H14.1322V9H12.1237V12ZM9.11087 0V2H12.1237V5H14.1322V0H9.11087Z"/>
    </svg>
  )
}