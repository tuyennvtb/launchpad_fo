import React from 'react';
import ActivePool from './components/ActivePool';
import NextToLaunch from './components/NextToLaunch';
import Pool from './components/Pool';
import Sales from './components/Sales';
import styles from './styles.module.less';
import { useProjectListQuery } from 'src/hooks/query';
import { Skeleton, Spin } from 'antd';

const exampleData = [
  {
    id: '1',
    name: 'Theta Arena',
    token_symbol: 'THG',
    project_type: 0,
    fund_token_ratio: 1,
    token_on_sale: 1,
  },
  {
    id: '1',
    name: 'Theta Arena',
    token_symbol: 'THG',
    project_type: 0,
    fund_token_ratio: 1,
    token_on_sale: 1,
  },
  {
    id: '1',
    name: 'Theta Arena',
    token_symbol: 'THG',
    project_type: 0,
    fund_token_ratio: 1,
    token_on_sale: 1,
  }
]

function ListPage() {
  const { data: projectListRes } = useProjectListQuery();
  const projectList = projectListRes?.data;

  if (!projectList) {
    return <Skeleton />;
  }
  return (
    <div className={styles['listpage-container']}>
      <div className={styles['body-container']}>
        <ActivePool project={projectList[0]} />
        <NextToLaunch projects={projectList} />
        <Pool title="POOL IDO" projects={projectList} />
        <Pool title="POOL COMMUNITY" projects={projectList} />
      </div>
      <Sales projects={projectList} />
    </div>
  );
}

export default ListPage;
