function scrollTo(top: number){
	window.scrollTo({
		top,
		behavior: "smooth"
	})
}

export default scrollTo;