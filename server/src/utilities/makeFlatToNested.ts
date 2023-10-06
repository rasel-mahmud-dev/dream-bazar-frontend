

interface Arr{
    _id: string,
    parentId: string | null
}

function makeFlatToNested<T>(flatArray: Arr[]){
    let array: Arr[] = []

    flatArray.forEach((item=>{
        if(item.parentId === null){
            makeNestingRecur(flatArray, item)
            array.push(item)
        }
    }))

    function makeNestingRecur(flatArray, item){
        flatArray.forEach(ii=>{
            if(ii.parentId && ii.parentId.toString() === item._id.toString()){
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