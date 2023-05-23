import { createContext } from "react";
import tempAvatar from '../img/avatar.png';

// задаем начальное значение currentUser, чтобы избежать лишних проверок на null и undefined:
export const initialUserData = {
  name: '',
  about: '',
  avatar: tempAvatar
}

export const CurrentUserContext = createContext(initialUserData);
