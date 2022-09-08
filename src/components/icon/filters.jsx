import React from 'react' 

export const IcoFilters = ({style={}, cy=''}) => {
  return (
    <svg 
    width="14" 
    height="16" 
    viewBox="0 0 14 16" 
    style={style}
    data-cy={`IconFilters${cy}`}>
    <path d="M0.25 12.2566V13.9593H4.75V12.2566H0.25ZM0.25 2.04035V3.74305H7.75V2.04035H0.25ZM7.75 15.662V13.9593H13.75V12.2566H7.75V10.5539H6.25V15.662H7.75ZM3.25 5.44575V7.14846H0.25V8.85116H3.25V10.5539H4.75V5.44575H3.25ZM13.75 8.85116V7.14846H6.25V8.85116H13.75ZM9.25 5.44575H10.75V3.74305H13.75V2.04035H10.75V0.337646H9.25V5.44575Z" fill='currentColor'/>
    </svg>

  )
}
