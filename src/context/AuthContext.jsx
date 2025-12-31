import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (data) => {
    // backend ke final response ke hisaab se
    const userData = {
      id: data.user.id,
      role: data.user.role,
      email: data.user.email,
      name: data.user.name,
      city: data.user.city,
    };

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  setUser(data.user);
  };

 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  window.location.href = "/login"; // HARD RESET
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
