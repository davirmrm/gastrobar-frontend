import React from 'react'
import { history } from '../../helpers/history'
import nls from './nls/pt-BR.json'
import info from '../utils/info.json'
import infoLogo from '../utils/logo.png'

import './home.scss'
import { IcoDotsHorizontalTriple, IcoLogo1, IcoMenu, Menu } from '../../components'
import { setSidebarLeft } from '../../layout/redux/layoutActions'
import { useDispatch, useSelector } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const { sidebarLeft } = useSelector(state => state.layoutState)

  const menu = [
    {
      id: 'sobre',
      label: 'Sobre'
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

  let index = 0;
  const handleImg = increase => {
    let liEls = document.querySelectorAll('ul li');
    index = index + Number(increase);
    index = Math.min(Math.max(index,0), liEls.length-1);
    console.log(increase, liEls, 'liElsliElsliElsliElsliElsliElsliElsliElsliElsliElsliElsliEls', index);
    liEls[index].scrollIntoView({behavior: 'smooth'});

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
      <div className='box-public-home'>
        <div className={sidebarLeft?'menu-home open':'menu-home'}>
          <Menu data={menu} action={e=> menuHandle(e)} />
        </div>
        <div className='box-home'>
          <div className='carrousel-program'>
            <button className='prev' onClick={e=> handleImg(-1)}>&lt;</button>
            <ul>
              {
                info.programacao?.map(e=>{
                  return (
                    <li key={`programacao-${e.id}`}><img className={`img${e.id}`} src={e.img} /></li>
                  )
                })
              }
            </ul>
            <button className='next' onClick={e=> handleImg(+1)}>&gt;</button>
          </div>
        </div>
      </div>
    </>
  )
}
