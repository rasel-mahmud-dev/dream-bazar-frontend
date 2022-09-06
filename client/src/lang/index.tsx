import {useContext} from "react";


export default function useLanguage(Context){
	const a =  useContext(Context);
	let translations = a.contextState.translations
	
	const f = (token, fallback)=>{
		if(translations[token]){
			return translations[token]
		} else {
			return fallback
		}
	}
	
	return [f]
}