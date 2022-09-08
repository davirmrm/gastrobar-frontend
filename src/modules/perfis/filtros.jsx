import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, IcoClose, Select } from '../../components'
import nls from './nls/pt-BR.json'

import './perfis.scss'

export default ({acaoFiltros = () => null}) => {
  const dispatch = useDispatch()
  
  const {campoPesquisa, usuarios, usuario} = useSelector(state => state.usuariosState)

  return (
    <div className='box-filter'>
      <div className='box-filter-title'>
        <h3>Filtros</h3>
        <Button type='link' 
          onClick={() => acaoFiltros(false)} 
          title='Fechar' 
          cy={`filterUsuariiosClose`}
        >
          <IcoClose cy={`filterUsuariios`}/>
        </Button>
      </div>
      <Select
        label='Provider'
        name='provider'
        action={e => null}
        options={[]}
        selected={''}
        closeOnSelect={false}
        cy='formUsuarioStatus'
        // filter={{
        //   clean: <IcoClose />,
        //   text: <IcoSearch />,
        //   title: 'Filtrar'
        // }}
      />
      <Select
        label='Plataformas'
        name='plataformas'
        action={e => null}
        options={[]}
        selected={''}
        multiSelect
        closeOnSelect={false}
        cy='formUsuarioStatus'
        // filter={{
        //   clean: <IcoClose />,
        //   text: <IcoSearch />,
        //   title: 'Filtrar'
        // }}
      />
      <Select
        label='Perfil'
        name='perfil'
        action={e => null}
        options={[]}
        selected={''}
        multiSelect
        closeOnSelect={false}
        cy='formUsuarioPerfil'
        // filter={{
        //   clean: <IcoClose />,
        //   text: <IcoSearch />,
        //   title: 'Filtrar'
        // }}
      />
      <div className='btn-box'>
        <Button color='primary'
          size='block' 
          onClick={() => acaoFiltros(false)}  
          title='Aplicar' 
          cy={`filterUsuariiosClose`}
        >
            Aplicar
        </Button>
      </div>
    </div>
  )
}
