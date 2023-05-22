import {ApproveStatus} from "src/types/enum";

const approveColors = {
    [ApproveStatus.Pending]: {
        bg: "#eaeaea",
        text: "#5d5d5d"
    },
    [ApproveStatus.Rejected]: {
        bg: "rgba(255,45,45,0.14)",
        text: "#ff2f2f"
    },
    [ApproveStatus.Accepted]: {
        bg: "rgba(44,101,236,0.38)",
        text: "#2c65ec"
    }
}
export default approveColors