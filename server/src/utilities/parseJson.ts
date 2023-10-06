function parseJson(str: string) {
    return new Promise<any>((resolve, _) => {
        try {
            if (str) {
                let data = JSON.parse(str);
                resolve(data)
            } else {
                resolve(null)
            }
        } catch (__) {
            resolve(null)
        }
    })
}


export default parseJson