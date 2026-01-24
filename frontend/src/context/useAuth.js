
import { useContext } from 'react';
import { AuthContext } from './AuthContextDecl';

export const useAuth = () => useContext(AuthContext);
