// // frontend/src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // 1. Create the context "box"
// const AuthContext = createContext();

// // 2. Create the Provider component
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));
  
//   // 🎯 THE FIX FOR "WHITE PAGE": Add a 'loading' state.
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // Initialize navigate

//   // 3. This runs ONCE when the app first loads
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       try {
//         //  THE FIX: You must PARSE the user string back into an object
//         setUser(JSON.parse(storedUser));
//         const parsedUser=JSON.parse(storedUser);
//         console.log("AuthContext Restoring user from storage:",parsedUser.role)
//         setToken(storedToken);
//         setIsLoggedIn(true);
//       } catch (e) {
//         // If localStorage is corrupted, clear it
//         localStorage.clear();
//        e.setIsLoggedIn(false);
//       }
//     }
//     // 4. We are done checking, set loading to false
//     setLoading(false);
//   }, []); // Empty array [] means "run only once"

//   // 5. Login function (called by Login.jsx)
//   const login = (userData, userToken) => {
//     // Save to React's state
//     setUser(userData);
//     setToken(userToken);
//     setIsLoggedIn(true);
//     // Save to browser's localStorage
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", userToken);
//     localStorage.setItem("isLoggedIn", "true");
//   };

//   // 6. Logout function (called by Navbar.jsx)
//   const logout = () => {
//     // Clear React's state
//     setUser(null);
//     setToken(null);
//     setIsLoggedIn(false);
//     // 🎯 THE FIX: Clear localStorage correctly
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     localStorage.removeItem("isLoggedIn");
//     // Redirect to login
//     navigate("/login");
//   };

//   // 7. Provide all these values to the entire app
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, loading }}>
//       {/* Don't render the app *until* loading is false */}
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // 8. The custom hook that components will use
// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => useContext(AuthContext);



// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

// 1. Create the context "box"
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  
  // 🎯 THE FIX FOR "WHITE PAGE": Add a 'loading' state.
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  // 3. This runs ONCE when the app first loads
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        //  THE FIX: You must PARSE the user string back into an object
        setUser(JSON.parse(storedUser));
        const parsedUser=JSON.parse(storedUser);
        console.log("AuthContext Restoring user from storage:", parsedUser.role);
        setToken(storedToken);
        setIsLoggedIn(true);
      } catch (e) {
           console.error("Error parsing stored user:", e);
        // If localStorage is corrupted, clear it
        localStorage.clear();
        // 🛑 FIXED: Removed 'e.' here. 'e' is the error, not the function.
        setIsLoggedIn(false);
      }
    }
    // 4. We are done checking, set loading to false
    setLoading(false);
  }, []); // Empty array [] means "run only once"

  // 5. Login function (called by Login.jsx)
  const login = (userData, userToken) => {
    // Save to React's state
    setUser(userData);
    setToken(userToken);
    setIsLoggedIn(true);
    // Save to browser's localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
    localStorage.setItem("isLoggedIn", "true");
  };

  // 6. Logout function (called by Navbar.jsx)
  const logout = () => {
    // Clear React's state
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    // 🎯 THE FIX: Clear localStorage correctly
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    // Redirect to login
    navigate("/login");
  };

// 👇 FIX: Accepts token string properly
  const googleLogin = async (googleToken) => {
    try {
      // const res = await fetch("http://localhost:5000/api/auth/google", {
      const res=await axiosInstance.post("/auth/google", { token: googleToken });

      //axios puts the response data in .data
      const data=res.data;
        
      if(res.status==200||res.status==201){
        login(data.user,data.token);
        navigate("/");
      }
    }catch(err){
      console.error("Google login error:", TypeError.response?.data?.message || err.message);
      throw err;//thorow os login.jsx can catch and show the error message 
    }
  };

//   // 7. Provide all these values to the entire app
//   return (
//     // 🆕 UPDATED: Added 'googleLogin' to the value list so Login.jsx can find it
//     <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, loading, googleLogin }}>
//       {/* Don't render the app *until* loading is false */}
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // 8. The custom hook that components will use
// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuth = () => useContext(AuthContext);

// 👇 NEW FUNCTION: Updates user state without logging out
  // Use this when the user upgrades role or changes profile pic
  const updateUser = (updatedUserData, newToken = null) => {
    setUser(updatedUserData);
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    
    if (newToken) {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout, loading, googleLogin, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 8. The custom hook that components will use
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);