import React from "react";
import useAppSelector from "src/hooks/useAppSelector";

function useLanguage(){

    const { translations  } = useAppSelector(state=>state.appState)

    return (token: string, fallback?: string) => {
        if (translations[token]) {
            return translations[token]
        } else if (fallback) {
            return fallback
        } else {
            return token;
        }
    }
}

export default useLanguage