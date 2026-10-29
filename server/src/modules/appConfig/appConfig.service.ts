import AppConfig, {AppConfigType} from "../../models/AppConfig";
import fs from "fs";
import path from "path";

class AppConfigService {
    private localFallbackPath = path.resolve(__dirname, "../../data/app_configs.json");

    private getFallbackConfigs(): AppConfigType[] {
        try {
            if (fs.existsSync(this.localFallbackPath)) {
                const content = fs.readFileSync(this.localFallbackPath, "utf8");
                return JSON.parse(content);
            }
        } catch (e) {
            console.error("Failed to read fallback app_configs.json:", e);
        }
        return [];
    }

    async getAllConfigs(): Promise<AppConfigType[]> {
        try {
            const collection = await AppConfig.collection;
            let configs = await collection.find({}).toArray();
            if (configs && configs.length > 0) {
                return configs as unknown as AppConfigType[];
            }
            // If collection is empty, auto-seed defaults into MongoDB
            const fallbacks = this.getFallbackConfigs();
            if (fallbacks.length > 0) {
                await collection.insertMany(fallbacks as any[]);
                return fallbacks;
            }
        } catch (e) {
            console.error("Error querying app_configs from MongoDB:", e);
        }
        return this.getFallbackConfigs();
    }

    async getConfigByKey(key: string): Promise<AppConfigType | null> {
        try {
            const collection = await AppConfig.collection;
            const config = await collection.findOne({ key });
            if (config) {
                return config as unknown as AppConfigType;
            }
            // If not found in DB, check fallback and persist if available
            const fallbacks = this.getFallbackConfigs();
            const found = fallbacks.find(c => c.key === key);
            if (found) {
                try {
                    await collection.insertOne(found as any);
                } catch (e) {}
                return found;
            }
        } catch (e) {
            console.error(`Error querying config '${key}' from MongoDB:`, e);
        }

        // Fallback to local JSON
        const fallbacks = this.getFallbackConfigs();
        const found = fallbacks.find(c => c.key === key);
        return found || null;
    }

    async saveOrUpdateConfig(key: string, payload: Partial<AppConfigType>): Promise<AppConfigType> {
        const collection = await AppConfig.collection;
        const now = new Date();

        const updateDoc: any = {
            updatedAt: now
        };

        if (payload.data !== undefined) updateDoc.data = payload.data;
        if (payload.label !== undefined) updateDoc.label = payload.label;
        if (payload.description !== undefined) updateDoc.description = payload.description;
        if (payload.isActive !== undefined) updateDoc.isActive = payload.isActive;

        const result = await collection.findOneAndUpdate(
            { key },
            {
                $set: updateDoc,
                $setOnInsert: {
                    key,
                    createdAt: now
                }
            },
            {
                upsert: true,
                returnDocument: "after"
            }
        );

        // Update local file cache in background for resilience
        try {
            const all = await collection.find({}).toArray();
            fs.writeFileSync(this.localFallbackPath, JSON.stringify(all, null, 2), "utf8");
        } catch (err) {
            // non-blocking
        }

        return (result?.value || result) as unknown as AppConfigType;
    }

    async deleteConfig(key: string): Promise<boolean> {
        const collection = await AppConfig.collection;
        const res = await collection.deleteOne({ key });
        return res.deletedCount > 0;
    }
}

export default new AppConfigService();
