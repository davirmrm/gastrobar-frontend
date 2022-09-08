import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, useOutsideClick } from '../components'
import { modalOpen, setSidebarRigth } from './redux/layoutActions'

export default () => {
  const dispatch = useDispatch()
  const {sidebarRight} = useSelector(state => state.layoutState)
  const nls = `./nls/${'pt-BR'}.json`

  const [heigthHeader, setHeigthHeader] = useState(0)
  useEffect(() => {
    // setHeigthHeader(document.getElementById('box-header').offsetHeight)
  }, [])

  const heightApp = { maxHeight: `calc(100vh - ${heigthHeader}px)`, width: '260px', top: `${heigthHeader}px` }

  const ref = useRef()
  useOutsideClick(ref, e => {
    if (sidebarRight) {
      dispatch(setSidebarRigth(false))
    }
  })

  return (
    <div
      id='box-sidebar-right'
      ref={ref}
      className={sidebarRight ? 'open-sidebar' : ''}
      style={heightApp}
    >
      <div>
        <div className='menu'>
          <button onClick={() => dispatch([modalOpen('dados'), setSidebarRigth(false)])}>{nls.meusDados}</button>
          <button onClick={() => dispatch([modalOpen('dadosComplementar'), setSidebarRigth(false)])}>{nls.meusDadosComplementar}</button>
          <button onClick={() => dispatch([modalOpen('senhachange'), setSidebarRigth(false)])}>{nls.mudarSenha}</button>
          
        </div>
        <div className='box-preferencias'>
        </div>
        <div className='sair-sistema'>
          <Button color='primary' size='block' onClick={() => dispatch([modalOpen('sair'), setSidebarRigth(false)])}>
            {nls.sair}
          </Button>
        </div>
      </div>
    </div>
  )
}
