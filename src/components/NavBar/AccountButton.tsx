import * as React from 'react';
import cn from 'classnames';
import Web3Context from 'src/context/web3';
import ImageButton from '../ImageButton';
import { ImageButtonProps } from '../ImageButton/ImageButton';

const AccountImageButton: React.FC<ImageButtonProps> = ({ className, ...rest }) => {
  const { account, requestWeb3 } = React.useContext(Web3Context);

  const accountBtnClass = cn({
    'pointer-events-none': !!account,
    // eslint-disable-next-line max-len
    'justify-start items-center bg-nav-account-item bg-contain bg-no-repeat 2lg:absolute 2lg:top-14 xl:top-0 2lg:right-4 xl:relative w-full lg:w-[165px] h-[33px] lg:h-[40px] min-h-[33px] lg:min-h-initial mb-0 2xl:w-[239px] 2xl:h-[60px]':
      true,
  });

  const onConnectButtonClick = () => {
    if (!account) {
      requestWeb3();
    }
  };

  const renderButtonText = () => {
    if (!account) {
      return <p className="w-full text-base-content text-xs lg:text-base">Connect</p>;
    }

    return (
      <div className="w-[60%] 2xl:w-[70%] 2xl:pl-[12px] text-base-content text-xs lg:text-base relative">
        <p className="account-id-text ml-1 md:ml-0" data-account-id={account.slice(account.length - 4, account.length)}>
          {account}
        </p>
      </div>
    );
  };

  return (
    <ImageButton
      noAnimation={!!account}
      onClick={onConnectButtonClick}
      className={cn(accountBtnClass, className)}
      {...rest}
    >
      {renderButtonText()}
    </ImageButton>
  );
};

export default AccountImageButton;
