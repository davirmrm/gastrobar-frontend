import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Input, Modal, TextArea, validacaoForm } from '../../components'
import { modalFechar, editarPlataformas, salvarPlataformas, changeInformacao } from './redux/plataformasActions'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, plataforma} = useSelector(state => state.plataformasState)
  const [erro, setErro] = useState({})
  
  useEffect(()=>{
    setErro({})
  },[modalStatus])

  const formRequired = {
    name: ''
  }
  
  const hanldeChange = (e, v) => {
    if (formRequired[v.name] !== undefined) {
      setErro({...erro, [v.name]: v.message})
    }
    dispatch(changeInformacao(e))
  }
  
  const hanldeSalvar = (e) => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    setErro(valida)
    if (!valid.length) {
      if (modalStatus === 'novo') {
        dispatch(salvarPlataformas(plataforma))
      } else {
        dispatch(editarPlataformas(plataforma))
      }
    }
  }
  
  return (
    <Modal
      title={modalStatus === 'novo' ? 'Novo plataforma' : 'Editar plataforma'}
      open={modalStatus === 'editar' || modalStatus === 'novo' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Descartar'
      size='medium'
      cy='ModalAddEditarPlataforma'
      actions={
        <>
          <Button
            color='success'
            onClick={() =>  hanldeSalvar(plataforma) }
            cy='AddEditarSalvarPlataforma'
          >
            {modalStatus === 'novo' ? 'Adicionar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <section className='modal-plataformas'>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Informações</h6>
            <Checkbox
              label=''
              type='switch'
              name='is_active'
              action={(e, ef) => hanldeChange(ef, e)}
              checked={plataforma.is_active}
              text={plataforma.is_active ? 'Ativo' : 'Inativo'}
              cy='formPlataformaIsActive'
            />
          </div>
          <div className='row'>
            <div className='col-12'>
              <Input label='Nome da plataforma' name='name' 
                action={(e, ef) => hanldeChange(e, ef)} 
                value={plataforma.name} 
                cy='formPlataformaName'
                required={{
                  pattern: formRequired.name,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              />
            </div>
            <div className='col-12'>
              <TextArea label='Descrição' name='description' 
                action={(e, ef) => hanldeChange(e, ef)} 
                value={plataforma.description} 
                cy='formPlataformaDescription'
                // required={{
                //   pattern: formRequired.description,
                //   erro: erro,
                //   message: nls.mensagem[`obrigatorio`]
                // }}
              />
            </div>
          </div>
        </div>
      </section>
    </Modal>
  )
}
