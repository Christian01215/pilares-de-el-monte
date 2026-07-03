import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Wine, ChevronRight, Sparkles, Calendar, Clock, MapPin, Leaf, Hammer, Tag } from "lucide-react";
import './App.css';

const Inicio = () => {
  const [historia, setHistoria] = useState(null);

  useEffect(() => {
    fetch('https://pilares-de-el-monte.onrender.com/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionHistoria = datos.find(seccion => seccion.identificador === 'historia');
        setHistoria(seccionHistoria);
      })
      .catch(error => console.error("Error al cargar la historia:", error));
  }, []);

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-10">
        
        {/* Título Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 py-14 px-8 text-center border-b border-amber-200">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #92400e 0px, #92400e 1px, transparent 1px, transparent 28px)",
            }}
          />
          <div className="relative z-10">
            {/* AQUÍ ESTÁ EL PRIMER LOGO */}
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              {/* Asegúrate de que el nombre coincida con tu archivo, ej: /logo.png */}
              <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain p-1" />
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2">
              {historia ? historia.titulo : "Nuestra Historia"}
            </h1>
            <p className="italic text-stone-600">El alma de San Francisco del Monte</p>
          </div>
        </section>

        {/* Contenido en dos columnas */}
        <section className="px-8 py-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-amber-600 inline-block" />
                Nuestro Relato
              </h2>
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                {historia ? historia.contenido : "Cargando el legado de nuestra viña..."}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 shadow-lg border border-amber-100 rotate-1 transition-transform hover:rotate-0 duration-500 max-w-md mx-auto w-full">
            <div
              className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-amber-300 relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, #d4a01714, transparent)" }}
            >
              {historia?.imagen_fondo ? (
                <img 
                  src={historia.imagen_fondo} 
                  alt="Historia Pilares del Monte" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {/* AQUÍ ESTÁ EL SEGUNDO LOGO */}
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center z-10 mb-3 overflow-hidden shadow">
                     <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain p-1" />
                  </div>
                  <p className="text-xs text-stone-400 italic text-center px-6 z-10">
                    Sube una imagen desde Django<br />para verla aquí
                  </p>
                </>
              )}
            </div>
            <p className="text-center text-xs tracking-widest text-stone-500 mt-3 uppercase font-semibold">
              San Francisco del Monte
            </p>
          </div>
        </section>

        {/* Timeline (Diseño estático original) */}
        <section className="relative bg-red-950 py-16 px-8 overflow-hidden">
          <span className="absolute -bottom-6 right-8 font-serif text-[140px] leading-none text-amber-100/5 select-none">
            1998
          </span>
          <h3 className="relative font-serif text-2xl text-amber-50 text-center mb-10">
            El Camino del Legado
          </h3>
          
          <div className="relative max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-0">
            <span className="hidden sm:block absolute top-3 left-0 right-0 h-px bg-amber-600/40" />

            <div className="relative flex flex-col items-center w-full sm:w-1/3 text-center">
              <span className="w-6 h-6 rounded-full bg-amber-600 border-4 border-red-950 z-10" />
              <p className="font-serif text-amber-50 mt-4">1998</p>
              <p className="text-amber-200/70 text-sm">Jorge Armijo Vera<br />inicia el proyecto</p>
            </div>

            <div className="relative flex flex-col items-center w-full sm:w-1/3 text-center">
              <span className="w-6 h-6 rounded-full bg-amber-600 border-4 border-red-950 z-10" />
              <p className="font-serif text-amber-50 mt-4">Años después</p>
              <p className="text-amber-200/70 text-sm">El conocimiento<br />se transforma en maestría</p>
            </div>

            <div className="relative flex flex-col items-center w-full sm:w-1/3 text-center">
              <span className="w-6 h-6 rounded-full bg-amber-50 border-4 border-red-950 z-10" />
              <p className="font-serif text-amber-50 mt-4">Hoy</p>
              <p className="text-amber-200/70 text-sm">Pilares del Monte,<br />un nombre propio</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

