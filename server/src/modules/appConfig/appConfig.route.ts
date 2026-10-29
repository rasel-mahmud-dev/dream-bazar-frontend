import {Router} from "express";
import AppConfigController from "./appConfig.controller";

const router = Router();

router.get("/", AppConfigController.getAllConfigs);
router.get("/:key", AppConfigController.getConfigByKey);
router.post("/", AppConfigController.saveOrUpdateConfig);
router.put("/:key", AppConfigController.saveOrUpdateConfig);
router.patch("/:key", AppConfigController.saveOrUpdateConfig);
router.delete("/:key", AppConfigController.deleteConfig);

export default router;
