import * as React from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import './style.css';
import { InputProps } from 'antd';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const SearchInput = (props) => {
  const { isMobile, onSearch } = props;
  const onSearchHandler = (value) => {
    onSearch && onSearch(value);
  };
  return (
    <Space direction="vertical" className={isMobile ? 'custom-search-input-mobile' : 'custom-search-input'}>
      <Search placeholder={'Search'} className="search-input" onChange={onSearchHandler} />
    </Space>
  );
};

export default SearchInput;
