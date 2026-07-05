import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Wine, ChevronRight, ChevronLeft, X, Sparkles, Calendar, Clock, MapPin, Tag, Menu } from "lucide-react";
import './App.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuAbierto(false);
  }, [location]);

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 py-6 relative z-50 bg-transparent">

      {/* Título Responsivo */}
      <Link to="/" className="font-serif text-2xl sm:text-3xl italic text-[#7f1d1d] truncate pr-4">
        Pilares de El Monte
      </Link>

      <button
        onClick={() => setMenuAbierto(true)}
        className="text-[#7f1d1d] hover:text-[#450a0a] transition-colors p-2 relative z-50 shrink-0"
      >
        <Menu className="w-8 h-8" />
      </button>

      {/* Fondo oscuro móvil */}
      {menuAbierto && (
        <div
          className="fixed inset-0 bg-stone-900/50 z-40 animate-in fade-in duration-300"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-amber-50/98 border-l border-amber-200 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 z-50 transform transition-transform duration-300 ease-out will-change-transform ${
          menuAbierto ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setMenuAbierto(false)}
            className="text-[#7f1d1d] hover:text-[#450a0a] bg-amber-100/50 hover:bg-amber-200 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Link to="/" className="text-[#7f1d1d] hover:text-[#450a0a] font-medium font-sans tracking-widest text-sm hover:translate-x-2 transition-transform">INICIO</Link>
        <div className="h-px w-full bg-amber-200/50"></div>
        <Link to="/historia" className="text-[#7f1d1d] hover:text-[#450a0a] font-medium font-sans tracking-widest text-sm hover:translate-x-2 transition-transform">HISTORIA</Link>
        <div className="h-px w-full bg-amber-200/50"></div>
        <Link to="/vinos" className="text-[#7f1d1d] hover:text-[#450a0a] font-medium font-sans tracking-widest text-sm hover:translate-x-2 transition-transform">NUESTROS VINOS</Link>
        <div className="h-px w-full bg-amber-200/50"></div>
        <Link to="/clases" className="text-[#7f1d1d] hover:text-[#450a0a] font-medium font-sans tracking-widest text-sm hover:translate-x-2 transition-transform">CLASES Y CATAS</Link>
        <div className="h-px w-full bg-amber-200/50"></div>
        <Link to="/recuerdos" className="text-[#7f1d1d] hover:text-[#450a0a] font-medium font-sans tracking-widest text-sm hover:translate-x-2 transition-transform">RECUERDOS</Link>
        <div className="h-px w-full bg-amber-200/50"></div>
        <Link to="/contactanos" className="text-[#7f1d1d] hover:text-[#450a0a] font-medium font-sans tracking-widest text-sm hover:translate-x-2 transition-transform">CONTÁCTANOS</Link>
      </div>

    </nav>
  );
};

const Inicio = () => {
  const [datosInicio, setDatosInicio] = useState(null);

  useEffect(() => {
    fetch('https://pilares-de-el-monte.onrender.com/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionInicio = datos.find(seccion => seccion.identificador === 'inicio');
        setDatosInicio(seccionInicio);
      })
      .catch(error => console.error("Error al cargar datos de inicio:", error));
  }, []);

  return (
    <div className="bg-amber-50 min-h-screen pb-20 animate-in fade-in duration-700">
      <section className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-8 text-center bg-gradient-to-b from-[#eeddbb] to-amber-50 border-b border-amber-200">

        <div className="w-32 h-32 sm:w-40 sm:h-40 mb-8 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-105 hover:rotate-3 transition-all duration-500 cursor-pointer border-4 border-amber-100 overflow-hidden group p-2 shrink-0">
          <img
            src="/logo.png"
            alt="Logo Pilares de El Monte"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-6">Quiénes Somos</h1>
        <p className="text-base sm:text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed mb-10 px-2">
          En Pilares de El Monte, cada botella cuenta una historia. Somos una viña familiar dedicada a rescatar el patrimonio vitivinícola de San Francisco de El Monte, honrando las tradiciones de nuestros antepasados y compartiendo nuestra pasión por la tierra.
        </p>

        {datosInicio && datosInicio.imagen_fondo && (
          <div className="bg-white p-2 sm:p-4 shadow-xl border border-amber-100 rotate-1 hover:rotate-0 transition-transform duration-500 max-w-4xl mx-auto w-full">
            <div className="h-[250px] sm:h-[400px] md:h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-amber-300 relative overflow-hidden bg-stone-100">
              <img
                src={datosInicio.imagen_fondo}
                alt="Pilares de El Monte - Viña"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-[10px] sm:text-xs tracking-widest text-stone-500 mt-2 sm:mt-3 uppercase font-semibold">
              Pilares de El Monte
            </p>
          </div>
        )}
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mt-16">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 text-center border border-amber-200 hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-900 transition-colors duration-500">
            <Wine className="w-8 h-8 sm:w-10 sm:h-10 text-red-900 group-hover:text-amber-50 transition-colors duration-500" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-4">Nuestros Vinos</h2>
          <p className="text-sm sm:text-base text-stone-600 mb-8 flex-grow">
            Descubre nuestro catálogo de vinos de autor y ensamblajes únicos, donde la etiqueta de cada cosecha cuenta un capítulo distinto.
          </p>
          <Link to="/vinos" className="inline-block bg-white text-red-900 border-2 border-red-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-red-900 hover:text-amber-50 transition-colors shadow-sm text-sm sm:text-base">
            Si quieres saber más, pincha acá
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-10 text-center border border-amber-200 hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-700 transition-colors duration-500">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-700 group-hover:text-amber-50 transition-colors duration-500" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-4">Clases y Catas</h2>
          <p className="text-sm sm:text-base text-stone-600 mb-8 flex-grow">
            Aprende a degustar, identificar aromas y conocer los secretos de la vinificación en nuestras experiencias inmersivas guiadas.
          </p>
          <Link to="/clases" className="inline-block bg-white text-amber-700 border-2 border-amber-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-amber-700 hover:text-amber-50 transition-colors shadow-sm text-sm sm:text-base">
            Si quieres saber más, pincha acá
          </Link>
        </div>
      </section>
    </div>
  );
};

const Historia = () => {
  const [datosHistoria, setDatosHistoria] = useState(null);

  useEffect(() => {
    fetch('https://pilares-de-el-monte.onrender.com/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionHistoria = datos.find(seccion => seccion.identificador === 'historia');
        setDatosHistoria(seccionHistoria);
      })
      .catch(error => console.error("Error al cargar historia:", error));
  }, []);

  return (
    <div className="bg-amber-50 min-h-screen pt-12 sm:pt-20 flex flex-col">

      <div className="px-4 sm:px-8 mb-16 flex-grow">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-12 rounded-xl shadow-lg border border-amber-200 text-center animate-in slide-in-from-bottom-10 duration-700 relative z-10">

          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-8">
            {datosHistoria?.titulo || "Nuestra Historia"}
          </h1>

          {datosHistoria && datosHistoria.imagen_fondo && (
            <div className="bg-white p-2 md:p-4 shadow-xl border border-amber-100 rotate-1 hover:rotate-0 transition-transform duration-500 max-w-3xl mx-auto w-full mb-8 sm:mb-10">
              <div className="h-[200px] sm:h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-amber-300 relative overflow-hidden bg-stone-100">
                <img
                  src={datosHistoria.imagen_fondo}
                  alt="Historia Pilares de El Monte"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <p className="text-center text-[10px] sm:text-xs tracking-widest text-stone-500 mt-2 sm:mt-3 uppercase font-semibold">
                Archivo Histórico Familiar
              </p>
            </div>
          )}

          <p className="text-base sm:text-lg text-stone-700 leading-relaxed whitespace-pre-wrap text-justify sm:text-left">
            {datosHistoria?.contenido || "Cargando nuestra historia..."}
          </p>

        </div>
      </div>

      <div className="w-full bg-[#4a1216] relative overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.1)] py-12 sm:py-16 animate-in fade-in duration-1000 delay-300 mt-auto">

        <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-4 text-[8rem] sm:text-[14rem] font-serif text-white/5 font-bold pointer-events-none select-none leading-none">
          1998
        </div>

        <div className="relative z-10 text-center px-2 sm:px-4">
          <h2 className="font-serif text-2xl sm:text-4xl text-amber-50 mb-10 sm:mb-12">
            El Camino del Legado
          </h2>

          <div className="relative flex justify-between items-start max-w-4xl mx-auto">

            {/* Línea horizontal (ajustada para móvil y pc) */}
            <div className="absolute top-2.5 sm:top-3 left-0 w-full h-px bg-amber-700/50"></div>

            <div className="relative flex flex-col items-center w-1/3 px-1 sm:px-2 group cursor-default">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-600 border-[3px] sm:border-4 border-[#4a1216] z-10 mb-2 sm:mb-4 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(217,119,6,0.5)]"></div>
              <h3 className="font-serif font-bold text-sm sm:text-lg text-amber-50">1998</h3>
              <p className="text-[10px] sm:text-sm text-amber-100/70 mt-1 sm:mt-2 leading-tight">
                Jorge Armijo Vera<br className="hidden sm:block"/>inicia el proyecto
              </p>
            </div>

            <div className="relative flex flex-col items-center w-1/3 px-1 sm:px-2 group cursor-default">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-600 border-[3px] sm:border-4 border-[#4a1216] z-10 mb-2 sm:mb-4 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(217,119,6,0.5)]"></div>
              <h3 className="font-serif font-bold text-sm sm:text-lg text-amber-50 leading-tight">Años después</h3>
              <p className="text-[10px] sm:text-sm text-amber-100/70 mt-1 sm:mt-2 leading-tight">
                El conocimiento<br className="hidden sm:block"/>se transforma
              </p>
            </div>

            <div className="relative flex flex-col items-center w-1/3 px-1 sm:px-2 group cursor-default">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-50 border-[3px] sm:border-4 border-[#4a1216] z-10 mb-2 sm:mb-4 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_20px_rgba(254,243,199,0.8)]"></div>
              <h3 className="font-serif font-bold text-sm sm:text-lg text-amber-50">Hoy</h3>
              <p className="text-[10px] sm:text-sm text-amber-100/70 mt-1 sm:mt-2 leading-tight">
                Pilares del Monte,<br className="hidden sm:block"/>un nombre propio
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

const Clases = () => {
  const [fondoData, setFondoData] = useState(null);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    fetch('https://pilares-de-el-monte.onrender.com/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionClases = datos.find(seccion => seccion.identificador === 'clases');
        setFondoData(seccionClases);
      })
      .catch(error => console.error("Error al cargar fondo:", error));

    fetch('https://pilares-de-el-monte.onrender.com/api/clases/')
      .then(respuesta => respuesta.json())
      .then(datos => setClases(datos))
      .catch(error => console.error("Aún no existe la API de clases en Django:", error));
  }, []);

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
    <div className="bg-amber-50 text-stone-900 pb-10 min-h-screen">
      <section
        className="relative py-14 px-4 sm:px-8 text-center bg-cover bg-center border-b border-amber-200"
        style={fondoData?.imagen_fondo ? { backgroundImage: `url(${fondoData.imagen_fondo})` } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-amber-50/95 to-amber-50 backdrop-blur-[2px]"></div>

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
            <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain scale-[2.5]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 mb-2 drop-shadow-sm px-2">
            {fondoData ? fondoData.titulo : "Experiencias en el Monte"}
          </h1>
          <p className="italic text-stone-700 font-medium max-w-2xl mx-auto drop-shadow-sm px-4">
            Vive el monte a través de los sentidos
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-12 sm:py-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {eventosMostrar.map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-amber-100 overflow-hidden flex flex-col"
          >
            <div className="h-1.5" style={{ backgroundColor: e.color || '#4a1220' }} />
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <span
                className="self-start text-[10px] sm:text-xs tracking-widest font-semibold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: `${e.color || '#4a1220'}1a`, color: e.color || '#4a1220' }}
              >
                {e.tipo ? e.tipo.toUpperCase() : "EVENTO"}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl text-stone-900 mb-4">{e.titulo}</h3>

              <div className="space-y-2 mb-5 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{e.fecha}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{e.hora}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="truncate">{e.lugar}</span>
                  {e.nivel && (
                    <span className="ml-2 text-[10px] border border-amber-300 rounded-full px-2 py-0.5 text-stone-500 whitespace-nowrap">
                      {e.nivel}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1">{e.descripcion}</p>

              <div className="mt-auto pt-5 border-t border-amber-100 text-center">
                <p className="text-xs text-stone-500 mb-2">
                  Para inscribirte o consultar, comunícate con nosotros.
                </p>
                <Link
                  to="/contactanos"
                  className="inline-block font-serif italic text-amber-700 hover:text-red-900 font-medium transition-colors text-sm sm:text-base"
                >
                  Ir a la sección de contacto →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Recuerdos = () => {
  const [recuerdos, setRecuerdos] = useState([]);

  useEffect(() => {
    fetch('https://pilares-de-el-monte.onrender.com/api/recuerdos/')
      .then(respuesta => respuesta.json())
      .then(datos => setRecuerdos(datos))
      .catch(error => console.error("Error al cargar recuerdos:", error));
  }, []);

  return (
    <div className="bg-amber-50 text-stone-900 pb-20 min-h-screen overflow-hidden">
      <section className="relative py-14 px-4 sm:px-8 text-center border-b border-amber-200 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 mb-12 sm:mb-16">
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
            <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain scale-[2.5]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 mb-2">
            Nuestros Recuerdos
          </h1>
          <p className="italic text-stone-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            El álbum familiar de San Francisco del Monte
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 max-w-5xl mx-auto">
        {recuerdos.length === 0 ? (
          <p className="text-center text-stone-500 italic mt-10">Aún no hay recuerdos en el álbum.</p>
        ) : (
          <div className="space-y-20 sm:space-y-24">
            {recuerdos.map((recuerdo, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={recuerdo.id}
                  className={`flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className={`bg-white p-2 sm:p-3 shadow-lg border border-amber-100 transition-transform duration-500 hover:rotate-0 ${isEven ? 'rotate-1 sm:rotate-2' : '-rotate-1 sm:-rotate-2'} max-w-md w-full`}>
                      <div
                        className="h-60 sm:h-80 flex flex-col items-center justify-center border-2 border-dashed border-amber-300 relative overflow-hidden bg-stone-100"
                      >
                        {recuerdo.imagen ? (
                          <img
                            src={recuerdo.imagen}
                            alt={recuerdo.titulo}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-stone-400 italic text-sm">
                            Sin fotografía
                          </div>
                        )}
                      </div>
                      <p className="text-center text-[10px] sm:text-xs tracking-widest text-stone-500 mt-2 sm:mt-3 uppercase font-semibold">
                        {recuerdo.fecha || "Archivo Histórico"}
                      </p>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 text-center md:text-left space-y-4 px-2 sm:px-0">
                    <div className="inline-block">
                      <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mb-1">{recuerdo.titulo}</h2>
                      <div className={`h-0.5 w-16 bg-amber-600 ${isEven ? 'mx-auto md:ml-0' : 'mx-auto md:ml-auto md:mr-0'}`}></div>
                    </div>

                    <p className="text-stone-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                      {recuerdo.descripcion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const Vinos = () => {
  const [vinos, setVinos] = useState([]);
  const [cepas, setCepas] = useState([]);
  const [filtro, setFiltro] = useState('disponibles');
  const [vinoSeleccionado, setVinoSeleccionado] = useState(null);

  const carruselRef = useRef(null);

  useEffect(() => {
    fetch('https://pilares-de-el-monte.onrender.com/api/vinos/')
      .then(respuesta => respuesta.json())
      .then(datos => setVinos(datos))
      .catch(error => console.error("Error al cargar vinos:", error));

    fetch('https://pilares-de-el-monte.onrender.com/api/cepas/')
      .then(respuesta => respuesta.json())
      .then(datos => setCepas(datos))
      .catch(error => console.error("Error al cargar cepas:", error));
  }, []);

  const vinosFiltrados = vinos.filter((vino) => {
    if (filtro === 'disponibles') return vino.stock > 0;
    if (filtro === 'proximamente') return vino.stock === 0 || vino.stock == null;
    return true;
  });

  const moverCarrusel = (direccion) => {
    if (carruselRef.current) {
      const desplazamiento = direccion === 'izq' ? -300 : 300;
      carruselRef.current.scrollBy({ left: desplazamiento, behavior: 'smooth' });
    }
  };

  const obtenerNombreCepa = (idCepa) => {
    const cepaEncontrada = cepas.find(c => c.id === idCepa);
    return cepaEncontrada ? cepaEncontrada.nombre : "Ensamblaje Especial";
  };

  return (
    <div className="bg-amber-50 text-stone-900 pb-10 min-h-screen flex flex-col">
      <section className="bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 py-10 sm:py-14 px-4 sm:px-8 text-center mb-8 border-b border-amber-200">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="h-px w-8 sm:w-12 bg-amber-600"></span>
          <Wine className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
          <span className="h-px w-8 sm:w-12 bg-amber-600"></span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 mb-2">Nuestro Catálogo</h1>
        <p className="italic text-stone-600 max-w-lg mx-auto text-sm sm:text-base px-2">
          Vinos con historia, etiqueta a etiqueta — cada cosecha cuenta un capítulo de San Francisco del Monte.
        </p>
      </section>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-10 px-4">
        <button
          onClick={() => setFiltro('disponibles')}
          className={`w-full sm:w-auto px-8 py-2.5 rounded-full font-serif text-sm transition-all duration-300 ${
            filtro === 'disponibles' ? 'bg-red-900 text-amber-50 shadow-md sm:scale-105' : 'bg-white text-stone-600 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          Disponibles
        </button>
        <button
          onClick={() => setFiltro('proximamente')}
          className={`w-full sm:w-auto px-8 py-2.5 rounded-full font-serif text-sm transition-all duration-300 ${
            filtro === 'proximamente' ? 'bg-red-900 text-amber-50 shadow-md sm:scale-105' : 'bg-white text-stone-600 border border-amber-200 hover:bg-amber-100'
          }`}
        >
          Próximamente
        </button>
      </div>

      <section className="relative px-2 sm:px-12 max-w-7xl mx-auto mb-20 group flex-grow w-full">
        <button onClick={() => moverCarrusel('izq')} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur items-center justify-center rounded-full shadow-lg border border-amber-200 text-amber-800 hover:bg-amber-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div ref={carruselRef} className="flex overflow-x-auto gap-4 sm:gap-8 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar px-4 sm:px-2 w-full">
          {vinosFiltrados.length === 0 ? (
            <div className="w-full text-center py-12 italic text-stone-500">No hay vinos en esta categoría.</div>
          ) : (
            vinosFiltrados.map((vino) => (
              <div
                key={vino.id}
                onClick={() => setVinoSeleccionado(vino)}
                className="flex-none w-[85vw] max-w-[280px] sm:w-80 snap-center relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden border border-amber-100 flex flex-col cursor-pointer group"
              >
                <div className="h-56 sm:h-64 flex items-center justify-center border-b border-dashed border-amber-200 relative overflow-hidden bg-stone-50">
                  {vino.imagen ? (
                    <img src={vino.imagen} alt={vino.nombre} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner bg-red-900 group-hover:scale-105 transition-transform">
                      <Wine className="w-7 h-7 text-amber-50" />
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <div className="h-0.5 w-10 mb-3 bg-red-900" />

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] sm:text-xs tracking-widest text-amber-700 font-semibold uppercase">
                      COSECHA {vino.cosecha || vino.anio_cosecha}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-red-900">
                      ${vino.precio?.toLocaleString('es-CL')}
                    </span>
                  </div>

                  <span className="self-start text-[10px] sm:text-xs font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded mb-2">
                    {obtenerNombreCepa(vino.cepa)}
                  </span>

                  <h3 className="font-serif text-base sm:text-lg text-stone-900 mb-2 leading-snug">{vino.nombre}</h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4 flex-grow italic line-clamp-3">
                    {vino.maridaje ? `Maridaje: ${vino.maridaje}` : "Haz clic para ver los detalles y notas de cata."}
                  </p>

                  <div className="flex items-center gap-1 text-xs sm:text-sm font-medium text-red-900 transition-all mt-auto pt-3 sm:pt-4 border-t border-amber-100">
                    Ver detalles <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <button onClick={() => moverCarrusel('der')} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur items-center justify-center rounded-full shadow-lg border border-amber-200 text-amber-800 hover:bg-amber-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* POPUP DEL VINO */}
      {vinoSeleccionado && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
          <div className="bg-amber-50 w-full max-w-4xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-300">

            <button
              onClick={() => setVinoSeleccionado(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-stone-800 shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 sm:p-8 border-b md:border-b-0 md:border-r border-amber-100 h-48 sm:h-auto shrink-0">
              {vinoSeleccionado.imagen ? (
                <img
                  src={vinoSeleccionado.imagen}
                  alt={vinoSeleccionado.nombre}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <Wine className="w-20 h-20 sm:w-32 sm:h-32 text-amber-200" />
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-start overflow-y-auto custom-scrollbar">
              <span className="text-xs sm:text-sm tracking-widest text-amber-700 font-semibold uppercase mb-2">
                COSECHA {vinoSeleccionado.cosecha || vinoSeleccionado.anio_cosecha}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 mb-2 leading-tight">
                {vinoSeleccionado.nombre}
              </h2>

              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                  {obtenerNombreCepa(vinoSeleccionado.cepa)}
                </span>
                <span className="text-lg sm:text-xl font-bold text-red-900">
                  ${vinoSeleccionado.precio?.toLocaleString('es-CL')}
                </span>
              </div>

              <div className="h-px w-full bg-amber-200 mb-4 sm:mb-6"></div>

              <div className="mb-4 sm:mb-6">
                <h3 className="font-serif text-base sm:text-lg text-stone-900 mb-2">Notas de Cata</h3>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {vinoSeleccionado.descripcion}
                </p>
              </div>

              {vinoSeleccionado.maridaje && (
                <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-amber-100/50 rounded-lg border border-amber-200">
                  <h3 className="font-serif text-sm sm:text-md text-stone-900 mb-1 flex items-center gap-2">
                    <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-amber-700" /> Maridaje Sugerido
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700">{vinoSeleccionado.maridaje}</p>
                </div>
              )}

              <Link
                to="/contactanos"
                className="mt-auto block w-full text-center bg-red-900 text-amber-50 py-2.5 sm:py-3 rounded hover:bg-red-950 transition-colors font-serif text-base sm:text-lg shadow-md"
              >
                {filtro === 'disponibles' ? 'Agendar cata' : 'Consultar disponibilidad'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Contactanos = () => (
  <div className="bg-amber-50 text-stone-900 min-h-[60vh] flex items-center justify-center p-8">
    <div className="text-center">
      <h2 className="font-serif text-4xl text-[#7f1d1d] mb-4">Envíanos un mensaje</h2>
      <p className="text-stone-600">Página de contacto en construcción.</p>
    </div>
  </div>
);

// NUEVO FOOTER RESPONSIVO EN TAILWIND
const Footer = () => (
  <footer className="bg-amber-50/80 border-t border-amber-200 py-12 px-6 sm:px-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10 text-center md:text-left mt-auto w-full z-10">
    <div className="flex flex-col gap-2">
      <h3 className="font-serif text-xl text-[#7f1d1d] mb-2 font-bold">Ubicación</h3>
      <p className="text-stone-700 text-sm">Moisés Chacón 78, El Monte</p>
      <p className="text-stone-700 text-sm">El Monte, Chile 9810001</p>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="font-serif text-xl text-[#7f1d1d] mb-2 font-bold">Horarios</h3>
      <p className="text-stone-700 text-sm">Lunes — Viernes</p>
      <p className="text-stone-700 text-sm">08:00 — 18:00</p>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="font-serif text-xl text-[#7f1d1d] mb-2 font-bold">Contacto</h3>
      <p className="text-stone-700 text-sm">armijopilares@gmail.com</p>
      <p className="text-stone-700 text-sm">+56 9 3034 2433</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="bg-amber-50 min-h-screen flex flex-col overflow-x-hidden selection:bg-amber-200 selection:text-amber-900">
        <Navbar />

        <main className="flex-grow flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/recuerdos" element={<Recuerdos />} />
            <Route path="/vinos" element={<Vinos />} />
            <Route path="/contactanos" element={<Contactanos />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;