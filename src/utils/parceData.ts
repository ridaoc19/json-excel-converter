import { InitialStateContext } from '../types/context';
import { excelToJson } from './excelToJson';
import { DomainType, jsonToExcel } from './jsonToExcel';

type ParceData = (
	data: SheetToJsonOutput | InitialStateContext['json']
) => Pick<InitialStateContext, 'excel' | 'json'>;

export const parceData: ParceData = payload => {
	// Caso donde payload es un JSON string
	if (typeof payload === 'string') {
		let parseJson: DomainType;

		try {
			parseJson = JSON.parse(payload) as DomainType;
		} catch (e) {
			throw new Error('Invalid JSON string');
		}

		const { excel, json } = jsonToExcel(parseJson);
		return { excel, json };
	}

	// Caso donde payload es un objeto Excel
	const { excel, json } = excelToJson(payload as SheetToJsonOutput);
	return { excel, json };
};
