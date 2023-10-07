import Attributes from "../../models/Attributes";
import {StatusCode} from "../../types";
import throwError from "../../utilities/throwError";
import {ObjectId} from "mongodb";

class AttributeService {

    async getAttributes() {
        return await Attributes.find()
    };

    async createAttribute(body: any) {
        try {
            const {
                attributeName,
                attributeLabel,
                isRange = false,
                options,
            } = body

            let attribute = await Attributes.findOne({attributeName: attributeName})
            if (attribute) return throwError("Attribute already exists", StatusCode.Conflict);

            let attr: any = new Attributes({
                attributeName,
                attributeLabel,
                isRange,
                options,
            })

            return await attr.save()

        } catch (ex) {
            throw ex
        }
    };

    async updateAttribute(id: string, body: any) {
        try {
            const attributeId = id
            const {
                attributeName,
                attributeLabel,
                isRange = false,
                options,
            } = body

            let updateData = {}

            if (attributeName) updateData["attributeName"] = attributeName
            if (attributeLabel) updateData["attributeLabel"] = attributeLabel
            if (isRange) updateData["isRange"] = isRange
            if (options) updateData["options"] = options

            let isUpdated = await Attributes.findOneAndUpdate(
                {_id: new ObjectId(attributeId)},
                {$set: updateData}
            )

            return updateData

        } catch (ex) {
            throw ex
        }
    };
}

export default new AttributeService();
