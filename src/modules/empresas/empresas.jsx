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
  listarProviders,
  pesquisarProviders,
  handleCampoPesquisa
} from './redux/empresasActions'
import NovoEditar from './empresasNovoEditar'
import Remover from './empresasRemover'
import './empresas.scss'
import Filtros from './filtros'
import SidebarRight from '../../layout/sidebarRight'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  
  const {modalStatus, campoPesquisa, providers} = useSelector(state => state.empresasState)
  const [sidebar, setSidebar] = useState(false)
  const [actionCheck, setActionCheck] = useState({})

  useEffect(() => {
    dispatch(listarProviders())
  }, [modalStatus])

  const handleCheckboxActionAll = e => {
    let checkAll = {}
    providers.map(p=> {
      checkAll = {...checkAll, [p.id]: e}
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
          cy='formProvidersStatus'
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
      column: 'id',
      text: 'ID',
      className: ''
    },
    {
      column: 'name',
      text: 'Nome',
      className: ''
    },
    {
      column: 'typeName',
      text: 'Tipo',
      className: ''
    },
    {
      column: 'plataformName',
      text: 'Plataforma',
      className: ''
    },
    {
      column: 'activeUsers',
      text: 'Usuários ativos',
      className: 'text-center'
    },
    {
      column: 'totalUsers',
      text: 'Total de usuários',
      className: 'text-center'
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

  return (
    <>
      <div className='box-providers'>
        <div className='box-titulo'>
          <h2 className='titulo'>{nls.title}</h2>
          <Button color='primary' type='btn' size='small' onClick={() => dispatch(modalNovo('novo'))} title='Novo'>
            Adicionar
          </Button>
        </div>
        <div className='box-content-list'>
          <div className='box-pesquisa'>
            <div>
              <Input label='' name='input' 
                action={e => dispatch(handleCampoPesquisa(e))} 
                value={campoPesquisa}
                cy='pesquisarProviders'
                placeholder='Procurar...'
                right={
                  <>
                    {campoPesquisa ? (
                      <Button type='link' onClick={e => dispatch(campoPesquisaLimpar())} title='Limpar'>
                        <IcoClose />
                      </Button>
                    ) : null}

                    <Button
                      onClick={e => dispatch(pesquisarProviders(campoPesquisa))}
                      title={nls.pesquisar}
                      type='link'
                      disabled={campoPesquisa ? false : true}
                    >
                      <IcoSearch />
                    </Button>
                  </>
                }
              />
            </div>
            {/* <div>
              <Button color='default' type='btn' onClick={() => setSidebar(true)} title='Novo'>
                <IcoFilters cy='FiltrosProviders' /> Filtrar
              </Button>
            </div> */}
          </div>
          <List
            header={headDefault}
            data={providers}
            cy='tableProviders'
            listCustom={(e) => {
              const custom = e
              custom.selecione = <Checkbox
                label=''
                name='status'
                action={a => setActionCheck({...actionCheck, [e.id]: !actionCheck[e.id]})}
                checked={actionCheck?.[e.id]}
                text=''
                cy='formProvidersStatus'
              />
              custom.statusCustom = <Checkbox
                label=''
                type='switch'
                name='is_active'
                // action={a => dispatch(changeInformacao(a))}
                checked={e.is_active}
                text=''
                cy='formProvidersStatus'
              />
              custom.typeName = e.type
              custom.plataformName = e.contracts?.map(s=>{
                return <span key={s._id}>{s.platform_name}</span>
              })
              custom.activeUsers = e.number_of_collaborators?e.number_of_collaborators:'0'
              custom.totalUsers = e.number_of_collaborators?e.number_of_collaborators:'0'
              custom.acoes = (
                <div className='acoes'>
                  <Button color='primary' type='btn circle' onClick={() => dispatch(modalEditar(e))} title='Editar'>
                    <IcoPencil cy='EditarProviders' />
                  </Button>
                  {/* <Button color='danger' type='btn circle' onClick={() => dispatch(modalRemover(e))} title='Remover'>
                    <IcoBin cy='removeProviders' />
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
              totalElements: providers.length 
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
