import React, { ReactNode } from 'react';
import { server } from '../mocks/node';

server.listen();

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return <div>{children}</div>;
};

export default Provider;
