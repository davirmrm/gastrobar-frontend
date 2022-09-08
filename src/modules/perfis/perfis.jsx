import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Checkbox,
  IcoBin,
  IcoClose,
  IcoPencil,
  IcoSearch,
  Input,
  List,
  Paginate,
  Select
} from '../../components'

import {
  campoPesquisaLimpar,
  modalEditar,
  modalNovo,
  modalRemover,
  listarPerfis,
  handleCampoPesquisa
} from './redux/perfisActions'
import NovoEditar from './perfisNovoEditar'
import Remover from './perfisRemover'
import './perfis.scss'
import Filtros from './filtros'
import SidebarRight from '../../layout/sidebarRight'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  
  const {modalStatus, campoPesquisa, perfis} = useSelector(state => state.perfisState)
  const [sidebar, setSidebar] = useState(false)
  const [actionCheck, setActionCheck] = useState({})

  useEffect(() => {
    dispatch(listarPerfis())
  }, [modalStatus])

  const handleCheckboxActionAll = e => {
    let checkAll = {}
    perfis.map(p=> {
      checkAll = {...checkAll, [p.id?p.id:p.profile_id]: e}
    })
    setActionCheck({...checkAll, all: e})
  }

  const listAcoes = [
    {
      id: 'ativar',
      name: 'Ativar'
    },
    {
      id: 'inativar',
      name: 'Inativar'
    }
  ]

  const nSelecionados = e => {
    let numeroS = 0
    Object.keys(e).map(n=> {
      numeroS =  n !== 'all' && e[n] === true ? numeroS + 1 : numeroS
    })
    return numeroS
  }

  const headDefault = [
    {
      column: 'selecione',
      text: <>
        <Checkbox
          label=''
          name='all'
          action={a => handleCheckboxActionAll(a)}
          checked={actionCheck.all}
          text=''
          cy='formPlataformStatus'
        />
        {
          nSelecionados(actionCheck) ?
          <div className='select-action-list'>
            <Select
              name='acoes'
              action={e => handleCheckboxActionAll(false)}
              options={listAcoes}
              selectedItem={false}            
              textCustom={['Ações']}
              selected={''}
              optionCustom={e=> (<><span className={e.id}></span> {e.name}</>)}
              cy='AcoesList'
            />
            <span>
              {`${nSelecionados(actionCheck)} ${nSelecionados(actionCheck) > 1 ? 'itens selecionados' : 'item selecionado'}`} 
            </span>
          </div>
          :null
        }
      </>,
      className: 'actions'
    },
    {
      column: 'profile_id',
      text: 'ID',
      className: 'actions'
    },
    {
      column: 'name',
      text: 'Nome',
      className: ''
    },
    {
      column: 'plataformName',
      text: 'Plataforma',
      className: ''
    },
    {
      column: 'rulesList',
      text: 'Permissões',
      className: ''
    },
    {
      column: 'statusCustom',
      text: '',
      className: 'actions'
    },
    {
      column: 'acoes',
      text: '',
      className: 'actions'
    }
  ]

  const pesquisarPerfis = e => {
    console.log(e, 'pesquisarPerfis')
  }

  return (
    <>
      <div className='box-perfis'>
        <div className='box-titulo'>
          <h2 className='titulo'>{nls.title}</h2>
          <Button color='primary' type='btn' size='small' 
            onClick={() => dispatch(modalNovo('novo'))} 
            title='Novo'
            cy='AdicionarPerfil'
          >
            Adicionar
          </Button>
        </div>
        <div className='box-content-list'>
          <div className='box-pesquisa'>
            <div>
              <Input label='' name='input' 
                action={e => dispatch(handleCampoPesquisa(e))} 
                value={campoPesquisa}
                cy='pesquisarPerfis'
                placeholder='Procurar...'
                right={
                  <>
                    {campoPesquisa ? (
                      <Button type='link' 
                        onClick={e => dispatch(campoPesquisaLimpar())} title='Limpar'
                        cy='LimparCampoPesquisaPerfil'
                      >
                        <IcoClose />
                      </Button>
                    ) : null}

                    <Button
                      onClick={e => pesquisarPerfis(campoPesquisa)}
                      title={nls.pesquisar}
                      type='link'
                      disabled={campoPesquisa ? false : true}
                      cy='PesquisarPerfil'
                    >
                      <IcoSearch />
                    </Button>
                  </>
                }
              />
            </div>
            {/* <div>
              <Button color='default' type='btn' onClick={() => setSidebar(true)} title='Novo'>
                <IcoFilters cy='FiltrosUsuario' /> Filtrar
              </Button>
            </div> */}
          </div>
          <List
            header={headDefault}
            data={perfis}
            cy='tablePerfis'
            listCustom={(e) => {
              const custom = e
              custom.selecione = <Checkbox
                label=''
                name='status'
                action={a => setActionCheck({...actionCheck, [e.id?e.id:e.profile_id]: !actionCheck[e.id?e.id:e.profile_id]})}
                checked={actionCheck?.[e.id?e.id:e.profile_id]}
                text=''
                cy='formPerfilAcao'
              />
              custom.statusCustom = <Checkbox
                label=''
                type='switch'
                name='status'
                // action={a => dispatch(changeInformacao(a))}
                checked={e.is_active}
                text=''
                cy='formPerfilStatus'
              />
              custom.plataformName = e.platform?.name?e.platform?.name:e.platform
              custom.rulesList = e.rules?.map(r=> <p key={`rule-${r.id}`}>{r.name}</p>)
              custom.acoes = (
                <div className='acoes'>
                  <Button color='primary' type='btn circle' onClick={() => dispatch(modalEditar(e))} title='Editar' cy='EditarPerfil'>
                    <IcoPencil cy='EditarPerfil' />
                  </Button>
                  {/* <Button color='danger' type='btn circle' onClick={() => dispatch(modalRemover(e))} title='Remover' cy='RemovePerfil'>
                    <IcoBin cy='RemovePerfil' />
                  </Button> */}
                </div>
              )
              return custom
            }}
          />
          <Paginate
            data={{ 
              pageNumber: 0, 
              totalPages: 1, 
              totalElements: perfis.length 
            }}
          />
        </div>
        <SidebarRight 
          style={{minWidth: '300px', height: '100%'}} 
          sidebarRight={sidebar} 
          setSidebarRigth={(e) => setSidebar(e)} 
        >
          <Filtros acaoFiltros={(e) => setSidebar(e)} />
        </SidebarRight>
      </div>
      <NovoEditar />
      <Remover />
    </>
  )
}
