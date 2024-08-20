import { TYPE_JSON } from '../core/const';

// Descargar archivo JSON
export const jsonGenerate = ({ json }: { json: string }): void => {
	const blobJson = new Blob([json], { type: TYPE_JSON });
	const urlJson = URL.createObjectURL(blobJson);
	const linkJson = document.createElement('a');
	linkJson.href = urlJson;
	linkJson.download = 'data.json';
	linkJson.click();
};

export const jsonReader = (e: ProgressEvent<FileReader>): string => {
	const file = e.target?.result;
	return file && typeof file === 'string' ? file : '[]';
};
