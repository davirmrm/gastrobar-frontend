import React from 'react';
import Portal from '../portal/portal';
import './loading.scss';

export const Loading = ({
  title = 'Carregando',
  icon = <div className="loader-default" data-cy="LoadingIcon"></div>,
}) => {
  return (
    <Portal name="loading">
      <div className="box-loading" data-cy="LoadingContainer">
        <div className="box-load">
          {icon}
          {title ? <h5 data-cy="LoadingText">{title}</h5> : null}
        </div>
      </div>
    </Portal>
  );
};
