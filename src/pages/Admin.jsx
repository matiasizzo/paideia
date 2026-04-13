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

  const turnosHoy = data
  .filter((p) => isHoy(p.turno))
  .sort((a, b) => getDiasSinContacto(b.ultimoContacto) - getDiasSinContacto(a.ultimoContacto));

const turnosSemana = data
  .filter((p) => !isHoy(p.turno))
  .sort((a, b) => getDiasSinContacto(b.ultimoContacto) - getDiasSinContacto(a.ultimoContacto))
  .slice(0, 20);
  function getDiasSinContacto(ultimoContacto) {
  if (!ultimoContacto) return 9999;
  const ultimo = new Date(ultimoContacto.split("/").reverse().join("-"));
  const hoy = new Date();
  return Math.floor((hoy - ultimo) / (1000 * 60 * 60 * 24));
}

const pacientesFiltrados = data
  .filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.email.toLowerCase().includes(busqueda.toLowerCase())
  )
  .sort((a, b) => getDiasSinContacto(b.ultimoContacto) - getDiasSinContacto(a.ultimoContacto));

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

  function diasSinContacto() {
    if (!paciente.ultimoContacto) return null;
    const ultimo = new Date(paciente.ultimoContacto.split("/").reverse().join("-"));
    const hoy = new Date();
    const diff = Math.floor((hoy - ultimo) / (1000 * 60 * 60 * 24));
    return diff;
  }

  const dias = diasSinContacto();

  return (
    <div className="bg-white rounded-2xl border border-paideia-cream p-5">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-paideia-primary font-raleway text-lg">{paciente.nombre}</h3>
          <p className="text-sm text-paideia-primary/50 font-raleway">Turno: {paciente.turno}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs font-raleway font-semibold px-3 py-1 rounded-full ${
            paciente.estado === "Activo" ? "bg-green-100 text-green-700" :
            paciente.estado === "Finalizado" ? "bg-gray-100 text-gray-600" :
            "bg-paideia-coral/40 text-paideia-primary"
          }`}>
            {paciente.estado || "Pendiente"}
          </span>
          {dias !== null && (
            <span className={`text-xs font-raleway font-semibold px-3 py-1 rounded-full ${
              dias > 30 ? "bg-red-100 text-red-600" :
              dias > 14 ? "bg-yellow-100 text-yellow-700" :
              "bg-green-100 text-green-700"
            }`}>
              {dias === 0 ? "Contactado hoy" : dias + " días sin contacto"}
            </span>
          )}
          {dias === null && (
            <span className="text-xs font-raleway px-3 py-1 rounded-full bg-gray-100 text-gray-500">
              Sin contactar
            </span>
          )}
        </div>
      </div>

      {/* Datos */}
      <div className="flex flex-col gap-2 text-sm font-raleway text-paideia-primary/70 mb-4">
  <span>{"📧 Correo: " + paciente.email}</span>
  <span>
    <a href={"https://wa.me/+" + paciente.telefono.replace(/\D/g, "")} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
      {"💬 Número: " + paciente.telefono}
    </a>
  </span>
  <span>{paciente.psicologo ? "Psicologo: " + paciente.psicologo : "Psicologo: Sin asignar"}</span>
  <span>{paciente.entrevistaCon ? "Atendido por: " + paciente.entrevistaCon : "Atendido por: Sin registrar"}</span>
  <span>{paciente.ultimoContacto ? "Ultimo contacto: " + paciente.ultimoContacto : "Ultimo contacto: Sin registrar"}</span>
</div>

      {/* Editar */}
      {!isEditando ? (
        <button
          onClick={() => {
            setEditando(rowIndex);
            setEditForm({
              estado: paciente.estado || "Pendiente",
              psicologo: paciente.psicologo || "",
              entrevistaCon: paciente.entrevistaCon || "",
              ultimoContacto: paciente.ultimoContacto
                ? paciente.ultimoContacto.split("/").reverse().join("-")
                : "",
            });
          }}
          className="text-sm text-paideia-primary font-raleway font-semibold hover:underline"
        >
          Editar
        </button>
      ) : (
        <div className="space-y-3 pt-3 border-t border-paideia-cream">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              placeholder="Atendido por"
              className="px-3 py-2 border border-paideia-cream rounded-lg font-raleway text-sm focus:outline-none focus:ring-2 focus:ring-paideia-primary"
            />
            <input
              type="date"
              value={editForm.ultimoContacto}
              onChange={(e) => setEditForm({ ...editForm, ultimoContacto: e.target.value })}
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