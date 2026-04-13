import { useState, useEffect } from "react";

const CREDS = {
  user: "paideia",
  password: "",
};

export default function Admin() {
  const [logueado, setLogueado] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vista, setVista] = useState("hoy"); // hoy | semana | pacientes
  const [editando, setEditando] = useState(null);
  const [editForm, setEditForm] = useState({ estado: "", psicologo: "", entrevistaCon: "" });
  const [guardando, setGuardando] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  function getHeaders() {
    return { user: "paideia", password };
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin-data", { headers: getHeaders() });
      if (res.status === 401) {
        setError("Contraseña incorrecta");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setData(json.data || []);
      setLogueado(true);
    } catch {
      setError("Error de conexión");
    }
    setLoading(false);
  }

  async function recargarDatos() {
    const res = await fetch("/api/admin-data", { headers: getHeaders() });
    const json = await res.json();
    setData(json.data || []);
  }

  async function handleGuardar(rowIndex) {
    setGuardando(true);
    await fetch("/api/admin-update", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getHeaders() },
      body: JSON.stringify({ rowIndex, ...editForm }),
    });
    await recargarDatos();
    setEditando(null);
    setGuardando(false);
  }

  function isHoy(turno) {
    const hoy = new Date().toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
    return turno.includes(new Date().toLocaleDateString("es-AR", {
      day: "numeric", month: "long", timeZone: "America/Argentina/Buenos_Aires"
    }));
  }

  function isSemana(turno) {
    const ahora = new Date();
    const enSieteDias = new Date();
    enSieteDias.setDate(ahora.getDate() + 7);
    // Buscar si el turno está en los próximos 7 días
    return data.some((p) => p.turno === turno);
  }

  const hoy = new Date().toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long",
    timeZone: "America/Argentina/Buenos_Aires"
  });

  const turnosHoy = data.filter((p) => isHoy(p.turno));
  const turnosSemana = data.filter((p) => !isHoy(p.turno)).slice(0, 20);
  const pacientesFiltrados = data.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!logueado) {
    return (
      <div className="min-h-screen bg-paideia-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-paideia-cream p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-paideia-primary font-raleway">Panel Paideia</h1>
            <p className="text-sm text-paideia-primary/50 font-raleway mt-1">Acceso coordinadoras</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm"
            />
            {error && <p className="text-red-500 text-sm font-raleway text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-paideia-primary text-white font-raleway font-bold py-3 rounded-lg transition-colors disabled:opacity-40"
            >
              {loading ? "Entrando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paideia-cream/30">
      {/* Header */}
      <div className="bg-white border-b border-paideia-cream px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-paideia-primary font-raleway">Panel Paideia</h1>
        <button
          onClick={() => setLogueado(false)}
          className="text-sm text-paideia-primary/50 font-raleway hover:text-paideia-primary"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-paideia-cream px-6 flex gap-6">
        {[
          { key: "hoy", label: `Hoy (${turnosHoy.length})` },
          { key: "semana", label: "Esta semana" },
          { key: "pacientes", label: `Todos (${data.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setVista(tab.key)}
            className={`py-4 text-sm font-raleway font-semibold border-b-2 transition-colors ${
              vista === tab.key
                ? "border-paideia-primary text-paideia-primary"
                : "border-transparent text-paideia-primary/40 hover:text-paideia-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-5xl mx-auto">

        {/* Vista HOY */}
        {vista === "hoy" && (
          <div>
            <h2 className="text-lg font-bold text-paideia-primary font-raleway mb-4 capitalize">{hoy}</h2>
            {turnosHoy.length === 0 ? (
              <div className="bg-white rounded-2xl border border-paideia-cream p-8 text-center text-paideia-primary/40 font-raleway">
                No hay turnos para hoy
              </div>
            ) : (
              <div className="space-y-3">
                {turnosHoy.map((p, i) => (
                  <TarjetaPaciente key={i} paciente={p} rowIndex={data.indexOf(p)}
                    editando={editando} setEditando={setEditando}
                    editForm={editForm} setEditForm={setEditForm}
                    handleGuardar={handleGuardar} guardando={guardando}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Vista SEMANA */}
        {vista === "semana" && (
          <div>
            <h2 className="text-lg font-bold text-paideia-primary font-raleway mb-4">Próximos turnos</h2>
            {turnosSemana.length === 0 ? (
              <div className="bg-white rounded-2xl border border-paideia-cream p-8 text-center text-paideia-primary/40 font-raleway">
                No hay turnos próximos
              </div>
            ) : (
              <div className="space-y-3">
                {turnosSemana.map((p, i) => (
                  <TarjetaPaciente key={i} paciente={p} rowIndex={data.indexOf(p)}
                    editando={editando} setEditando={setEditando}
                    editForm={editForm} setEditForm={setEditForm}
                    handleGuardar={handleGuardar} guardando={guardando}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Vista TODOS */}
        {vista === "pacientes" && (
          <div>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full px-4 py-3 bg-white border border-paideia-cream rounded-full focus:outline-none focus:ring-2 focus:ring-paideia-primary font-raleway text-sm mb-4"
            />
            <div className="space-y-3">
              {pacientesFiltrados.map((p, i) => (
                <TarjetaPaciente key={i} paciente={p} rowIndex={data.indexOf(p)}
                  editando={editando} setEditando={setEditando}
                  editForm={editForm} setEditForm={setEditForm}
                  handleGuardar={handleGuardar} guardando={guardando}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TarjetaPaciente({ paciente, rowIndex, editando, setEditando, editForm, setEditForm, handleGuardar, guardando }) {
  const isEditando = editando === rowIndex;

  return (
    <div className="bg-white rounded-2xl border border-paideia-cream p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-paideia-primary font-raleway">{paciente.nombre}</h3>
          <p className="text-sm text-paideia-primary/60 font-raleway">{paciente.turno}</p>
        </div>
        <span className={`text-xs font-raleway font-semibold px-3 py-1 rounded-full ${
          paciente.estado === "Activo" ? "bg-green-100 text-green-700" :
          paciente.estado === "Finalizado" ? "bg-gray-100 text-gray-600" :
          "bg-paideia-coral/40 text-paideia-primary"
        }`}>
          {paciente.estado || "Pendiente"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm font-raleway text-paideia-primary/70 mb-3">
        <span>📧 {paciente.email}</span>
        <a> href={`https://wa.me/${paciente.telefono.replace(/\D/g, "")}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-green-600 hover:text-green-700 font-raleway text-sm"
>
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.926l6.257-1.642A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374A9.869 9.869 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
  </svg>
  {paciente.telefono}
</a>
        {paciente.psicologo && <span>🧑‍⚕️ {paciente.psicologo}</span>}
        {paciente.entrevistaCon && <span>🎙 Entrevista: {paciente.entrevistaCon}</span>}
      </div>

      {!isEditando ? (
        <button
          onClick={() => {
            setEditando(rowIndex);
            setEditForm({
              estado: paciente.estado || "Pendiente",
              psicologo: paciente.psicologo || "",
              entrevistaCon: paciente.entrevistaCon || "",
            });
          }}
          className="text-sm text-paideia-primary font-raleway font-semibold hover:underline"
        >
          ✏️ Editar
        </button>
      ) : (
        <div className="space-y-3 pt-3 border-t border-paideia-cream">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={editForm.estado}
              onChange={(e) => setEditForm({ ...editForm, estado: e.target.value })}
              className="px-3 py-2 border border-paideia-cream rounded-lg font-raleway text-sm focus:outline-none focus:ring-2 focus:ring-paideia-primary"
            >
              <option>Pendiente</option>
              <option>Activo</option>
              <option>Finalizado</option>
            </select>
            <input
              type="text"
              value={editForm.psicologo}
              onChange={(e) => setEditForm({ ...editForm, psicologo: e.target.value })}
              placeholder="Psicólogo asignado"
              className="px-3 py-2 border border-paideia-cream rounded-lg font-raleway text-sm focus:outline-none focus:ring-2 focus:ring-paideia-primary"
            />
            <input
              type="text"
              value={editForm.entrevistaCon}
              onChange={(e) => setEditForm({ ...editForm, entrevistaCon: e.target.value })}
              placeholder="Entrevista con"
              className="px-3 py-2 border border-paideia-cream rounded-lg font-raleway text-sm focus:outline-none focus:ring-2 focus:ring-paideia-primary"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleGuardar(rowIndex)}
              disabled={guardando}
              className="bg-paideia-primary text-white font-raleway font-bold py-2 px-6 rounded-lg text-sm disabled:opacity-40"
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={() => setEditando(null)}
              className="border border-paideia-cream text-paideia-primary font-raleway py-2 px-6 rounded-lg text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}