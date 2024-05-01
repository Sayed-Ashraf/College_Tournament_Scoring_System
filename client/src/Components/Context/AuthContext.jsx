import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Swal from 'sweetalert2';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null); // State to manage errors
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromToken = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded token:", decoded);
          setUser(decoded);
        } catch (error) {
          // Handle invalid token
          console.error("Invalid token:", error.message);
          setUser(null);
          setError("Invalid token. Please log in again.");
          localStorage.removeItem("token");
          setToken(null);
        }
      } else {
        setUser(null);
      }
    };    

    fetchUserFromToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3010/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      localStorage.setItem("token", data.token);
      setToken(data.token);
      // setError(null); // Clear any previous errors
      console.log(data);  
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully!",
        icon: "success",
      });

      return data;
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      return { error: error.message };
    }
    finally {
      setLoading(false);
    }
  };
  
  const register = async (name, email, password, inteam) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3010/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, inteam }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      // const decoded = jwtDecode(data.token)
      // localStorage.setItem("id", decoded.id)
      // localStorage.setItem("role", decoded.role)
      // localStorage.setItem("token", data.token);
      setToken(data.token);
      // setError(null); // Clear any previous errors
      Swal.fire({
        title: 'Success!',
        text: data.msg,
        icon: 'success',
      });
      navigate("/login")
      console.log(data);
      return data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
      // setError(error.message); // Set error message for UI
      console.log(error.message);

    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null); // Clear any previous errors
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setError(null); // Clear any previous errors
      return data;
    } catch (error) {
      setError(error.message); // Set error message for UI
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
