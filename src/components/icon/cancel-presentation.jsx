import React from 'react'

export const IcoCancelPresentation = ({style={}, cy=''}) => {
  return (
    <svg className='icon-cancel-presentation' viewBox="0 0 48 48" style={style} data-cy={`CancelPresentationIcon${cy}`}>
      <path d="M29.156 16.031l2.813 2.813-5.156 5.156 5.156 5.156-2.813 2.813-5.156-5.156-5.156 5.156-2.813-2.813 5.156-5.156-5.156-5.156 2.813-2.813 5.156 5.156zM42 6q1.594 0 2.813 1.219t1.219 2.813v27.938q0 1.594-1.219 2.813t-2.813 1.219h-36q-1.594 0-2.813-1.219t-1.219-2.813v-27.938q0-1.594 1.219-2.813t2.813-1.219h36zM42 38.156v-28.125h-36v28.125h36z" />
    </svg>
  )
}