interface BrandType {
    id?: number
    name: string
    logo?: string
    forCategory?: string[]
}

class Brand implements BrandType{
    id?: number
    name: string
    logo?: string
    forCategory?: string[]
    constructor(data: BrandType) {
        this.name = data.name
        this.logo =  data.logo
        this.forCategory = data.forCategory
    }
}

export default Brand
