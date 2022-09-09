import React from 'react'
import { history } from '../../helpers/history'
import nls from './nls/pt-BR.json'
import info from '../utils/info.json'
import infoLogo from '../utils/logo.png'

import './cardapio.scss'
import { Menu, IcoMenu, Loading } from '../../components'
import { loading, modalOpen, setSidebarLeft } from '../../layout/redux/layoutActions'
import { useDispatch, useSelector } from 'react-redux'
import Detalhar from './detalhar'
import { detalharProduto, setDetalharProduto } from './redux/cardapioActions'

export default () => {
  const dispatch = useDispatch()
  const { sidebarLeft, load } = useSelector(state => state.layoutState)
  
  const menu = [
    {
      id: 'home',
      label: 'Programação'
    },
  ]

  const menuHandle = e =>{
    console.log(e, 'menuHandle');
    dispatch(setSidebarLeft(!sidebarLeft))
    history.push(e.id === 'home' ? '/' : e.id)
  }

  const menuHandleItens = e =>{
    console.log(e, 'menuHandleItens');
    location.href = `#${e.id}`;
    dispatch(setSidebarLeft(!sidebarLeft))
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
      <div className='box-public-cardapio'>
        <div className={sidebarLeft?'menu-cardapio open':'menu-cardapio'}>
          <Menu data={menu} action={e=> menuHandle(e)} />
          <div className="menu">
            {
              info?.cardapio?.map(e=> <button onClick={()=> menuHandleItens(e)} key={`menu-btn-${e.id}`}>{e.title}</button>)
            }
          </div>
        </div>
        <div className='box-cardapio'>
          <div className='info-cardapio'>
            <h2>Cardápio</h2>
            {
              info?.cardapio?.map(cardapio=> {
                return <div key={`cardapio-grupo-${cardapio.id}`} id={cardapio.id}>
                  {cardapio?.img?<div className='info-cardapio-img'>
                    <img src={cardapio.img} title={cardapio.title} />
                  </div>:null}
                  <h3>{cardapio.title}</h3>
                {
                  cardapio?.itens?.map((iten, i)=> {
                    return (
                      <div className='cardapio-info' key={`cardapio-${iten.id}-${i}`} onClick={()=> dispatch(detalharProduto(iten))}>
                        {iten?.img?<div className='cardapio-info-img'>
                          <img src={iten.img} title={iten.label} />
                        </div>:null}
                        <div className='cardapio-info-content'>
                          <h4>{iten.label}</h4>
                          <div className='cardapio-info-desc' dangerouslySetInnerHTML={{__html: iten.descricaoBreve}} />
                          <div className='cardapio-info-preco'>
                            <span>+</span>
                            <span>{iten.preco}</span>                             
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                </div>
              })
            }
            <p>Copyright © 2020 Buggin IT solution Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
      <Detalhar />
      {load?<Loading />:null}
    </>
  )
}
