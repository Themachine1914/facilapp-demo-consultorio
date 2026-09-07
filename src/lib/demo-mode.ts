export const DEMO = {
  email: 'demo@facilapp.do',
  password: 'Demo1234!',
  banner: 'DEMO FacilApp — datos de prueba, no es una cuenta real',
  categoria: 'consultorio / citas',
} as const

export function demoWhatsAppNumber(): string {
  return String(
    import.meta.env.VITE_FACILAPP_WHATSAPP || '18090000000',
  ).replace(/\D/g, '')
}
