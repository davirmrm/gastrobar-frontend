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
  listarPlataformas,
  pesquisarPlataformas,
  handleCampoPesquisa,
} from './redux/plataformasActions'
import NovoEditar from './plataformasNovoEditar'
import Remover from './plataformasRemover'
import './plataformas.scss'
import Filtros from './filtros'
import SidebarRight from '../../layout/sidebarRight'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  
  const {modalStatus, campoPesquisa, plataformas} = useSelector(state => state.plataformasState)
  const [sidebar, setSidebar] = useState(false)
  const [actionCheck, setActionCheck] = useState({})

  useEffect(() => {
    dispatch(listarPlataformas())
  }, [modalStatus])

  const handleCheckboxActionAll = e => {
    let checkAll = {}
    plataformas.map(p=> {
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
              optionCustom={e=>{
                console.log(e, 'kkkkk');
                return <><span className={e.id}></span> {e.name}</>
              }}
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
      className: 'actions'
    },
    {
      column: 'name',
      text: 'Nome',
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

  return (
    <>
      <div className='box-plataformas'>
        <div className='box-titulo'>
          <h2 className='titulo'>{nls.title}</h2>
          <Button color='primary' type='btn' size='small' 
            onClick={() => dispatch(modalNovo('novo'))} 
            title='Novo'
            cy='AdicionarPlataform'
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
                cy='pesquisarPlataform'
                placeholder='Procurar...'
                right={
                  <>
                    {campoPesquisa ? (
                      <Button type='link' 
                        onClick={e => dispatch(campoPesquisaLimpar())} title='Limpar'
                        cy='LimparCampoPesquisaPlataform'
                      >
                        <IcoClose />
                      </Button>
                    ) : null}

                    <Button
                      onClick={e => dispatch(pesquisarPlataformas(campoPesquisa))}
                      title={nls.pesquisar}
                      type='link'
                      disabled={campoPesquisa ? false : true}
                      cy='PesquisaPlataform'
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
            data={plataformas}
            cy='tablePlataform'
            listCustom={(e) => {
              const custom = e
              custom.selecione = <Checkbox
                label=''
                name='status'
                action={a => setActionCheck({...actionCheck, [e.id]: !actionCheck[e.id]})}
                checked={actionCheck?.[e.id]}
                text=''
                cy='formPlataformAction'
              />
              custom.statusCustom = <Checkbox
                label=''
                type='switch'
                name='status'
                // action={a => dispatch(changeInformacao(a))}
                checked={e.is_active}
                text=''
                cy='formPlataformIsActive'
              />
              custom.acoes = (
                <div className='acoes'>
                  <Button color='primary' type='btn circle' onClick={() => dispatch(modalEditar(e))} title='Editar' cy='EditarPlataform'>
                    <IcoPencil cy='EditarPlataform' />
                  </Button>
                  {/* <Button color='danger' type='btn circle' onClick={() => dispatch(modalRemover(e))} title='Remover' cy='removePlataform'>
                    <IcoBin cy='removePlataform' />
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
              totalElements: plataformas.length 
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
