type EnumType = { [s: number | string]: string };

export class ObjectUtilities {
    static EnumToObject(enumerable: EnumType) {
        return Object.keys(enumerable).reduce((currentResult, key) => {
            return {
                ...currentResult,
                [key]: enumerable[key]
            };
        }, {} as Record<string | number, any>)
    }
}