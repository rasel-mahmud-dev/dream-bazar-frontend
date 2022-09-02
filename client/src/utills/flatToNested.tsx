

function flatToNested(items: {id: string, parentId: string | null}[]){
    let rootItem: any = []
    let number = 0
    for (let i = 0; i < items.length; i++) {
        let cat = items[i]
        if(cat.parentId === "0"){
            rootItem.push(cat)
        } else {
            rootItem.forEach((rootI, index)=>{
                number = number + (index + 1)

                if(rootI.id === cat.parentId) {
                    if (rootI.sub) {
                        let isExists = rootI.sub.find(s=>s.id === cat.id)
                        if(!isExists) {
                            rootI.sub = [...rootI.sub, cat]
                        }
                    } else {
                        rootI.sub = [cat]
                    }

                } else {
                    // find nested sub items
                    setItem(rootItem, cat)
                }
            })
        }
    }
    return rootItem
}

function setItem(items, item){
    items.forEach(i=>{
        if(i.id === item.parentId){
            if (i.sub) {
                let isExists = i.sub.find(s=>s.id === item.id)
                if(!isExists){
                    i.sub = [...i.sub, item]
                }
            } else {
                i.sub = [item]
            }
        } else {
            if(i.sub) {
                setItem(i.sub, item)
            }
        }
    })
}


export default flatToNested