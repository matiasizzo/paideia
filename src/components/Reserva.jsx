import { useState, useEffect } from "react";

export default function Reserva() {
  const [slots, setSlots] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [slotSeleccionado, setSlotSeleccionado] = useState(null);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [paso, setPaso] = useState(1);
  const [mesActual, setMesActual] = useState(new Date());

  useEffect(() => {
    fetch("/api/slots")
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => setLoadingSlots(false));
  }, []);

  // Fechas con turnos disponibles (como string YYYY-MM-DD)
  const fechasDisponibles = new Set(
    slots.map((s) => new Date(s.start).toISOString().split("T")[0])
  );

  // Slots del día seleccionado
  const slotsDeFecha = slots.filter((s) => {
    if (!fechaSeleccionada) return false;
    return new Date(s.start).toISOString().split("T")[0] === fechaSeleccionada;
  });

  // Días del mes actual para el calendario
  function getDiasMes(fecha) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth();
    const primerDia = new Date(year, month, 1).getDay();
    const totalDias = new Date(year, month + 1, 0).getDate();
    // Ajustar para que semana empiece en lunes
    const offset = primerDia === 0 ? 6 : primerDia - 1;
    return { offset, totalDias, year, month };
  }

  const { offset, totalDias, year, month } = getDiasMes(mesActual);
  const hoy = new Date().toISOString().split("T")[0];

  const nombreMes = mesActual.toLocaleDateString("es-AR", {
    month: "long", year: "numeric",
  });

  function seleccionarFecha(dia) {
    const fechaStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    if (!fechasDisponibles.has(fechaStr)) return;
    setFechaSeleccionada(fechaStr);
    setSlotSeleccionado(null);
  }

  async function handlePagar() {
    if (!form.nombre || !form.email || !slotSeleccionado) return;
    setLoading(true);
    try {
      const res = await fetch("/api/crear-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          slotStart: slotSeleccionado.start,
          slotEnd: slotSeleccionado.end,
        }),
      });
      const data = await res.json();
      if (data.initPoint) window.location.href = data.initPoint;
    } catch {
      alert("Error al procesar el pago. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

  return (
    <section id="reserva" className="py-10 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8 bg-paideia-cream/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-paideia-primary font-raleway mb-2">
            Reservá tu entrevista
          </h2>
          <p className="text-sm sm:text-base text-paideia-primary/70 font-raleway">
            Elegí un turno y completá tus datos para reservar
          </p>
        </div>

        <div className="lg:bg-white lg:rounded-2xl lg:shadow-sm lg:border lg:border-paideia-cream lg:p-8">

          {/* PASO 1: Calendario */}
          {paso === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-paideia-primary font-raleway mb-6">
                1. Elegí una fecha
              </h3>

              {loadingSlots ? (
                <div className="text-center py-12 text-paideia-primary/60 font-raleway">
                  Cargando turnos disponibles...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Calendario */}
                  <div>
                    {/* Header mes */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => setMesActual(new Date(year, month - 1))}
                          disabled={year === new Date().getFullYear() && month <= new Date().getMonth()}
                          className="p-2 rounded-full hover:bg-paideia-cream transition-colors text-paideia-primary font-bold disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                          ←
                        </button>
                      <span className="font-raleway font-semibold text-paideia-primary capitalize">
                        {nombreMes}
                      </span>
                      <button
                        onClick={() => setMesActual(new Date(year, month + 1))}
                        className="p-2 rounded-full hover:bg-paideia-cream transition-colors text-paideia-primary font-bold"
                      >
                        →
                      </button>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 mb-2">
                      {diasSemana.map((d) => (
                        <div key={d} className="text-center text-xs font-raleway text-paideia-primary/40 py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Días del mes */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Espacios vacíos del inicio */}
                      {Array.from({ length: offset }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}

                      {/* Días */}
                      {Array.from({ length: totalDias }, (_, i) => i + 1).map((dia) => {
                        const fechaStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
                        const disponible = fechasDisponibles.has(fechaStr);
                        const seleccionado = fechaSeleccionada === fechaStr;
                        const pasado = fechaStr < hoy;

                        return (
                          <button
                            key={dia}
                            onClick={() => seleccionarFecha(dia)}
                            disabled={!disponible || pasado}
                            className={`
                              aspect-square rounded-full text-sm font-raleway transition-all flex items-center justify-center
                              ${seleccionado ? "bg-paideia-primary text-white font-bold" : ""}
                              ${disponible && !seleccionado && !pasado ? "bg-paideia-mint/40 text-paideia-primary hover:bg-paideia-primary hover:text-white font-medium" : ""}
                              ${!disponible || pasado ? "text-paideia-primary/20 cursor-not-allowed" : ""}
                            `}
                          >
                            {dia}
                          </button>
                        );
                      })}
                    </div>

                    {/* Leyenda */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-paideia-mint/40" />
                        <span className="text-xs font-raleway text-paideia-primary/60">Disponible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-paideia-primary" />
                        <span className="text-xs font-raleway text-paideia-primary/60">Seleccionado</span>
                      </div>
                    </div>
                  </div>

                  {/* Horarios del día seleccionado */}
                  <div>
                    {!fechaSeleccionada ? (
                      <div className="h-full flex items-center justify-center text-paideia-primary/40 font-raleway text-sm text-center py-8">
                        Seleccioná una fecha para ver los horarios disponibles
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-raleway font-semibold text-paideia-primary mb-4 capitalize text-sm">
                          {new Date(fechaSeleccionada + "T12:00:00").toLocaleDateString("es-AR", {
                            weekday: "long", day: "numeric", month: "long",
                          })}
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {slotsDeFecha.map((slot) => {
                            const hora = new Date(slot.start).toLocaleTimeString("es-AR", {
                                hour: "2-digit", minute: "2-digit",
                                timeZone: "America/Argentina/Buenos_Aires",
                            });
                            const seleccionado = slotSeleccionado?.start === slot.start;
                            return (
                              <button
                                key={slot.start}
                                onClick={() => setSlotSeleccionado(slot)}
                                className={`py-2 px-3 rounded-lg border font-raleway text-sm transition-all ${
                                  seleccionado
                                    ? "bg-paideia-primary text-white border-paideia-primary"
                                    : "bg-white text-paideia-primary border-paideia-cream hover:border-paideia-primary"
                                }`}
                              >
                                {hora}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => {                
                  setPaso(2);
                  document.getElementById("reserva").scrollIntoView({ behavior: "smooth" });
                }}
                disabled={!slotSeleccionado}
                className="mt-8 w-full bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-40"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 2: Datos */}
          {paso === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-paideia-primary font-raleway mb-4">
                2. Tus datos
              </h3>

              <div className="bg-paideia-primary/10 border border-paideia-cream rounded-2xl p-4 mb-6 text-sm text-paideia-primary font-raleway">
                <span className="font-medium">Turno seleccionado: </span>
                {new Date(slotSeleccionado.start).toLocaleString("es-AR", {
                  weekday: "long", day: "numeric", month: "long",
                  hour: "2-digit", minute: "2-digit",
                  timeZone: "America/Argentina/Buenos_Aires",
                })}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    placeholder="Nombre y apellido"
                    className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm placeholder-paideia-primary/50"
                  />
                  <input
                    type="tel"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value.replace(/\D/g, "") })}
                    placeholder="Número de WhatsApp"
                    className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm placeholder-paideia-primary/50"
                  />
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm placeholder-paideia-primary/50"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                onClick={() => {
                  setPaso(1);
                  document.getElementById("reserva").scrollIntoView({ behavior: "smooth" });
                }}
                  className="flex-1 border border-paideia-cream text-paideia-primary font-raleway py-3 rounded-lg hover:bg-paideia-cream/30 transition-colors"
                >
                  ← Volver
                </button>
                <button
                  onClick={handlePagar}
                  disabled={loading || !form.nombre || !form.email}
                  className="flex-1 bg-paideia-primary hover:bg-paideia-primary/90 text-white font-raleway font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-40"
                >
                  {loading ? "Procesando..." : "Ir a pagar →"}
                </button>
              </div>

              <p className="text-xs text-paideia-primary/50 font-raleway text-center mt-4">
                Serás redirigido a MercadoPago para completar el pago de forma segura
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}