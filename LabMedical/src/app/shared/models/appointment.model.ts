export interface Appointment {
	id?: number,
	appointmentReason: string,
	appointmentDate: string,
	time: string,
	problemDescription: string,
	dosageAndPrecautions: string,
	isActive: boolean,
	pacientId?: number,
	medicineId?: number
}