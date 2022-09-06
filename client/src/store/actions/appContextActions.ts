import {ACTION_TYPES} from "store/types";


export const setLanguage = async (lang, contextDispatch)=>{
	let whitelist = ["en", "bn"]
	if(!whitelist.includes(lang)){
		return;
	}
	try{
		let response = await fetch(`/locales/${lang}/translation.json`)
		let translations = await response.json();
		localStorage.setItem("lang", lang)
		contextDispatch({
			type: ACTION_TYPES.SET_LANGUAGE,
			payload: {lang, translations}
		})
	} catch (ex){
	
	}
	
}