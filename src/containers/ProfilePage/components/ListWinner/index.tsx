import React, { useState } from 'react';
import styles from './styles.module.less';
import { Table } from 'antd';
import './style.css';
import './style.mobile.css';
const ListWinner = (props) => {
    
    return ( 
    <div
      className={
        props.isMobile ? 'project-list-winner-container-mobile':'project-list-winner-container'
      }
    >
      <Table
        pagination={{ position: props.isMobile?['bottomCenter']:['bottomRight'] }}
        columns={props.columns ? props.columns.map(item => {return {...item, render: (text: string) => <div className='custom-table' style={{textAlign:'inherit'}}><span>{text}</span></div>}}) : []}
        dataSource={props.data ? props.data.map((item, index) => {return {...item, key: index + 1}}) : []}
      />
    </div>);
}

export default ListWinner;