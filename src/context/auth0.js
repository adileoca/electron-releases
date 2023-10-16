import { useState, useEffect, useContext, createContext } from "react";
import { createAuth0Client } from "@auth0/auth0-spa-js";
const { ipcRenderer } = window.require("electron");
console.log("ipcRenderer:", ipcRenderer);
console.log("ipcRenderer Available:", !!ipcRenderer);

const AuthContext = createContext();

const saveTokenInMainProcess = (token) => {
  ipcRenderer.invoke("save-token", token);
};

const getTokenFromMainProcess = async () => {
  const token = await ipcRenderer.invoke("get-token");
  return token;
};

const deleteTokenInMainProcess = () => {
  ipcRenderer.invoke("delete-token");
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth0Client, setAuth0Client] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Setting up IPC listener for test message in renderer");
    const handleTestMessage = (event, message) => {
      console.log("Received test message:", message);
    };
    ipcRenderer.addListener("test-message", handleTestMessage);
    return () => {
      ipcRenderer.removeListener("test-message", handleTestMessage);
    };
  }, []);

  // 1. Initialize auth0Client
  useEffect(() => {
    const initAuth0 = async () => {
      const auth0 = await createAuth0Client({
        domain: "dev-qlush8at7ytza0tr.eu.auth0.com",
        clientId: "VARjIegzs032HFVd1c4wFd9ZXyDypRl4",
        authorizationParams: {
          redirect_uri: "com.operationsmanager://callback",
        },
      });
      setAuth0Client(auth0);
    };
    initAuth0();
  }, []);

  // 2. Check user authentication and tokens
  useEffect(() => {
    const checkAuthentication = async () => {
      if (auth0Client) {
        const isAuthenticated = await auth0Client.isAuthenticated();

        if (isAuthenticated) {
          const userProfile = await auth0Client.getUser();
          const accessToken = await auth0Client.getTokenSilently();
          saveTokenInMainProcess(accessToken);
          setUser(userProfile);
          if (user) {
            console.log("User authenticated, redirecting...");
            // Perform your redirection here, for example:
            // history.push('/dashboard');
          }
        } else {
          auth0Client.loginWithRedirect();
        }

        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, [auth0Client, user]);

  // 3. Handle the auth callback from the main process
  useEffect(() => {
    console.log("Setting up IPC listener for auth-callback in renderer");
    const handleAuthCallback = async (event, url) => {
      console.log("Received auth callback:", url); // Log for debugging
      if (auth0Client) {
        try {
          await auth0Client.handleRedirectCallback(url);
          const user = await auth0Client.getUser();
          const accessToken = await auth0Client.getTokenSilently();
          saveTokenInMainProcess(accessToken);
          setUser(user);
          if (user) {
            console.log("User authenticated, redirecting...");
            // Perform your redirection here, for example:
            // history.push('/dashboard');
          }
        } catch (error) {
          console.error("Error handling auth callback:", error);
        }
      }
    };

    ipcRenderer.addListener("auth-callback", handleAuthCallback);

    return () => {
      ipcRenderer.removeListener("auth-callback", handleAuthCallback);
    };
  }, [auth0Client]);



  const logout = () => {
    if (auth0Client) {
      auth0Client.logout({
        returnTo: "com.operationsmanager://callback",
      });
      deleteTokenInMainProcess();
      setUser(null);
      if (user) {
        console.log("User authenticated, redirecting...");
        // Perform your redirection here, for example:
        // history.push('/dashboard');
      }
    }
  };

  const contextValue = {
    isLoading,
    isAuthenticated: !!user,
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
