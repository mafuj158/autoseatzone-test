import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "@/contexts/index";
const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const AuthProviderV2 = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => {
        return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
    });
    // Function to set access token in localStorage
    const setToken = (token) => {
        if (token) {
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
        }
        setAccessToken(token);
    };
    // Sync accessToken state with localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY) || null;
            if (storedToken !== accessToken) {
                setAccessToken(storedToken);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [accessToken]);

    useEffect(() => {
        const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY) || null;
        if (storedToken !== accessToken) {
            setAccessToken(storedToken);
        }
    }, [accessToken]);

    // Handle login and store tokens
    const handleLogin = (token) => {
        if (token) {
            setToken(token);
        }
    };

    // Function to log out
    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setAccessToken(null);
    };

    // Fetch user data with react-query
    const { data: userData, refetch: userRefetch, isFetching } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            if (!accessToken) return null;
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/user/profile`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );
                return response?.data?.data || null;
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    setToken(null);
                    logout()
                }
                return null;
            }
        },
        enabled: !!accessToken,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 0,
        cacheTime: 0,
    });
    const isAuthenticated = !!accessToken && [1, true].includes(userData?.is_verified);
    const userRole = userData?.api_role || null
    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setToken,
                handleLogin,
                logout,
                userRefetch,
                userData,
                isAuthenticated,
                userRole,
                isLoading: !!accessToken && (isFetching || userData === undefined)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviderV2;
