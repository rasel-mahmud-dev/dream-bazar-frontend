import Brand from "../../models/Brand";

class BrandService {
    async getBrands() {
        return await Brand.find({})
    }
}


export default new BrandService();
