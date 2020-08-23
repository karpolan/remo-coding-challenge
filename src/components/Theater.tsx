import * as React from 'react';
import './Theater.scss';
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';
import Table from './Table';

const Theater: React.FC = () => {
  const listTables = TableConfig.tables || []

  return (
    <div className="remo-theater" style={{ width: TableConfig.width, height: TableConfig.height }}>
      <div className="rt-app-bar">
        {/**
         * Show user profile pic/name after login
         */}
        <a href="javascript:;">Logout</a>
      </div>
      <div className="rt-rooms">
        {listTables.map((table) => <Table {...table} />)}
      </div>
      <div className="rt-background">
        <img src={MapImage} alt="Conference background" />
      </div>
    </div>
  );
};

export default Theater;
