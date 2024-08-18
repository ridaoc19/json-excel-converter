export const jsonGenerate = ({ json }: { json: string }): void => {
	// Descargar archivo JSON
	const blobJson = new Blob([json], { type: 'application/json' });
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
