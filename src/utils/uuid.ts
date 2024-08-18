const generateUniqueId = (): string => {
	return `id-${Math.random().toString(36).slice(2, 11)}-${Date.now().toString(36)}`;
};

export default generateUniqueId;
