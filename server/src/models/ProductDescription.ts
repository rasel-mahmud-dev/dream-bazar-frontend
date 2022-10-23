import Base from "./Base";

export interface ProductDescriptionType{
  _id?: string,
  product_id?: string
  description?: string
  details?: {}
  highlight?: string[],
  seller_rules?: string[],
  created_at?: Date,
  updated_at?: Date,
  seller_id?: string,
}


class ProductDescription extends Base{
  protected fields?: ProductDescriptionType = {
    _id: "",
    product_id: "",
    created_at: undefined,
    updated_at: undefined,
    description: "",
    seller_id: "",
    details: {},
    highlight: [],
    seller_rules: []
  };
  
  static collectionName = "product_descriptions"
  
  constructor(fields?: ProductDescriptionType) {
    super(ProductDescription.collectionName)
    this.fields = fields
  }
  
}

export default ProductDescription