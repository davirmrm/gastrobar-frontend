import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, modalOpen } from './redux/layoutActions'
import { Modal, Button } from '../components'
import { history } from '../helpers'

export default () => {
  const dispatch = useDispatch()
  const { statusModal } = useSelector(state => state.layoutState)
  return (
    <Modal
      title='Sair'
      size='small'
      open={statusModal === 'sair' ? true : false}
      close={() => dispatch(modalOpen(''))}
      closeText='Cancelar'
      actions={
        <Button color='danger' onClick={() => dispatch([modalOpen(''), logOut(history)])}>
          Confirmar
        </Button>
      }
    >
      Tem certeza que deseja sair da aplicação?
    </Modal>
  )
}
