declare type CellData = string | number | boolean;
declare type HeaderRow = string[];
declare type RowData = CellData[];
declare type SheetToJsonOutput = [HeaderRow, ...RowData[]];

declare interface Excel {
	header: HeaderRow;
	rows: RowData[];
}

declare interface GlobalData {
	excel: { header: HeaderRow; rows: RowData[] };
	json: string;
}

declare interface ErrorLocal {
	id: string;
	message: string;
	row: number | null;
}

declare type HandleClick = (event: MouseEvent<HTMLButtonElement>) => void;
declare type HandleChangeText = (event: ChangeEvent<HTMLInputElement>) => void;
