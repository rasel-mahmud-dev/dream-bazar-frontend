let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
function generateSku(){
    let res = ""
    for (let i = 0; i<6;i++){
        let randomIndex =  Math.round(Math.random() * 9);
        res+= nums[randomIndex]
    }
    return res
}

export default generateSku