import { DBRow, DataModel, DBConnect } from "./index";
import { _NanoSQLDB } from "./db-index";
import { Promise } from "lie-ts";
import { Trie } from "prefix-trie-ts";
export interface IHistoryPoint {
    id: number;
    historyPoint: number;
    tableID: number;
    rowKeys: number[];
    type: string;
}
export declare class _NanoSQL_Storage {
    _mode: any;
    _indexedDB: IDBDatabase;
    _parent: _NanoSQLDB;
    _tables: {
        [tableHash: number]: {
            _pk: string;
            _pkType: string;
            _relations: {
                _table: string;
                _key: string;
                _mapTo: string;
                _type: "array" | "single";
            }[];
            _name: string;
            _incriment: number;
            _index: (string | number)[];
            _trieIndex: Trie;
            _secondaryIndexes: string[];
            _trieColumns: string[];
            _trieObjects: {
                [column: string]: Trie;
            };
            _keys: string[];
            _defaults: any[];
            _rows: {
                [key: string]: DBRow | null;
            };
        };
    };
    _utilityTable: {
        [key: string]: {
            key: string;
            value: any;
        };
    };
    _historyPointIndex: {
        [historyPoint: number]: number[];
    };
    _historyLength: number;
    _activeTransactions: number[];
    _persistent: boolean;
    _doHistory: boolean;
    _historyMode: 1 | 2;
    _storeMemory: boolean;
    _savedArgs: DBConnect;
    _levelDBs: {
        [key: string]: any;
    };
    _transactionData: {
        [transactionID: number]: {
            [tableName: string]: {
                type: string;
                key: string | number;
                value: string;
            }[];
        };
    };
    private _rebuildIndexes;
    constructor(database: _NanoSQLDB, args: DBConnect);
    init(database: _NanoSQLDB, args: DBConnect): void;
    _rebuildSecondaryIndex(tableName: string, complete: () => void): void;
    _rebuildTries(callBack: Function): void;
    _execTransaction(transactionID: number): Promise<any[]>;
    _clear(type: "all" | "hist", complete: Function): void;
    _delete(tableName: string, rowID: string | number, callBack?: (success: boolean) => void, transactionID?: number): void;
    _updateSecondaryIndex(newRow: DBRow, tableID: number, callBack?: () => void): void;
    _addHistoryRow(tableID: number, rowData: DBRow, transactionID: number, complete: (rowID: number) => void): void;
    _addHistoryPoint(tableID: number, updatedPKs: any[], describe: string, complete: () => void): void;
    _generateID(type: string, tableHash: number): string | number;
    _upsert(tableName: string, rowID: string | number | null, rowData: any, callBack?: (rowID: number | string) => void, transactionID?: number): void;
    private _indexRead(tableName, rows, callBack, getIndex?);
    _readArray(tableName: string, pkArray: any[], callBack: (rows: DBRow[]) => void): void;
    _readRange(tableName: string, key: string, between: any[], callBack: (rows: DBRow[]) => void): void;
    _read(tableName: string, row: string | number | Function, callBack: (rows: any[]) => void, readIndex?: boolean): void;
    _utility(type: "r" | "w", key: string, value?: any): any;
    _newTable(tableName: string, dataModels: DataModel[]): string;
}
