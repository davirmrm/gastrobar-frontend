import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '../../helpers/history';
import './menu.scss';

export const Menu = ({ children, data, action = () => null, cy='' }) => {
  const location = useLocation();
  const isActive = (address) => location.pathname === address;
  const actionMenu = (e) => {
    if (e.url) {
      window.open(e.url, '_blank');
    }
    if (e.go) {
      history.push(e.go);
    }
    action(e);
  };

  return (
    <div className="menu" data-cy={`Menu${cy}`}>
      
      {data && data.length
        ? data.map((item, n) => {
            if (item.itens) {
              return <div key={`${item.title}-${n}`} className='group'>
                {item.title?
                  <div>
                    {item.icon ? <span>{item.icon}</span> :null}
                    <span>{item.title}</span>
                  </div>
                :null}
                {
                item.itens.map((groupItem, i)=>{
                  return (
                    <button key={`${groupItem.id}-${i}`} className={isActive(groupItem.go) ? 'active' : ''} onClick={() => actionMenu(groupItem)}>
                      {groupItem.label}
                      </button>
                  )
                })
                }
              </div>
            } else{
              return (
                <button key={item.id} className={isActive(item.go) ? 'active' : ''} onClick={() => actionMenu(item)}>
                  {item.label}
                </button>
              )
            }
          })
        : null}

      {children}
    </div>
  );
};
