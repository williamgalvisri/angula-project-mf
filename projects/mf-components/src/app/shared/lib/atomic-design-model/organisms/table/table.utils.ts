import { Table } from "./table.model";

export const tableDataDummy: Table<any> = {
    header: [
        {
            key: 'column1',
            label: 'Colum 1'
        },
        {
            key: 'column2',
            label: 'Colum 2'
        }
    ],
    data: [
        [
            {
                key: 'column1',
                value: 'row 1',
                originalData: {}
            },
            {
                key: 'column2',
                value: 'row 2',
                originalData: {}
            },
        ]
    ]
}