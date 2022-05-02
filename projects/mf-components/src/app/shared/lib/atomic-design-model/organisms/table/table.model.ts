export class TableHeader<T> {
    key: string;
    label: string;

    constructor(item?: TableHeader<T>) {
        this.key = item?.key ?? '';
        this.label = item?.label ?? '';

    }

}
export class TableData<T> {
    key: keyof T | string;
    value: string;
    originalData: T;

    constructor(item?: TableData<T>) {
        this.key = item?.key ?? ''
        this.value = item?.value ?? ''
        this.originalData = item?.originalData ?? {} as T
    }
}

export class Table<T> {
    header: TableHeader<T>[];
    data: Array<Array<TableData<T>>>;

    constructor(item?: Table<T>) {
        this.header = item?.header ?? [];
        this.data = item?.data ?? [];
    }

}
