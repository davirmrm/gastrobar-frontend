import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Portal from '../portal/portal';
import './alert.css';

import { IcoClose } from '../icon/icon';
import { RemoveAlert } from './actions';
import { Button } from '../button/button';
export * from './actions';

export const Alert = () =>{
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alerts);

  return (
    <Portal name="alert">
    <>
      {alerts?.map((alert) => {
        setTimeout(
          function () {
            dispatch(RemoveAlert(alert.id))
          },
          alert.time ? alert.time : 3000
        );
        return (
          <div key={alert.id} className={`box-alert alert-${alert.type}`} data-cy={`Alert${alert.id}`}>
            <div dangerouslySetInnerHTML={{ __html: alert.mensage }} data-cy={`Alert${alert.id}Message`}></div>
            <Button
              className="alert-close"
              onClick={() => dispatch(RemoveAlert(alert.id))}
              cy={`Alert${alert.id}Close`}
            >
              <IcoClose cy={`Alert${alert.id}`}/>
            </Button>
          </div>
        );
      })}
      </>
    </Portal>
  );
}
