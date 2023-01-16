
function chooseImageNode(fieldName, onChange){
    let input = document.createElement("input")
    input.setAttribute("type", "file")
    input.name = fieldName
    input.click()
    input.addEventListener("change", onChange)
}


export default chooseImageNode