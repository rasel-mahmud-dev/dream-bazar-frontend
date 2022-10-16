import BaseSQLite from "./BaseSQLite";

export interface BrandType {
    id?: number | string
    name?: string
    logo?: string
    forCategory?: string[] |  string
}

class Brand extends BaseSQLite implements BrandType {
    id?: number | string
    name?: string
    logo?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    forCategory?: string[] | string
    
    static tableName = "brands"
    
    
    constructor(data: BrandType) {
        let dateString =  new Date().toISOString();
        super(Brand.tableName)
        this.id = data.id ?? ""
        this.name = data.name
        this.logo =  data.logo
        this.createdAt = dateString
        this.updatedAt = dateString
        this.forCategory = data.forCategory
    }
}

export default Brand
