
import React from 'react'

export const IcoLoadingLogo = ({style={}, cy=''}) => {

  const css = `
    .a,.b{
      fill:transparent;
      stroke-width:1px;
      stroke-dasharray:572;
      stroke-dashoffset:572;
    }
    .a{
        stroke:#793EAD; 
        animation:StrokeLine 2s ease reverse infinite, Fill1 2s cubic-bezier(0.71, -1.06, 0.3, 1) infinite;
    }
    .b{
        stroke:#fff;
        animation:StrokeLine 2s ease reverse infinite, Fill2 2s cubic-bezier(0.71, -1.06, 0.3, 1) infinite;
    }
    @keyframes StrokeLine{
        0%{
            stroke-dashoffset:0;
        }                
    }            
    @keyframes Fill1{
        100%{
            fill:#793EAD;                
        }                
    }
    @keyframes Fill2{
        100%{
            fill:#fff;                
        }                
    }
  `;

  return (
        <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      height="40"
      width="40"
      viewBox="0 0 37.8 51.9"
      xmlSpace="preserve"
      data-cy={`LoadingIcon${cy}`}
    >
    <defs>
        <style>{css}</style>
    </defs>
    <path className="a"
      d="M0,19.6h9.8c0-0.2,0-0.5,0-0.7c0-5,4.1-9.1,9.1-9.1c5,0,9.1,4.1,9.1,9.1c0,0.2,0,0.5,0,0.7h9.8
          c0-0.2,0-0.5,0-0.7c0-5-2-9.8-5.5-13.4C28.7,2,23.9,0,18.9,0c-5,0-9.8,2-13.4,5.5C2,9.1,0,13.8,0,18.9"
    />
      <polygon className="b" points="26.6,23.3 18.9,35.4 11.2,23.3 0.7,23.3 18.9,51.9 37,23.3 " />
    </svg>
  )
}