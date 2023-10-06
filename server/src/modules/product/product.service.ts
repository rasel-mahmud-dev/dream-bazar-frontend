import AdminRepository from "./product.repository";
import RoleRepository from "./product.repository";

class ProductService {
    getAllUsers(){
        return RoleRepository.getAllUsers()
    }

    getAllRoles(){
        return RoleRepository.getRoles()
    }

    getAllFeatures(){
        return RoleRepository.getFeatures()
    }
}


export default new ProductService();
