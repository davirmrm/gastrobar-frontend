import React, { ReactNode } from 'react';
import Portal from '../portal/portal';
import './modal.scss';
import { IcoClose } from '../icon/icon';
import { Button } from '../button/button';

export const Modal = ({
  title,
  children,
  open = false,
  close,
  closeText = 'Fechar',
  size = 'medium',
  actions,
  cy
}) => {
  //VERIFICAR SE ESSA CONDIÇÃO AINDA FAZ O QUE É ESPERADO DELA
  if (!Array.isArray(children)) {
    children = [children];
  }
  return (
    <Portal name="modal">
      {open
        ? size === 'fullscreen'
          ? fullscreen({ title, open, children, size, closeText, close, actions, cy })
          : modalNormal({ title, open, children, size, closeText, close, actions, cy })
        : null}
    </Portal>
  );
};

const fullscreen = ({ title, children, closeText, close, actions, cy }) => {
  return (
    <div className={`box-modal fullScreen`} data-cy={`ModalFullScreenFullContainer${cy}`}>
      <div className="modal-header" data-cy={`ModalFullScreen${cy}Header`}>
        {title}
        {actions ? (
          <div className="modal-actions" data-cy={`ModalFullScreen${cy}Actions`}>
            <Button className="btn secondary normal" onClick={close} cy={`ModalFullScreenClose${cy}`}>
              {closeText}
            </Button>
            {actions}
          </div>
        ) : null}
      </div>
      <div className="modal-content" data-cy={`Modal${cy}ContentContainer`}>{children}</div>
    </div>
  );
};

const modalNormal = ({
  title,
  children,
  size,
  closeText,
  close,
  actions,
  cy
}) => {
  return (
    <div className={`box-modal`} data-cy={`Modal${cy}FullContainer`}>
      <div className={`size-${size}`} data-cy={`Modal${size}${cy}Container`}>
        <div className="modal-header" data-cy={`Modal${size}${cy}Header`}>
          {title}
          <Button className="modal-close" onClick={close} title={closeText} cy={`Modal${size}${cy}Close`}>
            <IcoClose cy={`Modal${cy}`}/>
          </Button>
        </div>
        <div className="modal-content" data-cy={`Modal${size}${cy}ContentContainer`}>{children}</div>
        {actions ? (
          <div className="modal-actions" data-cy={`Modal${size}${cy}ActionsContainer`}>
            <Button color="secondary" variant="outline" onClick={close} cy={`Modal${size}${cy}Close`}>
              {closeText}
            </Button>
            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
};
