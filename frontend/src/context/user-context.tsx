import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../lib/utils";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  ready: boolean;
  setReady: (ready: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  ready: false,
  setReady: () => {},
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
        .get(`${import.meta.env.VITE_BASE_URL}/api/users/account`)
        .then(({ data }) => {
          setReady(true);
          setUser(data);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
};
