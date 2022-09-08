import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IcoDotsHorizontalTriple, IcoLogo1, IcoMenu } from '../components'
import { setSidebarRigth, setSidebarLeft } from './redux/layoutActions'

export default () => {
  const dispatch = useDispatch()
  const { sidebarLeft, sidebarRight, usuario } = useSelector(state => state.layoutState)
  // const {  } = useSelector(state => state.usuarioState)

  return (
    <header id='box-header'>
      <button
        className={sidebarLeft ? 'btn-menu open' : 'btn-menu'}
        onClick={() => dispatch(setSidebarLeft(!sidebarLeft))}
      >
        <IcoMenu cy='davi' />
      </button>
      <div className='box-logo'>
        <div><IcoLogo1 /></div> <h1>PAINEL ADM</h1>
      </div>
      <button
        className={sidebarRight ? 'btFlex open' : 'btFlex '}
        onClick={() => (dispatch(setSidebarRigth(!sidebarRight)))}
      >
        {usuario.nome? <>{usuario.nome} <IcoDotsHorizontalTriple /></>: <IcoDotsHorizontalTriple />}
      </button>
    </header>
  )
}
