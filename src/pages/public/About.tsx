import { EDUCATION, EXPERIENCE } from '../../lib/defaults'
import { GraduationCap, Briefcase } from 'lucide-react'

export function AboutPage() {
  return (
    <div>
      <section className="border-b border-sage-100 bg-gradient-to-br from-cream-100 via-sage-50 to-lavender-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-wider text-sage-600">
            Demo FacilApp
          </p>
          <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Dra. Ana Demo, M.A.
          </h1>
          <p className="mt-3 text-lg text-muted">
            Profesional inventada para la demostración. No representa a ninguna
            terapeuta real.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <GraduationCap className="text-sage-500" />
          <h2 className="font-display text-3xl text-ink">Formación (ficticia)</h2>
        </div>
        <ul className="space-y-3">
          {EDUCATION.map((item) => (
            <li
              key={item}
              className="border-l-2 border-sage-300 pl-4 text-sm leading-relaxed text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-sage-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-center gap-3">
            <Briefcase className="text-lavender-500" />
            <h2 className="font-display text-3xl text-ink">Notas de la demo</h2>
          </div>
          <ul className="space-y-3">
            {EXPERIENCE.map((item) => (
              <li
                key={item}
                className="border-l-2 border-lavender-300 pl-4 text-sm leading-relaxed text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
