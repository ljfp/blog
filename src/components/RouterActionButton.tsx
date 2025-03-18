import * as React from 'react';
import ActionButton from '@components/ActionButton';
import { Link } from 'react-router-dom';

interface RouterActionButtonProps {
  to?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const RouterActionButton: React.FC<RouterActionButtonProps> = ({ to, children, onClick }) => {
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <ActionButton>{children}</ActionButton>
      </Link>
    );
  }
  
  return <ActionButton onClick={onClick}>{children}</ActionButton>;
};

export default RouterActionButton;
