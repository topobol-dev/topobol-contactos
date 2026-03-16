import './App.css'
import { useProfile } from './hooks/useProfile'
import { useEffect } from 'react'

function App() {
  // Toda la lógica de negocio y datos ahora vive en el hook
  const { profile, loading, notFound } = useProfile()

  // SEO / SEA Management (Search Engine Optimization / Advertising)
  useEffect(() => {
    let title = "TOPOBOL - Agricultura de Precisión y Ganadería en Bolivia";
    let description = "TOPOBOL: líder en agricultura de precisión en Bolivia. Venta de tractores, maquinaria e insumos para ganadería y agronomía. / TOPOBOL: Leader in precision agriculture in Bolivia. Sales of tractors, machinery, and supplies for livestock and agronomy.";
    // Fallback image if no profile image is available (replace with a real hosted URL if possible)
    let image = "https://topobol.com/logo.png";

    if (!loading && !notFound && profile) {
      title = `${profile.nombre} | TOPOBOL`;
      description = `Contacta a ${profile.nombre} de TOPOBOL para soluciones en agricultura de precisión y ganadería en Bolivia. / Contact ${profile.nombre} from TOPOBOL for solutions in precision agriculture and livestock in Bolivia.`;

      if (profile.imagen) {
        image = profile.imagen;
      } else if (profile.portada) {
        image = profile.portada;
      }
    } else if (notFound) {
      title = "Perfil no encontrado / Profile Not Found | TOPOBOL";
    }

    // Update Title
    document.title = title;

    // Update Meta Tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: 'Topobol, Bolivia, agricultura de precisión, ganadería, tractores, maquinaria agrícola, insumos para ganadería, agronomía, drones agrícolas, mapeo de cultivos, fertilizantes, precision agriculture, livestock, tractors, agricultural machinery, livestock supplies, agronomy, agricultural drones, crop mapping, fertilizers, LinkTree' },
      // Open Graph / Facebook
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: 'TOPOBOL' },
      { property: 'og:locale', content: 'es_BO' },
      { property: 'og:locale:alternate', content: 'en_US' },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    metaTags.forEach(tag => {
      let element;
      if (tag.name) {
        element = document.querySelector(`meta[name="${tag.name}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('name', tag.name);
          document.head.appendChild(element);
        }
      } else if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', tag.property);
          document.head.appendChild(element);
        }
      }
      if (element) element.setAttribute('content', tag.content);
    });
  }, [profile, loading, notFound]);

  if (loading) {
    return (
      <div className="loading-screen">
        Cargando perfil...
      </div>
    )
  }

  if (notFound || !profile) {
    return (
      <div className="error-screen">
        <h1>404</h1>
        <p>Perfil no encontrado</p>
        <p style={{ fontSize: '0.9em', color: '#ffffff' }}>Asegúrate de usar una URL con el slug del usuario (ej. /claudio-becerra)</p>
      </div>
    )
  }

  return (
    <div className="app-container">
      {/* Portada */}
      {profile.portada && (
        <div className="cover-container" style={{
          backgroundImage: `url(${profile.portada})`,
        }}></div>
      )}

      <div className="profile-section" style={!profile.portada ? { marginTop: '40px' } : {}}>
        {/* Imagen de perfil */}
        {profile.imagen && (
          <img
            src={profile.imagen}
            alt={profile.nombre}
            className="profile-image"
          />
        )}

        <h2 className="profile-name">{profile.nombre}</h2>
        <p className="profile-role">{profile.cargo}</p>

        <div className="links-container">
          {profile.correo && (
            <a href={`mailto:${profile.correo}`} className="link-card">
              {/* <img src="/email.svg" alt="Email" className="link-icon" /> */}
              Correo
            </a>
          )}

          {profile.Instagram != '' && (
            <a href={formatUrl(profile.Instagram)} target="_blank" rel="noopener noreferrer" className="link-card">
              <img src="/ig.png" alt="Instagram" className="link-icon" />
              Instagram
            </a>
          )}

          {profile.Whatsapp && (
            <a href={`https://wa.me/${profile.Whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="link-card">
              <img src="/wp.png" alt="Whatsapp" className="link-icon" />
              Whatsapp
            </a>
          )}

          {profile.Facebook && (
            <a href={formatUrl(profile.Facebook)} target="_blank" rel="noopener noreferrer" className="link-card">
              <img src="/fb.png" alt="Facebook" className="link-icon" />
              Facebook
            </a>
          )}
          {profile.tiktok && (
            <a href={formatUrl(profile.tiktok)} target="_blank" rel="noopener noreferrer" className="link-card">
              <img src="/tiktok.png" alt="TikTok" className="link-icon" />
              TikTok
            </a>
          )}
          {profile.web && (
            <a href={formatUrl(profile.web)} target="_blank" rel="noopener noreferrer" className="link-card">
              <img src="/web.png" alt="Web" className="link-icon" />
              Web
            </a>
          )}
        </div>

        <footer className="footer" style={{ opacity: 1 }}>
          <img src="/topobol_blanco.png" alt="Topobol" style={{ height: '40px' }} />
        </footer>
      </div>
    </div>
  )
}

// Helpers de UI
const formatUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

export default App
