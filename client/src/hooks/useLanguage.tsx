import {useContext} from "react";
import {AppContext} from "store/AppContext";


function useLanguage(Context?: any){
	const a =  useContext(Context || AppContext);
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