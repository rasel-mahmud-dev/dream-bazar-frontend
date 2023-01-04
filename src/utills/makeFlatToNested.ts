

function makeFlatToNested(flatArray){
    console.log("called")
    let array = []

    flatArray.forEach((item=>{
        if(item.parentId === null){
            makeNestingRecur(flatArray, item)
            array.push(item)
        }
    }))

    function makeNestingRecur(flatArray, item){
        flatArray.forEach(ii=>{
            if(ii.parentId === item._id){
                if(item.sub) {
                    item.sub.push(ii)
                } else {
                    item.sub  = [ii]
                }

                makeNestingRecur(flatArray, ii)

            }
        })
    }

    return array
}


export default makeFlatToNested