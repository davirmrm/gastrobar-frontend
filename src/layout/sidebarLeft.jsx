import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, IcoEmbed, IcoLogo, IcoLogOut, IcoMala, IcoTree, IcoUser2, Menu } from '../components'

import { modalOpen } from './redux/layoutActions'

export default ({ style }) => {
  const dispatch = useDispatch()
  const {sidebarLeft, preferencias, usuario} = useSelector(state => state.layoutState)
  // const nlsMenu = require(`./nlsMenu/menu-${preferencias.language.id}.json`)

  const nlsMenu = {
    "menu": [
      { "id": "colaboradores", "label": "Colaboradores", "go": "/colaboradores", "icon": <IcoUser2 /> },
      { "id": "empresas", "label": "Empresas", "go": "/empresas", "icon": <IcoTree /> },
      { "id": "perfis", "label": "Perfis", "go": "/perfis", "icon": <IcoMala /> },
      { "id": "plataformas", "label": "Plataformas", "go": "/plataformas", "icon": <IcoEmbed /> }
    ],
    "menuGestor": [
    ],
    "menus": [
    ]
  }
  const [menuDash, setMenuDash ] = useState()
  
  useEffect(()=> {
    setMenuDash(nlsMenu.menu)
    if (usuario.perfil) {
      criarMenu()
    }
  }, [preferencias])

  useEffect(()=> {
    if (usuario.perfil) {
      criarMenu()
    }
  }, [dispatch, usuario.perfil])

  const criarMenu = (e) => {
    usuario.perfil.map(e=> {
      if (e.toLowerCase() === 'gestor') {
        setMenuDash([...nlsMenu.menu, ...nlsMenu.menuGestor])
      }
      if (e.toLowerCase() === 'atendente') {
        setMenuDash([...nlsMenu.menu, ...nlsMenu.menuAtendente])
      }
    }) 
  }
  
  return (
    <div id='box-sidebar-left' className={sidebarLeft ? 'open-sidebar' : ''} style={style}>
      <div className='box-logo'>
        <div><IcoLogo /></div> <h1>PAINEL ADM</h1>
      </div>
      <Menu data={menuDash} />
      
      <div className='sair-sistema'>
        <Button color='default' type='link' onClick={() => dispatch([modalOpen('sair')])}>
          <IcoLogOut /> Sair
        </Button>
      </div>
    </div>
  )
}
