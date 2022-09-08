import React from 'react'

export const IcoCheck = ({style={}, cy=''}) => {
  return (
    <svg 
    className="icon-check" 
    style={style}
    width="14" 
    height="14" 
    viewBox="0 0 14 14"
    data-cy={`CheckIcon${cy}`}
    >
    <g id="Grupo_876" data-name="Grupo 876" transform="translate(741 -359)">
      <circle id="Elipse_13" data-name="Elipse 13" cx="7" cy="7" r="7" transform="translate(-741 359)" fill="#2bd798"/>
      <g id="check_2_" data-name="check (2)" transform="translate(-738.123 363)">
        <path id="Caminho_386" data-name="Caminho 386" d="M8,56.6l-4.35,4.35a.825.825,0,0,1-1.167,0L.241,58.7a.825.825,0,0,1,1.167-1.167L3.07,59.2l3.766-3.766A.825.825,0,0,1,8,56.6Z" transform="translate(0 -55.188)" fill="#fff"/>
      </g>
    </g>
  </svg>
  )
}