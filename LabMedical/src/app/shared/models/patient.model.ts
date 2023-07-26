import { CivilStatusEnum } from "../enums/civil-status.enum";

export interface Patient {
	id?: number;
	name: string;
	gender: string;
	dob: string;
	cpf: string;
	rg: string,
	civilStatus: CivilStatusEnum;
	phone: string;
	email: string;
	nationality: string;
	emergencyContact: string;
	alergies?: string[];
	specialCare?: string[];
	healthInsurance?: string;
	healthInsuranceNumber?: string;
	healthInsuranceExpirationDate?: string;
	address: {
		cep: string;
		city: string;
		state: string;
		street: string;
		houseNumber: string;
		complement: string;
		district: string;
		referencePoint: string;
	}
	role?: string;
	isActive?: boolean;
}