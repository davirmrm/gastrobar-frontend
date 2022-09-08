import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from '../../components'
import { modalFechar, removerPlataformas } from './redux/plataformasActions'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, plataforma} = useSelector(state => state.plataformasState)

  return (
    <Modal
      title={'Remover plataforma'}
      open={modalStatus === 'remover' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Cancelar'
      size='small'
      cy='RemoverFormPlataforma'
      actions={
        <>
          <Button color='danger' 
            onClick={() => dispatch(removerPlataformas(plataforma))}
            cy='RemoverPlataforma'
          >
            Remover
          </Button>
        </>
      }
    >
      <section>
        <p>Tem certeza que deseja remover este plataforma?</p>
        <p><strong>{plataforma.name}</strong></p>
      </section>
    </Modal>
  )
}
