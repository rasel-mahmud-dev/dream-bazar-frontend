
const p = [
  {name: "aa", catName: 'motherboard'},  
  {name: "bbb", catName: 'motherboard'},  
  {name: "ccc", catName: 'motherboard'},  
  {name: "ddd", catName: 'mobile'},  
  {name: "eee", catName: 'mobile'},  
  {name: "fff", catName: 'mobile'}
]



const cat = [
  {name: "motherboard"},  
  {name: "mobile"}
]
 
 let obj = {}
 
for(let ci = 0; ci<cat.length; ci++){
  p.forEach((p, i)=>{
    if(p.catName === cat[ci].name){ 
      if(obj[cat[ci].name]){
        if(obj[cat[ci].name].length <= 1){
          obj[cat[ci].name].push(p)
        }
  
      } else{
        obj[cat[ci].name] = [p]
      }
      // console.log(p)
    }
  })
} 
 
 console.log(obj)

// console.log(p)