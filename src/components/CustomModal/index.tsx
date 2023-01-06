import * as React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import WaveButton from '../CustomButton/WaveButton';
const CustomModal = (props) => {
  const [isModalVisible, onShowModal] = React.useState(true);
  return (
    <Modal
      visible={isModalVisible}
      title="Title"
      onCancel={(e) => {
        onShowModal(false);
      }}
      footer={[
        <WaveButton
          key="back"
          title="VIEW ON BSCSCAN"
          width={'auto'}
          onClick={() => {
            onShowModal(false);
          }}
        />,
      ]}
      width={props.isMobile ? 330 : 500}
    >
      {props.contentFail ? (
        <span className="content-fail">
          <ExclamationCircleOutlined style={{ fontSize: 60, marginRight: 15 }} />
          FAIL
        </span>
      ) : (
        <span className="content-success">
          <CheckCircleOutlined style={{ fontSize: 60, marginRight: 15 }} />
          SUCCESS
        </span>
      )}
    </Modal>
  );
};
export const showModal = ({
  type,
  text,
  content,
  isShowButton = true,
}: {
  type: 'error' | 'success';
  text: string;
  content?: React.ReactNode;
  isShowButton?: boolean;
}) => {
  const isError = type === 'error';
  const contentModal = text.toUpperCase();
  const contentRender = content ? (
    content
  ) : (
    <div className="custom-modal-container">
      <div className="custom-modal-body">
        {isError ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />} {contentModal}
      </div>
      {isShowButton ? (
        <WaveButton
          title="VIEW ON BSCSCAN"
          width={300}
          onClick={() => {
            window.open('https://bscscan.com/');
          }}
        />
      ) : null}
    </div>
  );
  const modal = {
    content: contentRender,
    closable: true,
    icon: undefined,
  };
  isError ? Modal.error(modal) : Modal.success(modal);
};
export default CustomModal;
