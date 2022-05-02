export class StringUtilities {
    static getValueBetweenTwoCharacters(value: string, characterStart:string , characterEnd: string) {
        return value.substring(
            value.indexOf(characterStart) + characterStart.length, 
            value.lastIndexOf(characterEnd)
        );
    }

    static getAllValueBetweenCharacters(characterStart:string , characterEnd: string) {
        const matcher = new RegExp(`${characterStart}(.*?)${characterEnd}`,'gm');
        const normalise = (str: string) => str.slice(characterStart.length,characterEnd.length*-1);
        return function(str: string) {
            return str.match(matcher)?.map(normalise);
        }
    }
}