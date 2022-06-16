import { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import { jwt, Auth } from "../api";

const authController = new Auth();

export const AuthContext = createContext({
  auth: undefined,
  accessToken: null,
  refreshToken: null,
  login: () => null,
  logout: () => null,
});

export function AuthProvider(props) {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await jwt.getTokens();
      const accessExpired = jwt.hasExpired(response.access);

      if (accessExpired) {
        const refreshExpired = jwt.hasExpired(response.refresh);

        if (refreshExpired) {
          logout();
        } else {
          try {
            const result = await authController.refershToken(response.refresh);
            jwt.saveTokens(result.access, response.refresh);
            login({
              access: result.access,
              refresh: response.refresh,
            });
          } catch (error) {
            console.error(error);
            logout();
          }
        }
      } else {
        login(response);
      }
    })();
  }, []);

  const login = (tokens) => {
    if (tokens.access && tokens.refresh) {
      const decodeToken = jwtDecode(tokens.access);
      setAuth(decodeToken);
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      jwt.saveTokens(tokens.access, tokens.refresh);
    } else {
      logout();
    }
  };

  const logout = () => {
    setAuth(null);
    setAccessToken(null);
    setRefreshToken(null);
    jwt.removeTokens();
  };

  const data = {
    auth,
    accessToken,
    refreshToken,
    login,
    logout,
  };

  if (auth === undefined) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
