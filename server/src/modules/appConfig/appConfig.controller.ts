import {NextFunction, Request, Response} from "express";
import {errorResponse, successResponse} from "../../response";
import {StatusCode} from "../../types";
import AppConfigService from "./appConfig.service";

class AppConfigController {
    async getAllConfigs(req: Request, res: Response, next: NextFunction) {
        try {
            const configs = await AppConfigService.getAllConfigs();
            successResponse(res, StatusCode.Ok, configs);
        } catch (ex) {
            next(ex);
        }
    }

    async getConfigByKey(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.params.key;
            if (!key) {
                return errorResponse(next, "Configuration key is required", StatusCode.BadRequest);
            }
            const config = await AppConfigService.getConfigByKey(key);
            if (!config) {
                return errorResponse(next, `Configuration for key '${key}' not found`, StatusCode.NotFound);
            }
            successResponse(res, StatusCode.Ok, config);
        } catch (ex) {
            next(ex);
        }
    }

    async saveOrUpdateConfig(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.params.key || req.body.key;
            if (!key) {
                return errorResponse(next, "Configuration key is required", StatusCode.BadRequest);
            }

            const updated = await AppConfigService.saveOrUpdateConfig(key, req.body);
            successResponse(res, StatusCode.Ok, {
                message: `Configuration '${key}' saved successfully`,
                config: updated
            });
        } catch (ex) {
            next(ex);
        }
    }

    async deleteConfig(req: Request, res: Response, next: NextFunction) {
        try {
            const key = req.params.key;
            if (!key) {
                return errorResponse(next, "Configuration key is required", StatusCode.BadRequest);
            }
            const deleted = await AppConfigService.deleteConfig(key);
            if (!deleted) {
                return errorResponse(next, `Configuration '${key}' not found or already deleted`, StatusCode.NotFound);
            }
            successResponse(res, StatusCode.Ok, {
                message: `Configuration '${key}' deleted successfully`
            });
        } catch (ex) {
            next(ex);
        }
    }
}

export default new AppConfigController();
