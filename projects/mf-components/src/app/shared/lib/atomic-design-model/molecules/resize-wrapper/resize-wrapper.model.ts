export interface DimensionElements {
    [key: string] : Dimension
}

export interface Dimension {
    width: number;
    height: number | string;
}