import AdminRepository from "./role.repository";
import RoleRepository from "./role.repository";

class RoleService {
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


export default new RoleService();
