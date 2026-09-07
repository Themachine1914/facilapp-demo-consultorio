import { localDb, uid } from '../services/localDb'
import type { Appointment, Patient } from '../types'

const SEED_FLAG = 'fa_demo_consultorio_seeded'

function nextWeekday(from: Date, weekday: number): string {
  const d = new Date(from)
  d.setHours(12, 0, 0, 0)
  while (d.getDay() !== weekday) d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

export function applyDemoSeed(): void {
  if (typeof window === 'undefined') return
  if (localStorage.getItem(SEED_FLAG) === '1') return

  const now = new Date().toISOString()
  const mon = nextWeekday(new Date(), 1)
  const tue = nextWeekday(new Date(), 2)
  const wed = nextWeekday(new Date(), 3)

  const patients: Patient[] = [
    { id: 'seed-p1', name: 'Ana Pérez Demo', phone: '8095550201', email: 'ana.demo@facilapp.do', privateNotes: 'Paciente semilla — Santo Domingo', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p2', name: 'Luis Gómez Demo', phone: '8295550202', email: 'luis.demo@facilapp.do', privateNotes: 'Paciente semilla — Santiago', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p3', name: 'María Rosario Demo', phone: '8495550203', email: 'maria.demo@facilapp.do', privateNotes: 'Paciente semilla — La Vega', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p4', name: 'Carlos Núñez Demo', phone: '8095550204', email: 'carlos.demo@facilapp.do', privateNotes: 'Paciente semilla — SDN', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p5', name: 'Elena Castillo Demo', phone: '8295550205', email: 'elena.demo@facilapp.do', privateNotes: 'Paciente semilla — Santiago', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p6', name: 'Pedro Alcántara Demo', phone: '8495550206', email: 'pedro.demo@facilapp.do', privateNotes: 'Paciente semilla — Bávaro', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p7', name: 'Sofía Méndez Demo', phone: '8095550207', email: 'sofia.demo@facilapp.do', privateNotes: 'Paciente semilla — Santo Domingo', createdAt: now, updatedAt: now, isSeed: true },
    { id: 'seed-p8', name: 'José Tejada Demo', phone: '8295550208', email: 'jose.demo@facilapp.do', privateNotes: 'Paciente semilla — Santiago', createdAt: now, updatedAt: now, isSeed: true },
  ]

  const appointments: Appointment[] = [
    { id: uid('seed-a'), reference: 'DEMO-1001', patientId: 'seed-p1', patientName: patients[0].name, patientPhone: patients[0].phone, patientEmail: patients[0].email, sessionType: 'individual', price: 3500, date: mon, time: '09:00', modality: 'virtual', status: 'confirmed', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1002', patientId: 'seed-p2', patientName: patients[1].name, patientPhone: patients[1].phone, patientEmail: patients[1].email, sessionType: 'couple_family', price: 4000, date: mon, time: '11:00', modality: 'virtual', status: 'pending', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1003', patientId: 'seed-p3', patientName: patients[2].name, patientPhone: patients[2].phone, patientEmail: patients[2].email, sessionType: 'individual', price: 3500, date: tue, time: '10:00', modality: 'virtual', status: 'confirmed', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1004', patientId: 'seed-p4', patientName: patients[3].name, patientPhone: patients[3].phone, patientEmail: patients[3].email, sessionType: 'individual', price: 3500, date: tue, time: '14:00', modality: 'virtual', status: 'pending', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1005', patientId: 'seed-p5', patientName: patients[4].name, patientPhone: patients[4].phone, patientEmail: patients[4].email, sessionType: 'couple_family', price: 4000, date: wed, time: '09:00', modality: 'virtual', status: 'confirmed', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1006', patientId: 'seed-p6', patientName: patients[5].name, patientPhone: patients[5].phone, patientEmail: patients[5].email, sessionType: 'individual', price: 3500, date: wed, time: '12:00', modality: 'virtual', status: 'pending', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1007', patientId: 'seed-p7', patientName: patients[6].name, patientPhone: patients[6].phone, patientEmail: patients[6].email, sessionType: 'individual', price: 3500, date: wed, time: '15:00', modality: 'virtual', status: 'confirmed', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
    { id: uid('seed-a'), reference: 'DEMO-1008', patientId: 'seed-p8', patientName: patients[7].name, patientPhone: patients[7].phone, patientEmail: patients[7].email, sessionType: 'individual', price: 3500, date: tue, time: '15:00', modality: 'virtual', status: 'completed', notes: 'Cita semilla', paymentProofUrl: '', createdAt: now, updatedAt: now, isSeed: true },
  ]

  localDb.savePatients(patients)
  localDb.saveAppointments(appointments)
  const nowIso = new Date().toISOString()
  localDb.saveSlots(
    appointments
      .filter((a) => a.status === 'pending' || a.status === 'confirmed')
      .map((a) => ({
        id: `${a.date}_${a.time}`,
        date: a.date,
        time: a.time,
        createdAt: nowIso,
      })),
  )
  localStorage.setItem(SEED_FLAG, '1')
}
