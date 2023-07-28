import { MedicineType } from "../enums/medicine-type.enum"
import { MeasurementUnit } from "../enums/measurement-unit.enum"
export function Medicine() {
    return {
        comments: '',
        id: '',
        measurementUnit: 'MILLIGRAM',
        medicineDate: '',
        medicineName: '',
        pacientId: '',
        quantity: '',
        status: '',
        time: '',
        type: 'CAPSULE'
    }
}

export function newMedicine(campos: any, status:boolean) {
    return {
        comments: campos.comments.value,
        measurementUnit: campos.measurementUnit.value,
        medicineDate: campos.data.value,
        medicineName: campos.medicineName.value,
        pacientId: localStorage.getItem('patientId'),
        quantity: campos.quantity.value,
        status: status,
        time: campos.hora.value,
        type: campos.medicineType.value
    }
}