import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-sage-100 bg-sage-800 text-sage-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-white">FacilApp Demo</p>
          <p className="mt-2 text-sm text-sage-200">
            Consultorio de prueba.
            <br />
            Datos inventados · no es una cuenta real
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sage-300">
            Navegación
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/sobre-mi" className="hover:text-white">
                Sobre la demo
              </Link>
            </li>
            <li>
              <Link to="/agendar" className="hover:text-white">
                Agendar cita
              </Link>
            </li>
            <li>
              <Link to="/admin/login" className="hover:text-white">
                Panel
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sage-300">
            Acceso demo
          </p>
          <p className="mt-4 text-sm text-sage-200">
            demo@facilapp.do
            <br />
            Demo1234!
          </p>
        </div>
      </div>
      <div className="border-t border-sage-700/60 py-4 text-center text-xs text-sage-300">
        © {new Date().getFullYear()} FacilApp. Demo de consultorio.
      </div>
    </footer>
  )
}
