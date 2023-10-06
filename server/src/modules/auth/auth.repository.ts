import pool from "../../database";

class AuthRepository {

    async getUserByEmail(email: string) {
        let result = await pool.query(`select *  from users where email = $1`, [email])
        return result.rows[0]
    }

    async getUserByUserId(userId: string) {
        let result = await pool.query(`select * from users  where id = $1`, [userId])
        return result.rows[0]
    }

    async getLoggedUserInfo(
        email: string
    ): Promise<
        | {
        user_id: string;
        email: string;
        is_first_signin: boolean;
        user_name: string;
        password: string;
        access_token?: string;
        user_agent?: string;
        user_ip?: string;
        session_id?: string
    }
        | undefined
    > {
        const query = {
            text: `
                SELECT u.user_id,
                       u.user_email,
                       u.is_first_signin,
                       u.user_name,
                       u.password,
                       ac.access_token,
                       ac.user_ip,
                       ac.user_agent,
                       ac.session_id
                FROM users u
                         LEFT JOIN auth_credential ac ON u.user_id = ac.user_id
                WHERE u.email = $1`,
            values: [email],
        };
        const result = await pool.query(query);
        return result?.rows[0];
    }

    async updateAuthCredential(data: {
        userAgent?: string;
        ipAddress?: string;
        sessionId?: string;
        userId: string;
        accessToken?: string;
    }) {
        const {
            userAgent = "",
            ipAddress = "",
            sessionId = "",
            userId,
            accessToken = "",
        } = data;

        const query = `
            INSERT INTO auth_credential (user_id, user_agent, user_ip, session_id, status, access_token)
            VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (user_id) DO
            UPDATE
                SET
                    user_id = EXCLUDED.user_id,
                user_agent = EXCLUDED.user_agent,
                user_ip = EXCLUDED.user_ip,
                session_id = EXCLUDED.session_id,
                status = EXCLUDED.status,
                access_token = EXCLUDED.access_token
        `;
        const values = [
            userId,
            userAgent,
            ipAddress,
            sessionId,
            "SignIn",
            accessToken,
        ];
        return await pool.query(query, values);
    }

    async createSignInHistory(
        userId: string,
        userAgent: string = "",
        userIp: string = "",
        status = "SignIn"
    ) {
        const insertQuery = `INSERT INTO signin_log(user_id, user_agent, user_ip, signin_time, status)
                             VALUES ($1, $2, $3, $4, $5)`;
        return await pool.query(insertQuery, [
            userId,
            userAgent,
            userIp,
            Date.now(),
            status,
        ]);
    }

    async getRecentPasswordRepo(userId: string) {
        return await pool.query(
            `select password
             from recent_password
             where user_id = $1
             ORDER BY changed_at LIMIT $2`,
            [userId, 6]
        );
    }

    async isUsedPassword(userId: string, password: string) {
        let recentPass = await this.getRecentPasswordRepo(userId);
        let hasUsed = false;

        for (const element of recentPass.rows) {
            if (await bcrypt.compare(password, element.password)) {
                hasUsed = true;
                break;
            }
        }
        return hasUsed;
    }

    async storeOldPassword(oldPassword: string, userId: string, maxRow?: number) {
        try {
            const {rows} = await pool.query(
                "select id from recent_password where user_id = $1 order by id asc",
                [userId]
            );
            if (rows.length >= (maxRow || 5)) {
                return await pool.query(`DELETE
                                         FROM recent_password
                                         WHERE id = $1`, [
                    rows[0].id,
                ]);
            }
            return await pool.query(
                `INSERT INTO recent_password("password", "user_id", "changed_at")
                 VALUES ($1, $2, $3)`,
                [oldPassword, userId, Date.now()]
            );
        } catch (e) {
            return null;
        }
    }

    async updatePasswordRepo(userId: string, newPassword: string) {
        return await pool.query(
            "UPDATE users SET password = $1, is_first_signin = false WHERE user_id = $2",
            [newPassword, userId]
        );
    }

    async setUpNewPasswordRepo(data: { userId: string; hash: string }) {
        const {userId, hash} = data;
        await pool.query(
            "UPDATE users SET password = $1, is_first_signin = false WHERE user_id = $2",
            [hash, userId]
        );
        return {isFirstSignIn: false};
    }

    async clearAllRecentPassword(userId: string) {
        return await pool.query(`DELETE
                                 FROM recent_password
                                 WHERE user_id = $1`, [
            userId,
        ]);
    }

    async changeSignInLogStatus(userId: string) {
        try {
            return await pool.query(
                `
        UPDATE signin_log 
            SET 
                status = 'Signout',
                signout_time = $1
            WHERE 
                user_id = $2`,
                [Date.now(), userId]
            );
        } catch (ex) {}
    }

}

export default (new AuthRepository())