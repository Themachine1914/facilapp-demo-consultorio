import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  formatCurrencyDop,
  formatDisplayDate,
  getBookableDates,
  getOpenSlots,
  toDateKey,
} from '../../lib/dates'
import { getAvailability } from '../../services/availability'
import {
  createAppointment,
  getBookedSlotsForDate,
} from '../../services/appointments'
import { getSettings } from '../../services/settings'
import { BookingHelp } from './BookingHelp'
import type {
  AppSettings,
  Appointment,
  AvailabilityConfig,
  SessionType,
} from '../../types'

const STEPS = ['Sesión', 'Fecha', 'Hora', 'Datos']

export function BookPage() {
  const location = useLocation()
  const initialType =
    (location.state as { sessionType?: SessionType } | null)?.sessionType ??
    'individual'

  const [step, setStep] = useState(0)
  const [settings, setSettings] = useState<AppSettings | null>(null)
  const [availability, setAvailability] = useState<AvailabilityConfig | null>(
    null,
  )
  const [sessionType, setSessionType] = useState<SessionType>(initialType)
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState('')
  const [booked, setBooked] = useState<string[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState<Appointment | null>(null)

  useEffect(() => {
    Promise.all([getSettings(), getAvailability()]).then(([s, a]) => {
      setSettings(s)
      setAvailability(a)
    })
  }, [])

  useEffect(() => {
    if (!date) return
    let active = true
    getBookedSlotsForDate(date).then((slots) => {
      if (active) setBooked(slots)
    })
    return () => {
      active = false
    }
  }, [date, step])

  const session = settings?.sessionTypes.find((s) => s.id === sessionType)
  const dates = useMemo(
    () => (availability ? getBookableDates(availability) : []),
    [availability],
  )
  const freeSlots = availability ? getOpenSlots(date, availability, booked) : []

  function next() {
    if (step === 0 && !sessionType) return
    if (step === 1 && !date) {
      toast.error('Selecciona una fecha')
      return
    }
    if (step === 2 && !time) {
      toast.error('Selecciona una hora')
      return
    }
    if (step === 3) {
      if (!name.trim() || !phone.trim() || !email.trim()) {
        toast.error('Completa nombre, teléfono y email')
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Email inválido')
        return
      }
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  async function submit() {
    if (!session || !settings) {
      toast.error('Elige un tipo de sesión')
      return
    }
    setSubmitting(true)
    try {
      const created = await createAppointment({
        name,
        phone,
        email,
        sessionType,
        price: session.priceDop,
        date,
        time,
        notes,
        paymentProofUrl: '',
        paymentProofName: undefined,
      })
      toast.success('Cita enviada. Queda pendiente de confirmación.')
      setConfirmed(created)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'No se pudo agendar')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <Check size={28} />
        </div>
        <h1 className="font-display text-3xl text-ink">Solicitud recibida</h1>
        <p className="mt-3 text-muted">
          Tu cita del {formatDisplayDate(confirmed.date)} a las{' '}
          {confirmed.time} está <strong>pendiente de confirmación</strong>.
          En esta demo no hay pagos. El admin puede confirmar la cita desde el
          panel.
        </p>

        <div className="mt-8 border border-sage-200 bg-sage-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-sage-700">
            Tu código de seguimiento
          </p>
          <p className="mt-2 font-display text-3xl tracking-wide text-ink">
            {confirmed.reference}
          </p>
          <p className="mt-3 text-xs text-muted">
            Guárdalo. Es lo que necesitas para consultar el estado de tu cita, y
            solo tú lo tienes.
          </p>
        </div>

        <Link
          to="/mis-citas"
          state={{ reference: confirmed.reference }}
          className="mt-8 inline-flex rounded-full bg-sage-500 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Ver estado de mi cita
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl text-ink">Agendar cita</h1>
      <p className="mt-2 text-sm text-muted">
        Sesiones virtuales · Lunes, martes y miércoles · 6 cupos diarios
      </p>

      <div className="mt-8 flex gap-1">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1.5 rounded-full ${
                i <= step ? 'bg-sage-500' : 'bg-sage-100'
              }`}
            />
            <p
              className={`mt-1.5 text-[10px] sm:text-xs ${
                i === step ? 'text-sage-700 font-medium' : 'text-muted'
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 min-h-[280px]">
        {step === 0 && settings && (
          <div className="space-y-3">
            {settings.sessionTypes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSessionType(s.id)}
                className={`flex w-full items-center justify-between border px-5 py-4 text-left transition ${
                  sessionType === s.id
                    ? 'border-sage-500 bg-sage-50'
                    : 'border-sage-100 bg-white hover:border-sage-200'
                }`}
              >
                <span>
                  <span className="block font-medium text-ink">{s.label}</span>
                  <span className="text-sm text-muted">
                    {s.durationMinutes} min · Virtual
                  </span>
                </span>
                <span className="font-semibold text-sage-600">
                  {formatCurrencyDop(s.priceDop)}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {dates.map((d) => {
              const key = toDateKey(d)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setDate(key)
                    setTime('')
                  }}
                  className={`rounded-lg border px-3 py-3 text-left text-sm transition ${
                    date === key
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-sage-100 bg-white hover:border-sage-200'
                  }`}
                >
                  <span className="block capitalize text-muted text-xs">
                    {format(d, 'EEEE', { locale: es })}
                  </span>
                  <span className="font-medium text-ink">
                    {format(d, 'd MMM', { locale: es })}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {step === 2 && (
          <div>
            {!date ? (
              <p className="text-muted">Primero elige una fecha.</p>
            ) : freeSlots.length === 0 ? (
              <p className="text-muted">No hay horarios libres este día.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {freeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-lg border py-3 text-sm font-medium ${
                      time === slot
                        ? 'border-sage-500 bg-sage-50 text-sage-700'
                        : 'border-sage-100 bg-white text-ink hover:border-sage-200'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Field label="Nombre completo" value={name} onChange={setName} required />
            <Field label="Teléfono" value={phone} onChange={setPhone} required />
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              required
            />
            <label className="block">
              <span className="text-sm font-medium text-ink">
                Notas (opcional)
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm outline-none focus:border-sage-400"
              />
            </label>
          </div>
        )}

        {step === 3 && session && (
          <p className="mt-4 text-xs text-muted">
            DEMO: no se piden pagos. {session.label} ·{' '}
            {formatCurrencyDop(session.priceDop)} · {formatDisplayDate(date)} ·{' '}
            {time}
          </p>
        )}
      </div>

      <div className="mt-8">
        <BookingHelp step={step} />
      </div>

      <div className="mt-10 flex justify-between gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
          className="inline-flex items-center gap-1 rounded-full border border-sage-200 px-4 py-2.5 text-sm disabled:opacity-40"
        >
          <ChevronLeft size={16} /> Atrás
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-1 rounded-full bg-sage-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-600"
          >
            Continuar <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            disabled={submitting}
            onClick={submit}
            className="inline-flex rounded-full bg-sage-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-600 disabled:opacity-60"
          >
            {submitting ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && ' *'}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-sage-200 bg-white px-3 py-2 text-sm outline-none focus:border-sage-400"
      />
    </label>
  )
}
