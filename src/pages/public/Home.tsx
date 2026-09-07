import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake, Users, Video } from 'lucide-react'

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-50 via-cream-50 to-lavender-50">
        <div className="relative mx-auto flex min-h-[calc(100svh-6.5rem)] max-w-6xl items-center px-4 py-16 sm:px-6">
          <div className="max-w-lg fade-up">
            <p className="text-xs font-semibold uppercase tracking-wider text-sage-600">
              Demo FacilApp · consultorio
            </p>
            <h1 className="mt-3 font-display text-[2.15rem] leading-[1.12] text-ink sm:text-5xl">
              Agenda de citas para un consultorio.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/80 sm:text-base">
              Datos de prueba. Pacientes y horarios inventados. No es una
              cuenta real ni el consultorio de un cliente.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/agendar"
                className="inline-flex items-center gap-2 rounded-full bg-sage-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sage-600"
              >
                Probar agendar
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center rounded-full border border-sage-600/40 bg-transparent px-5 py-2.5 text-sm font-medium text-sage-700"
              >
                Panel admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-sage-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Video,
              title: 'Citas virtuales',
              text: 'Calendario, cupos y confirmación desde el panel.',
            },
            {
              icon: Users,
              title: 'Pacientes demo',
              text: 'Nombres inventados. Santo Domingo, Santiago, La Vega.',
            },
            {
              icon: HeartHandshake,
              title: 'Sin pagos reales',
              text: 'Transferencias y comprobantes están desactivados.',
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                <item.icon size={20} />
              </div>
              <h2 className="font-display text-2xl text-ink">{item.title}</h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
