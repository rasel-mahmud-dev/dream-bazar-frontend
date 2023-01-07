function convStringToNumber(value: string) {
    if (!value) return ""
    let convertValue = Number(value);
    if (!isNaN(convertValue)) {
        return convertValue;
    } else {
        return value;
    }
}


export default convStringToNumber