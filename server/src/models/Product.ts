
import Base from "./Base";


export interface ProductType{
  title?: string,
  price?: number,
  discount?: number
  customer_id?: object | string
  created_at?: Date,
  attributes?: object,
  cover_photo?: string,
  images?: string[],
  updated_at?: Date,
  seller_id?: object | string
  _id?: string
  category_id?: object | string
  brand_id?: object  | string
  qty?: number,
  sold?: number,
  views?: number,
}

class Product extends Base{
  protected fields?: ProductType = {
    title: "",
    price: 0,
    discount: 0,
    customer_id: "",
    created_at: undefined,
    attributes: {},
    cover_photo: "",
    images: [],
    updated_at: undefined,
    seller_id: "",
    _id: "",
    category_id: "",
    brand_id: "",
    qty: 0,
    sold: 0,
    views: 0,
  };
  
  // protected client?: mongoDB.MongoClient
  // protected collection?: mongoDB.Collection
  
  static collectionName = "products"
  
  constructor(fields?: ProductType) {
    super(Product.collectionName)
    this.fields = fields
  }
  
  
  // // getCollection with Static Method............
  // static getCollection(){
  //   return new Promise<{collection: mongoDB.Collection, client: mongoDB.MongoClient}>(async (resolve, reject)=>{
  //     try {
  //       let {c, client} = await dbConnect("products")
  //       resolve({collection: c, client: client})
  //     } catch (ex){
  //       reject({collection: undefined, client: undefined})
  //     }
  //   })
  //
  // }
  
  
  
  
}

export default Product






