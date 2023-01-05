import React, { FC } from 'react'
export {}

// import {useParams, Link, useLocation, useNavigate} from "react-router-dom"
// import qs from "query-string"
// import Image from "UI/Image/Image"
// import FilterSidebar from "components/FilterSidebar/FilterSidebar"
//
// import {Button, Spin} from "UI/index"
//
// // import  {productDropdownNavData}  from "src/store"
//
// import api from "src/apis"
//
// import  "./Products.scss";
//
//
// interface ProductProps {
//
// }
//
// const Products: FC<ProductProps> = (props) => {
//
//     // const history = useHistory()
//     const navigate = useNavigate()
//     const params = useParams()
//     const location = useLocation()
//
//     const [isEntryLevel, setEntryLevel] = React.useState(false)
//     const [ queryObject , setQueryObject] = React.useState<{
//         slug?: string,
//         id?: string,
//         type?: string,
//     }>({})
//
//     const [filteredProducts, setFilteredProducts ] = React.useState<any>([])
//     const [productsPagination, setProductsPagination ] = React.useState({perPage: 5, pageNumber: 1})
//     const [subcategorySectionsProduct, setSubcategorySectionsProduct ] = React.useState({})
//     const [category, setCategory] = React.useState({})
//     const [totalItems, setTotalItems] = React.useState(0)
//     const [breadcrumbsData2, setBreadcrumbsData2] =  React.useState<any>({})
//     const [loadingStatus, setLoadingStatus] = React.useState("") /// loadStart, loaded, loadFail
//
//     let h = {}
//
//     let query: { id?: string, type?: string, slug?: string } = qs.parse(location.search)
//
//
//     // @ts-ignore
//   React.useEffect(async()=>{
//         if(query){
//           // setEntryLevel(true)
//           setQueryObject(query)
//         } else{
//           // setEntryLevel(false)
//           // setQueryObject({ slug: query?.slug, id: query?.id, type: query?.type })
//         }
//
//         if(Object.keys(query).length > 0 ){
//           setLoadingStatus("loadStart")
//            const {data} = await api.get(`/api/products/filter/?type=${query.type}&id=${query.id}&perPage=${productsPagination.perPage}&pageNumber=${productsPagination.pageNumber}`)
//               setLoadingStatus("loaded")
//
//                 if(data.hasChild){
//                  let respo = await api.get(`/api/products/category-product/${query.id}`)
//                   let o = respo.data.categoryProduct
//                   setSubcategorySectionsProduct(o)
//                   setEntryLevel(false)
//                 } else {
//
//                   /// get count all document in current category.
//                   api.get(`/api/products/count/?category_id=${query.id}`).then(doc=>{
//                     setTotalItems(doc.data.count)
//                     // console.log(doc)
//                   }).catch(ex=>{
//                     console.log(ex)
//                   })
//                   // console.log(countRes)
//
//                   // store all fetched products..........
//                   setFilteredProducts(data.products);
//                   //setEntryLevel(true)
//                   // now we need category filter sections
//                     api.get(`/api/categories/filter-section/${query.id}`).then(r=>{
//                      setCategory(r.data.category)
//                       setEntryLevel(true)
//                     })
//                 }
//
//         }
//
//
//
//         productDropdownNavData.map(bb=>{
//             if(bb.id ===  query.id){
//                 setBreadcrumbsData2(bb)
//                 return
//             }  else{
//                 bb.subCategory.map(subCa=>{
//                     if(subCa.id ===  query.id){
//                         // log(subCa)
//                         setBreadcrumbsData2(bb)
//                         return
//                     } else{
//                         subCa.subCategory.map(subCat2=>{
//                             if(subCat2.id ===  query.id){
//
//                             } else{
//                                 subCat2.items.map(subCat3=>{
//
//                                 if(query.id === subCat3.id){
//                                   h = {
//                                       name: bb.name,
//                                       id: bb.id,
//                                       subCategory: [
//                                           {
//                                             ...subCa,
//                                             name:  subCa.name,
//                                             id:  subCa.id,
//                                             subCategory: [subCat2]
//                                         }
//                                       ]
//                                     }
//
//                                     setBreadcrumbsData2(h)
//                                     return
//                                  }
//
//                                 })
//                             }
//                         })
//                     }
//                 })
//         }
//
//     })
//
//
//
//
//     }, [query.slug, location.search])
//
//
//
//     const [breadcrumbsData, setBreadcrumbsData] =  React.useState([
//         {name: "Electronic", id: 1}, {name: "Computers", id: 2}
//     ])
//
//
//   let b: any = {}
//
//   function handleClick(params: any) {
//         productDropdownNavData.map(pdata=>{
//             if(pdata.name === params.children){
//
//             } else{
//                 pdata.subCategory.map(sub1=>{
//                     if(sub1.name === params.children){
//                         b = {...sub1}
//                         let seletedBreadcrumbIndex = productDropdownNavData.findIndex(d=>d.id === pdata.id)
//                         navigate(`/products/?type=${b.type}&id=${b.id}&slug=${b.name}`)
//                         sub1.subCategory = []
//                     } else{
//                         sub1.subCategory.map(sub2=>{
//                             if(sub2.name === params.children){
//                                 let seletedBreadcrumbIndex = productDropdownNavData.findIndex(d=>d.id === pdata.id)
//                                 navigate(`/products/?type=${sub2.type}&id=${sub2.id}&slug=${sub2.name}`)
//                             } else{
//                                 sub2.items.map(item=>{
//                                 if(item.name === params.children){
//                                 }
//                              })
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//
//         // productDropdownNavData.map(bb=>{
//             // log(bb)
//             // if(bb.id ===  query.id){
//             //     log(bb)
//
//             // }  else{
//             //     bb.subCategory.map(subCa=>{
//             //         if(subCa.id ===  query.id){
//             //             log(subCa)
//             //         } else{
//             //             subCa.subCategory.map(subCat2=>{
//             //                 if(subCat2.id ===  query.id){
//             //                     log(subCat2)
//             //                 } else{
//             //                     subCat2.items.map(subCat3=>{
//
//             //                     if(query.id === subCat3.id){
//             //                         // setBreadcrumbsData2(subCa)
//             //                     }
//
//             //                     })
//             //                 }
//             //             })
//             //         }
//                 // })
//         // }
//
//         // let fIndex = breadcrumbsData.findIndex(bData => bData.id == params.id )
//
//         // let g = breadcrumbsData.slice(0, fIndex + 1)
//         // setBreadcrumbsData(g)
//
//     }
//
//   function loadMoreProductHandler(){
//     // api.fetch(`/api/products/fitler/?perPage=${}&pageNumber=${}`)
//     setLoadingStatus("loadStart")
//     api.get(`/api/products/filter/?type=${queryObject.type}&id=${queryObject.id}&perPage=${productsPagination.perPage}&pageNumber=${productsPagination.pageNumber + 1}`)
//     .then(resp=>{
//       if(resp.data.products){
//         setLoadingStatus("loaded")
//         setProductsPagination({
//           ...productsPagination,
//           pageNumber: productsPagination.pageNumber + 1
//         })
//         setFilteredProducts([...filteredProducts, ...resp.data.products])
//       }
//     })
//   }
//
//     return (
//         <div>
//           {/* <h1>{JSON.stringify(qs.parse(history.location.search))}</h1> */}
//           <div className="container">
//                 <div className="row filter_top_row">
//
//                     <Breadcrumb >
//                         <Breadcrumb.Item>
//                             <i className="far fa-home-alt"></i>
//                             <Link to="/">Home</Link >
//                         </Breadcrumb.Item>
//
//
//                         <Breadcrumb.Item onClick={handleClick} id={breadcrumbsData2.id}>{breadcrumbsData2.name}</Breadcrumb.Item>
//                         { breadcrumbsData2.subCategory && breadcrumbsData2.subCategory.map(bData=> (
//                             <>
//                                 <Breadcrumb.Item onClick={handleClick} id={bData.id}>{bData.name}</Breadcrumb.Item>
//                                 { bData.items &&
//                                 <Breadcrumb.Item
//                                     onClick={handleClick} id={bData.id}
//                                 >{queryObject.slug}
//                                 </Breadcrumb.Item>}
//                             </>
//                         ))}
//
//                     </Breadcrumb>
//
//                     <h4>{queryObject.slug}</h4>
//                     <i className="fa fa-sort"></i>
//                 </div>
//
//                   <div className="d-flex row">
//                      <div className="col">
//                         { isEntryLevel && (
//                             <FilterSidebar  queryObject={queryObject} />
//                           )
//                         }
//                     </div>
//                      <div className="col product_content">
//
//                       {  isEntryLevel &&
//                         <div>
//                           <h3>Products Fetch {filteredProducts.length} of {totalItems}</h3>
//
//                           <div className="d-flex product-gallery">
//                               { filteredProducts && filteredProducts.length > 0  ? filteredProducts.map((p: any)=> (
//                                   <div className="product">
//                                       <Image  src={"df"}/>
//                                       <h5 className="product_name">{p.title}  </h5>
//                                       <h5 className="product_price">${p.price}</h5>
//                                       <button>Add To Cart</button>
//                                       <Link to={`/products/${p._id}`}>Details</Link>
//                                   </div>
//                                 )) : (
//                                     <h1>No Products found on Database.</h1>
//                                 )
//                               }
//                             </div>
//                               <div style={{textAlign: "center"}}>
//                              { loadingStatus === "loadStart" ? (
//                                 <Spin />
//                               ) : (
//                                   filteredProducts.length !== totalItems && <Button onClick={loadMoreProductHandler} >Load More</Button>
//                                 )
//                               }
//                                 </div>
//                           </div>
//
//                         }
//
//                         { !isEntryLevel &&
//                             <div>
//                                 { Object.keys(subcategorySectionsProduct).map(section=>(
//                                     <div>
//
//                                         <div className="product_section_header">
//                                             <h1>{section}</h1>
//                                             <Button>
//                                                 <Link
//                                                 to={`/products/?type=${"category"}&id=${subcategorySectionsProduct[section][0].category_id}&slug=${section}`}>
//                                                     See More</Link>
//                                             </Button>
//
//                                         </div>
//
//                                       <div className="flex product-gallery">
//                                         {  subcategorySectionsProduct[section].map(prod=>(
//                                             <div>
//                                                 <Image src={"df"}/>
//                                                 <h5>{prod.title}</h5>
//                                                 <Link to={`/products/${prod._id}`}>Details</Link>
//                                             </div>
//                                             ))
//                                         }
//                                       </div>
//                                     </div>
//                                 )) }
//                             </div>
//
//                         }
//                 </div>
//               </div>
//
//           </div>
//
//         </div>
//       )
// }
//
// //         <div>
//
// //             {/* <h1>{JSON.stringify(qs.parse(history.location.search))}</h1>  */}
//
// //             <div className="container">
// //                 <div className="row filter_top_row">
//
// //                     <Breadcrumb >
// //                         <Breadcrumb.Item>
// //                             <i className="far fa-home-alt"></i>
// //                             <Link to="/">Home</Link >
// //                         </Breadcrumb.Item>
//
//
// //                         <Breadcrumb.Item onClick={handleClick} id={breadcrumbsData2.id}>{breadcrumbsData2.name}</Breadcrumb.Item>
// //                         { breadcrumbsData2.subCategory && breadcrumbsData2.subCategory.map(bData=> (
// //                             <>
// //                                 <Breadcrumb.Item onClick={handleClick} id={bData.id}>{bData.name}</Breadcrumb.Item>
// //                                 { bData.items &&
// //                                 <Breadcrumb.Item
// //                                     onClick={handleClick} id={bData.id}
// //                                 >{queryObject.slug}
// //                                 </Breadcrumb.Item>}
// //                             </>
// //                         ))}
//
// //                     </Breadcrumb>
//
//
// //                     <h4>{queryObject.slug}</h4>
// //                     <i className="fa fa-sort"></i>
// //                 </div>
//
// //                 <div className="d-flex row">
// //                     <div className="col">
// //                         // { isEntryLevel && (
// //                         //     <FilterSidebar queryObject={queryObject} />
// //                         //     )
// //                         // }
// //                     </div>
//
//
// //                     <div className="col product_content">
//
// //                           {  isEntryLevel &&
//
// //                             <div className="d-flex Product-gallery">
// //                                 { filteredProducts && filteredProducts.length > 0  ? filteredProducts.map(p=> (
// //                                     <div className="Product">
// //                                         <Image />
// //                                         <h5 className="product_name">{p.name}</h5>
// //                                         <h5 className="product_price">${p.price}</h5>
// //                                         <button>Add To Cart</button>
// //                                         <Link to={`/products/${p.id}`}>Details</Link>
// //                                     </div>
// //                                   )) : (
// //                                       <h1>No products found on Database.</h1>
// //                                   )
// //                                 }
// //                               </div>
//
// //                             }
//
// //                             { !isEntryLevel &&
// //                                 <div>
// //                                     { Object.keys(subcategorySectionsProduct).map(section=>(
// //                                         <div>
//
// //                                             <div className="product_section_header">
// //                                                 <h1>{section}</h1>
// //                                                 <Button>
// //                                                     <Link
// //                                                     to={`/products/?type=${"entry_category"}&id=${subcategorySectionsProduct[section][0].category_id}&slug=${section}`}>
// //                                                         See More</Link>
// //                                                 </Button>
//
// //                                             </div>
//
// //                                           <div className="d-flex">
// //                                             {  subcategorySectionsProduct[section].map(prod=>(
// //                                                 <div>
// //                                                     <Image/>
// //                                                     <h5>{prod.name}</h5>
// //                                                     <Link to={`/products/${prod.id}`}>Details</Link>
// //                                                 </div>
// //                                                 ))
// //                                             }
// //                                           </div>
// //                                         </div>
// //                                     )) }
// //                                 </div>
//
// //                             }
//
// //                     </div>
//
// //                 </div>
//
// //             </div>
//
//
// //         </div>
// //     )
// // }
//
// const Item = (props)=>{
//
//     return (
//         <div onClick={(e)=>props.onClick(props) } className="breadcrumb_item">
//             { props.children }
//         </div>
//
//     )
// }
//
//
// const Breadcrumb = (props)=>{
//     return (
//         <div className="breadcrumbs">
//             {props.children }
//         </div>
//
//     )
// }
//
// Breadcrumb.Item = Item
//
//
//
//
//
// export default Products
//
