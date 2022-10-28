let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
function generateSku(){
    let res = ""
    for (let i = 0; i<nums.length;i++){
        let randomIndex =  Math.round(Math.random() * 10);
        res+= nums[randomIndex]
    }
    return res
}

export default generateSku