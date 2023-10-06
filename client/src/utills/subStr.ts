

function subStr(value = "", char = 20) {
    return value.length > char ? value.substring(0, char) + "..." : value
}

export default subStr