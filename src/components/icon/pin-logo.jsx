import React from 'react'

export const IcoPinLogo = ({style={}, cy}) => {
  return (
    <svg className='icon-pin-logo' viewBox="0 0 37.8 51.9" style={style} data-cy={`PinLogoIcon${cy}`}>
      <polygon points="26.6,23.3 18.9,35.4 11.2,23.3 0.7,23.3 18.9,51.9 37,23.3 " fill='#000' />
      <path d="M0,19.6h9.8c0-0.2,0-0.5,0-0.7c0-5,4.1-9.1,9.1-9.1c5,0,9.1,4.1,9.1,9.1c0,0.2,0,0.5,0,0.7h9.8
          c0-0.2,0-0.5,0-0.7c0-5-2-9.8-5.5-13.4C28.7,2,23.9,0,18.9,0c-5,0-9.8,2-13.4,5.5C2,9.1,0,13.8,0,18.9" fill='#793EAD'/>
    </svg>
  )
}
