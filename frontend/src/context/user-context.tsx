import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  ready: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  ready: false,
});

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`)
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
