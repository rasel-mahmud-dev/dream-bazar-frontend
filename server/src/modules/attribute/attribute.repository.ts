
class RoleRepository {
    async getAllUsers() {
        const result = await pool.query("select * from users")
        return result.rows
    }

    async getRoles() {
        let result = await pool.query(`select * from roles`)
        return result.rows
    }

    async getFeatures() {
        let result = await pool.query(`select * from features`)
        return result.rows
    }
}

export default new RoleRepository();
