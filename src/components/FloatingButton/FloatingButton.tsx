import * as React from 'react';
import Button, { ButtonProps } from '../Button';
import cn from 'classnames';

type FloatingButtonProps = ButtonProps;

const FloatingButton: React.FC<FloatingButtonProps> = ({ className, children, ...rest }) => {
  return (
    <Button variant="transparent" className={cn(className, 'fixed right-4 bottom-6')} {...rest}>
      {children}
    </Button>
  );
};

export default FloatingButton;
