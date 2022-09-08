import React from 'react'

export const IcoAssignmentReturn = ({style={}, cy=''}) => {
  return (
    <svg className='icon-assignment-return' viewBox="0 0 48 48" style={style} data-cy={`AssignmentReturnIcon${cy}`}>
      <path d="M31.969 30v-7.969h-7.969v-6l-10.031 9.938 10.031 10.031v-6h7.969zM24 6q-0.844 0-1.406 0.563t-0.563 1.406 0.563 1.453 1.406 0.609 1.406-0.609 0.563-1.453-0.563-1.406-1.406-0.563zM37.969 6q1.594 0 2.813 1.219t1.219 2.813v27.938q0 1.594-1.219 2.813t-2.813 1.219h-27.938q-1.594 0-2.813-1.219t-1.219-2.813v-27.938q0-1.594 1.219-2.813t2.813-1.219h8.344q0.656-1.781 2.156-2.906t3.469-1.125 3.469 1.125 2.156 2.906h8.344z"></path>
    </svg>
  )
}