import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Select } from '../../components'
import nls from './nls/pt-BR.json'

import './colaboradores.scss'
import { listarProviders } from '../empresas/redux/empresasActions'
import { listarPlataformas } from '../plataformas/redux/plataformasActions'
import { listarPerfis } from '../perfis/redux/perfisActions'
import { changeInformacaoFilter } from './redux/colaboradoresActions'

export default ({acaoFiltros = () => null}) => {
  const dispatch = useDispatch()
  
  const {filter} = useSelector(state => state.colaboradoresState)
  const {providers} = useSelector(state => state.empresasState)
  const {plataformas} = useSelector(state => state.plataformasState)
  const {perfis} = useSelector(state => state.perfisState)
  
  useEffect(() => {
    dispatch([
      listarProviders(),
      listarPlataformas(),
      listarPerfis()
    ])
  }, [])

  // optionLabel = 'name',
  // optionValue = 'id',
  return (
    <div className='box-filter-colaboradores'>
      <Select
        label='Empresas'
        name='providers'
        action={e => dispatch(changeInformacaoFilter(e))}
        options={providers}
        selected={filter.providers}
        multiSelect
        closeOnSelect={false}
        // optionLabel='nome'
        cy='FilterFormUsuarioProviders'
        // filter={{
        //   clean: <IcoClose />,
        //   text: <IcoSearch />,
        //   title: 'Filtrar'
        // }}
      />
      <Select
        label='Plataformas'
        name='plataformas'
        action={e => dispatch(changeInformacaoFilter(e))}
        options={plataformas}
        selected={filter.plataformas}
        multiSelect
        closeOnSelect={false}
        cy='FilterFormUsuarioPlataformas'
        // filter={{
        //   clean: <IcoClose />,
        //   text: <IcoSearch />,
        //   title: 'Filtrar'
        // }}
      />
      <Select
        label='Perfils'
        name='perfis'
        action={e => dispatch(changeInformacaoFilter(e))}
        options={perfis}
        selected={filter.perfis}
        multiSelect
        closeOnSelect={false}
        // optionLabel='nome'
        cy='FilterFormUsuarioCargos'
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
          cy={`filterUsuariiosAplicar`}
        >
            Aplicar
        </Button>
      </div>
    </div>
  )
}
