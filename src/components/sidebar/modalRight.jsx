import React, { useRef } from 'react'
import { Button } from '../button/button';
import { IcoClose } from '../icon/close';
import Portal from '../portal/portal'
import useOutsideClick from '../useOusideClick/useoutsideclick'
import './sidebar.scss';

export const ModalRight = ({
  title='',
  children,
  open = false,
  style = { width: '260px' },
  action= ()=> null,
}) => {

  const ref = useRef()
  useOutsideClick(ref, (e, r) => {
    if (open && !r) {
      action(e)
    }
  })

  return (
    <Portal name="modal-sidebar">
      <div
        id='box-modal-sidebar-right'
        ref={ref}
        className={open ? 'open-modal-sidebar' : ''}
        style={style}
      >
        <div className='box-modal-sidebar-title'>
          <h3>{title}</h3>
          <Button type='link' 
            onClick={() => action(false)} 
            title='Fechar' 
            cy={`filterUsuariiosClose`}
          >
            <IcoClose cy={`filterUsuariios`}/>
          </Button>
        </div>
        {children}
      </div>
    </Portal>
  )
}
