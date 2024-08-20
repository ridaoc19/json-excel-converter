declare type CellData = string | number | boolean;
declare type JsonData = Record<string, string | number | boolean | null>;
declare type HeaderRow = string[]; // Header row type
declare type RowData = CellData[];
declare type SheetToJsonOutput = [HeaderRow, ...RowData[]];

declare interface GlobalData {
	excel: { header: HeaderRow; rows: RowData[] };
	json: string;
}

declare interface Excel {
	header: string[];
	rows: RowData[];
}
declare interface ErrorLocal {
	id: string;
	message: string;
	row: number | null;
}
