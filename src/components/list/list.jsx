import React, { useEffect, useState } from 'react';
import './list.scss';

export const List = ({
  header,
  data,
  listCustom = () => null,
  noData = 'Sem informação',
  cy=''
}) => {
  const [listState, setListState] = useState([]);

  useEffect(()=>{
    setListState(data)
  }, [data])
  
  return (
    <div className="box-scrool">
      <table className="list-box" data-cy={`Table${cy}`}>
        <thead>
          <tr data-cy={`Table${cy}Header`}>
            {header.map((header) => {
              return (
                <td className={header.className} key={header.column} data-cy={`Table${cy}HeaderColumn[${header.column}]`}>
                  {header.text}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            listState?.map((container, i) => {
              listCustom(container, i, data);
              return (
                <tr key={container.id ? container.id : i} data-cy={`Table${cy}Row[${i}]`}>
                  {header.map((header) => {
                    return (
                      <td
                        className={header.className}
                        key={`${container.id ? container.id : i}-${
                          header.column
                        }`}
                        data-cy={`Table${cy}Row[${i}]Column[${header.column}]`}
                      >
                        {container[header.column]
                          ? container[header.column]
                          : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={header?.length} className="text-center" data-cy={`Table${cy}NoData`}>
                {noData}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
