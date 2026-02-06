// Province types matching backend API response

export interface Province {
	id: number;
	name: {
		en: string;
		ar: string;
	};
	country: string;
	shippingFee: number;
	isActive: boolean;
}

export interface ProvincesResponse {
	provinces: Province[];
}
