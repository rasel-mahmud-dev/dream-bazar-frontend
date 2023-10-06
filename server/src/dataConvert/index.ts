export class Covert{
    static boolean(str: string | boolean): boolean{
        return !!str && str === "true"
    }
    static number(str: string) {
        return (!isNaN(Number(str)) && parseInt(str)) || 0
    }
}
