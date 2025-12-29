import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

 const login = (data) => {
  const userData = {
    id: data.userId || data._id,
    role: data.role,
    email: data.email,
  };

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
};

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
