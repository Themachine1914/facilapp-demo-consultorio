import type { AppSettings, AvailabilityConfig } from '../types'

export const DEFAULT_SETTINGS: AppSettings = {
  practiceName: 'FacilApp Demo Consultorio',
  professionalName: 'Dra. Ana Demo, M.A.',
  credentials: 'Psicoterapia clínica · Citas virtuales (datos de prueba)',
  titles: 'Consultorio demo FacilApp',
  codopsi: '00-00000',
  exequatur: '000-00',
  instagram: '',
  modality: 'virtual',
  sessionTypes: [
    {
      id: 'individual',
      label: 'Individual',
      durationMinutes: 50,
      priceDop: 3500,
    },
    {
      id: 'couple_family',
      label: 'Pareja / Familia',
      durationMinutes: 50,
      priceDop: 4000,
    },
  ],
  bankAccounts: [],
  paymentInstructions:
    'DEMO FacilApp: los pagos reales están desactivados. Agenda sin transferencia.',
}

export const PRACTICE_WEEKDAYS = [1, 2, 3]

export const DEFAULT_AVAILABILITY: AvailabilityConfig = {
  activeDays: [...PRACTICE_WEEKDAYS],
  slots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
  sessionDurationMinutes: 50,
  blockedDates: [],
}

export const MAX_SLOTS_PER_DAY = 6

export const EDUCATION = [
  'Licenciatura en Psicología — universidad de demostración (RD)',
  'Maestría en terapia familiar — programa de muestra',
  'Diplomado en teleconsulta — datos inventados',
]

export const EXPERIENCE = [
  'Consulta virtual de demostración en Santo Domingo',
  'Agenda de prueba con pacientes ficticios',
  'Esta ficha no corresponde a un profesional real',
]
