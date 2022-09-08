import React, { useEffect } from 'react';
import { useState } from 'react';
import './tab.scss';

export const Tab = ({ data, tabSelect = '', actionTab, type, cy}) => {
  const [tabState, setTabState] = useState([]);
  const [tabStateId, setTabStateId] = useState("");
  useEffect(() => {
    if (data) {
      const selectTab = data.filter(
        (e) => e.id === (tabSelect ? tabSelect : data[0].id)
      );
      if (selectTab.length) {
        setTabState(selectTab[0].content);
        setTabStateId(selectTab[0].id);
      }
    }
  }, [data]);

  return (
    <div 
    className={type === 'custom' ? 'custom-tab' : 'box-tab'}
    data-cy={`${type}Tab${cy}FullContainer`}
    >
      <div 
      className="tab-head"
      data-cy={`${type}Tab${cy}Header`}
      >
        {data?.map((e) => (
          <div
            key={e.id}
            className={e.id === tabStateId ? 'active' : ''}
            onClick={() => [
              setTabStateId(e.id),
              setTabState(e.content),
              actionTab(e.id),
            ]}
            data-cy={`Tab${e.id}ClickShow${cy}`}
          >
            {e.title}
          </div>
        ))}
      </div>
      <div 
      className="tab-content"
      data-cy={`${type}Tab${cy}ContentContainer`}
      >{tabState}</div>
    </div>
  );
};
