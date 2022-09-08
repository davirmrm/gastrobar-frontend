import React from 'react'
import { history } from '../../helpers/history'
import nls from './nls/pt-BR.json'
import info from '../utils/info.json'
import infoLogo from '../utils/logo.png'

import './sobre.scss'
import { IcoMenu, Menu } from '../../components'
import { setSidebarLeft } from '../../layout/redux/layoutActions'
import { useDispatch, useSelector } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const { sidebarLeft } = useSelector(state => state.layoutState)

  const menu = [
    {
      id: 'home',
      label: 'Programação'
    },
    {
      id: 'cardapio',
      label: 'Cardápio'
    }
  ]
  const menuHandle = e =>{
    console.log(e, 'menuHandle');
    history.push(e.id === 'home' ? '/' : e.id)
  }

  return (
    <>
      <header id='box-header'>
        <div className='menu-header-btn'>
          <button
            className={sidebarLeft ? 'btn-menu open' : 'btn-menu'}
            onClick={() => dispatch(setSidebarLeft(!sidebarLeft))}
          >
            <IcoMenu />
          </button>
        </div>
     
        <div className='box-logo'>
          <div><img src={infoLogo} title={info?.nome} /></div> <h1>{info?.nome}</h1>
        </div>

        <div />
      </header>
      <div className='box-public-sobre'>
        <div className={sidebarLeft?'menu-sobre open':'menu-sobre'}>
          <Menu data={menu} action={e=> menuHandle(e)} />
        </div>
        <div className='box-sobre'>
          <div className='info-sobre'>
            <h2>Sobre</h2>
            <div dangerouslySetInnerHTML={{__html: info.sobre}} />
          </div>
        </div>
      </div>
    </>
  )
}
