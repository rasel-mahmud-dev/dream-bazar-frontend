import {useContext} from "react";


function useLanguage(Context){
	const a =  useContext(Context);
	let translations = a.contextState.translations
	
	const chooseToken = (token: string, fallback?: string)=>{
		if(translations[token]){
			return translations[token]
		} else if(fallback) {
			return fallback
		} else {
			return token;
		}
	}
	
	return [chooseToken]
}

export default useLanguage