const Clases = () => {
  const [fondoData, setFondoData] = useState(null);
  const [clases, setClases] = useState([]); // Aquí guardaremos las tarjetas desde Django

  useEffect(() => {
    // 1. Cargar el fondo y título de la sección
    fetch('http://127.0.0.1:8000/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionClases = datos.find(seccion => seccion.identificador === 'clases');
        setFondoData(seccionClases);
      })
      .catch(error => console.error("Error al cargar fondo:", error));

    // 2. Cargar las tarjetas de clases (Apunta a la futura API de clases)
    fetch('http://127.0.0.1:8000/api/clases/')
      .then(respuesta => respuesta.json())
      .then(datos => setClases(datos))
      .catch(error => console.error("Aún no existe la API de clases en Django:", error));
  }, []);

  // Dejamos estos datos temporales para que la página no se vea vacía 
  // mientras construimos la tabla en Django.
  const eventosMostrar = clases.length > 0 ? clases : [
    {
      id: 1,
      tipo: "Taller y Degustación",
      titulo: "Cata de Vinos Reserva",
      fecha: "Sábado, 24 de Junio",
      hora: "16:00 – 18:00 hrs",
      lugar: "Cava Principal",
      nivel: "Principiantes",
      descripcion: "Aprende a distinguir las notas de madera y frutos rojos en nuestra selección especial mientras disfrutas del atardecer.",
      color: "#4a1220",
    },
    {
      id: 2,
      tipo: "Masterclass",
      titulo: "Maridaje Perfecto",
      fecha: "Domingo, 2 de Julio",
      hora: "13:00 – 15:30 hrs",
      lugar: "Salón del Monte",
      nivel: "Intermedio",
      descripcion: "Descubre los secretos para combinar quesos artesanales, carnes curadas y nuestras mejores cepas blancas y tintas.",
      color: "#d4a017",
    },
  ];

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-10 min-h-screen">
        
        {/* Título Hero conectado a Django (Sin el contenido de texto largo) */}
        <section 
          className="relative py-14 px-8 text-center bg-cover bg-center border-b border-amber-200"
          style={fondoData?.imagen_fondo ? { backgroundImage: `url(${fondoData.imagen_fondo})` } : {}}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-amber-50/95 to-amber-50 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain scale-[2.5]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2 drop-shadow-sm">
              {fondoData ? fondoData.titulo : "Experiencias en el Monte"}
            </h1>
            <p className="italic text-stone-700 font-medium max-w-2xl mx-auto drop-shadow-sm">
              Vive el monte a través de los sentidos
            </p>
          </div>
        </section>

        {/* Tarjetas de evento */}
        <section className="px-8 py-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {eventosMostrar.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-amber-100 overflow-hidden flex flex-col"
            >
              <div className="h-1.5" style={{ backgroundColor: e.color || '#4a1220' }} />
              <div className="p-7 flex flex-col flex-1">
                <span
                  className="self-start text-xs tracking-widest font-semibold px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: `${e.color || '#4a1220'}1a`, color: e.color || '#4a1220' }}
                >
                  {e.tipo ? e.tipo.toUpperCase() : "EVENTO"}
                </span>

                <h3 className="font-serif text-2xl text-stone-900 mb-4">{e.titulo}</h3>

                <div className="space-y-2 mb-5 text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    {e.fecha}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    {e.hora}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    {e.lugar}
                    {e.nivel && (
                      <span className="ml-2 text-xs border border-amber-300 rounded-full px-2 py-0.5 text-stone-500">
                        {e.nivel}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1">{e.descripcion}</p>

                {/* Área de contacto en lugar del botón */}
                <div className="mt-auto pt-5 border-t border-amber-100 text-center">
                  <p className="text-xs text-stone-500 mb-2">
                    Para inscribirte o consultar disponibilidad, comunícate con nosotros.
                  </p>
                  <Link 
                    to="/contactanos" 
                    className="inline-block font-serif italic text-amber-700 hover:text-red-900 font-medium transition-colors"
                  >
                    Ir a la sección de contacto →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};  

const Proceso = () => {
  const [procesoData, setProcesoData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionProceso = datos.find(seccion => seccion.identificador === 'proceso');
        setProcesoData(seccionProceso);
      })
      .catch(error => console.error("Error al cargar el proceso:", error));
  }, []);

  const STEPS = [
    {
      n: "01",
      icon: Leaf,
      title: "Abastecimiento y Selección",
      desc: "Todo comienza con la cuidadosa selección y compra de uvas a distintos proveedores externos. Utilizamos diversas variedades tintas y blancas, destacando especialmente la cepa Carménère.",
      color: "#4a1220",
    },
    {
      n: "02",
      icon: Hammer,
      title: "Molienda y Producción Tradicional",
      desc: "Privilegiamos siempre los métodos artesanales: el uso de maquinaria es limitado y, fieles a nuestras raíces, no utilizamos bombas en algunas etapas del proceso productivo.",
      color: "#c2541a",
    },
    {
      n: "03",
      icon: Tag,
      title: "Crianza, Embotellado y Etiquetado",
      desc: "Mantenemos control directo sobre toda la cadena de elaboración. El embotellamiento y etiquetado se realiza de forma manual, con etiquetas inspiradas en el legado de los Hermanos Carrera.",
      color: "#d4a017",
    },
  ];

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-10 min-h-screen">
        
        {/* Título Hero conectado a Django */}
        <section 
          className="relative py-14 px-8 text-center bg-cover bg-center border-b border-amber-200"
          style={procesoData?.imagen_fondo ? { backgroundImage: `url(${procesoData.imagen_fondo})` } : {}}
        >
          {/* Capa semitransparente */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-amber-50/95 to-amber-50 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain scale-[2.5]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2 drop-shadow-sm">
              {procesoData ? procesoData.titulo : "Nuestro Proceso Artesanal"}
            </h1>
            <p className="italic text-stone-700 font-medium max-w-2xl mx-auto drop-shadow-sm whitespace-pre-wrap">
              {procesoData && procesoData.contenido ? procesoData.contenido : "De la viña a la botella, sin perder el control de cada etapa"}
            </p>
          </div>
        </section>

        {/* Pasos */}
        <section className="px-8 py-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="flex items-start lg:items-stretch gap-6 lg:gap-0 lg:flex-col">
                  <div className="bg-white rounded-lg shadow-md border border-amber-100 p-6 flex-1 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: s.color }}
                      >
                        <Icon className="w-5 h-5 text-amber-50" />
                      </div>
                      <span className="font-serif text-3xl text-amber-200">{s.n}</span>
                    </div>
                    <h3 className="font-serif text-lg text-stone-900 mb-2 leading-snug">{s.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{s.desc}</p>
                  </div>

                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex justify-center py-3">
                      <ChevronRight className="w-5 h-5 text-amber-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

const Vinos = () => {
  const [vinos, setVinos] = useState([]);
  const [fondoData, setFondoData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState("Todos");

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionCatalogo = datos.find(seccion => seccion.identificador === 'catalogo');
        setFondoData(seccionCatalogo);
      })
      .catch(error => console.error("Error al cargar el fondo:", error));

    fetch('http://127.0.0.1:8000/api/vinos/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setVinos(datos);
        setCargando(false);
      })
      .catch(error => console.error("Error al cargar los vinos:", error));
  }, []);

  if (cargando) {
    return <div className="pagina-temporal"><h2>Abriendo nuestra cava...</h2></div>;
  }

  const variedadesUnicas = ["Todos", ...new Set(vinos.map(v => v.variedad).filter(Boolean))];
  const vinosFiltrados = filtroActivo === "Todos" 
    ? vinos 
    : vinos.filter(v => v.variedad === filtroActivo);

  return (
    <>
      <div className="min-h-screen bg-amber-50 text-stone-900 pb-10">
        <section 
          className="relative py-16 px-8 text-center bg-cover bg-center bg-fixed border-b border-amber-200"
          style={fondoData?.imagen_fondo ? { backgroundImage: `url(${fondoData.imagen_fondo})` } : {}}
        >
          <div className="absolute inset-0 bg-amber-50/80 backdrop-blur-sm"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <span className="h-px w-16 bg-amber-600" />
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="h-px w-16 bg-amber-600" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-3 drop-shadow-md">
              {fondoData ? fondoData.titulo : "Nuestro Catálogo"}
            </h1>
            <p className="italic text-stone-700 font-medium max-w-md mx-auto drop-shadow">
              Vinos con historia, etiqueta a etiqueta — cada cosecha cuenta un capítulo de San Francisco del Monte.
            </p>
          </div>
        </section>

        <div className="flex justify-center gap-3 px-8 py-8 flex-wrap">
          {variedadesUnicas.map((variedad) => (
            <button
              key={variedad}
              onClick={() => setFiltroActivo(variedad)}
              className={`px-4 py-1.5 rounded-full text-sm tracking-wide border transition-colors ${
                filtroActivo === variedad
                  ? "bg-red-900 text-amber-50 border-red-900"
                  : "bg-transparent text-stone-600 border-amber-300 hover:border-red-900 hover:text-red-900"
              }`}
            >
              {variedad}
            </button>
          ))}
        </div>

        <section className="px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {vinosFiltrados.map((vino) => (
            <div
              key={vino.id}
              className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden border border-amber-100 flex flex-col"
            >
              <div
                className="h-64 flex items-center justify-center border-b border-dashed border-amber-200 relative overflow-hidden bg-stone-50"
              >
                {vino.imagen ? (
                  <img 
                    src={vino.imagen} 
                    alt={vino.nombre} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner bg-red-900 group-hover:scale-105 transition-transform">
                    <Wine className="w-7 h-7 text-amber-50" />
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="h-0.5 w-10 mb-3 bg-red-900" />
                
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs tracking-widest text-amber-700 font-semibold uppercase">
                    COSECHA {vino.cosecha || vino.anio_cosecha}
                  </span>
                  <span className="text-sm font-bold text-red-900">
                    ${vino.precio?.toLocaleString('es-CL')}
                  </span>
                </div>
                
                <h3 className="font-serif text-lg text-stone-900 mt-1 mb-2 leading-snug">{vino.nombre}</h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {vino.descripcion}
                </p>
                
                <button className="flex items-center gap-1 text-sm font-medium text-red-900 hover:gap-2 transition-all mt-auto pt-4 border-t border-amber-100">
                  Agendar cata <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

const Contactanos = () => (
  <>
    <div className="pagina-temporal"><h2>Envíanos un mensaje</h2></div>
    <Footer />
  </>
);

const Footer = () => (
  <footer className="seccion-footer">
    <div className="columna-footer">
      <h3>Ubicación</h3>
      <p>Calle Ejemplo, 123</p>
      <p>Santiago, Chile 12345</p>
    </div>
    <div className="columna-footer">
      <h3>Horario</h3>
      <p>lunes — viernes</p>
      <p>8:00 — 18:00</p>
    </div>
    <div className="columna-footer">
      <h3>Contacta</h3>
      <p>contacto@pilaresdelmonte.cl</p>
      <p>+56 9 1234 5678</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="contenedor-principal">
        
        <header className="navbar">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            Pilares del Monte
          </Link>
          
          <nav className="enlaces-nav">
            <Link to="/clases">CLASES</Link>
            <Link to="/proceso">PROCESO</Link>
            <Link to="/vinos">VINOS</Link>
            <Link to="/contactanos">CONTÁCTANOS</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/proceso" element={<Proceso />} />
          <Route path="/vinos" element={<Vinos />} />
          <Route path="/contactanos" element={<Contactanos />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;