import {ACTION_TYPES} from "store/types";


export const setLanguage = async (lang="", contextDispatch)=>{
	let locales = lang;
	let whitelist = ["en", "bn"]
	
	if(!locales){
		let lang = localStorage.getItem("lang");
		console.log(lang)
		if(!lang){
			locales = "en"
		}else {
			locales = lang;
		}
	}
	
	if(!whitelist.includes(locales)){
		return;
	}
	try{
		let response = await fetch(`/locales/${locales}/translation.json`)
		let translations = await response.json();
		localStorage.setItem("lang", locales)
		contextDispatch({
			type: ACTION_TYPES.SET_LANGUAGE,
			payload: {lang: locales, translations}
		})
	} catch (ex){
	
	}
	
}

export const toggleTheme = (theme="", contextDispatch)=>{
	if(theme) {
		localStorage.setItem("theme", theme)
	} else {
		theme = localStorage.getItem("theme")
	}
	let html  = document.documentElement
	html.className = theme
	contextDispatch({
		type: ACTION_TYPES.SET_THEME,
		payload: theme
	})
}