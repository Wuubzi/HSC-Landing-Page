# Documentación HSC - Landing Page de Construcción

## Índice

1. [Configuración Inicial](#configuración-inicial)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Sistema Multiidioma](#sistema-multiidioma)
4. [Gestión de Contenido](#gestión-de-contenido)
5. [Sistema de Blogs](#sistema-de-blogs)
6. [Gestión de Proyectos](#gestión-de-proyectos)
7. [Gestión de Miembros del Equipo](#gestión-de-miembros-del-equipo)
8. [Gestión de Reviews/Testimonios](#gestión-de-reviewstestimonios)
9. [Configuración de Redes Sociales](#configuración-de-redes-sociales)
10. [Configuración de Email y Formularios](#configuración-de-email-y-formularios)
11. [Manejo de Imágenes](#manejo-de-imágenes)
12. [Desarrollo y Deployment](#desarrollo-y-deployment)

---

## Configuración Inicial

### Requisitos del Sistema

- **Node.js** versión 18 o superior
- **npm** o **yarn** como gestor de paquetes
- **Git** para control de versiones

### Instalación del Proyecto

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd proyecto-hsc

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Scripts Disponibles

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

---

## Estructura del Proyecto

```
proyecto-hsc/
├── public/                    # Archivos estáticos
│   └── assets/               # Recursos multimedia
│       ├── blog/            # Imágenes de blogs
│       ├── icons/           # Iconos del sitio
│       ├── images/          # Imágenes principales
│       ├── members/         # Fotos del equipo
│       └── projects/        # Imágenes de proyectos
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── content/            # Contenido estructurado
│   │   └── blog/           # Blogs en markdown
│   ├── layouts/            # Plantillas de página
│   ├── pages/              # Páginas del sitio
│   └── ui/                 # Sistema de traducciones
│       └── index.ts        # Configuración multiidioma
├── astro.config.mjs        # Configuración de Astro
└── package.json           # Dependencias del proyecto
```

### Descripción de Carpetas

#### `public/assets/`

- **`blog/`**: Imágenes utilizadas en los artículos del blog
- **`icons/`**: Iconos SVG y PNG del sitio web
- **`images/`**: Imágenes principales (hero, about, etc.)
- **`members/`**: Fotografías de los miembros del equipo
- **`projects/`**: Imágenes de los proyectos realizados

#### `src/content/blog/`

Estructura para cada blog:

```
blog/
├── nombre-del-blog/
│   ├── en/
│   │   └── index.md      # Versión en inglés
│   └── es/
│       └── index.md      # Versión en español
```

---

## Sistema Multiidioma

### Configuración Base

El sistema de traducciones está centralizado en `src/ui/index.ts`:

```typescript
export const languages = {
  es: "Español",
  en: "English",
};

export const labels = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre Nosotros",
    // ... más traducciones
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    // ... más traducciones
  },
};
```

### Hook de Traducciones

```typescript
import { labels } from "./ui";

const defaultLang = "es";

export function useTranslations(lang: keyof typeof labels) {
  return function translate(key: keyof (typeof labels)[typeof defaultLang]) {
    return labels[lang][key] || labels[defaultLang][key];
  };
}
```

### Cómo Usar las Traducciones

#### En Componentes Astro

```astro
---
import { useTranslations } from "../ui";
import { languages } from "../ui";

// Obtener idioma actual de la URL o contexto
const currentLang = Astro.url.pathname.startsWith('/en') ? 'en' : 'es';

// Crear función de traducción
const translateLabels = useTranslations(currentLang as keyof typeof languages);
---

<h1>{translateLabels("nav.home")}</h1>
<p>{translateLabels("hero.description")}</p>
```

#### Agregar Nuevas Traducciones

1. Abrir `src/ui/index.ts`
2. Agregar la nueva clave en ambos idiomas:

```typescript
export const labels = {
  es: {
    // ... traducciones existentes
    "nueva.seccion.titulo": "Mi Nuevo Título",
    "nueva.seccion.descripcion": "Mi nueva descripción",
  },
  en: {
    // ... traducciones existentes
    "nueva.seccion.titulo": "My New Title",
    "nueva.seccion.descripcion": "My new description",
  },
};
```

3. Usar en el componente:

```astro
<h2>{translateLabels("nueva.seccion.titulo")}</h2>
<p>{translateLabels("nueva.seccion.descripcion")}</p>
```

---

## Gestión de Contenido

### Modificar Contenido Existente

#### Textos Principales

1. **Ubicación**: `src/ui/index.ts`
2. **Proceso**:
   - Buscar la clave correspondiente (ej: `"hero.title"`)
   - Modificar el texto en español e inglés
   - Guardar el archivo

#### Ejemplo: Cambiar el título del hero

```typescript
// Antes
"hero.title": "Gestionar  la Construccion.",

// Después
"hero.title": "Gestionar la Construcción Moderna.",
```

### Estructura de Contenido

Cada sección tiene claves organizadas por prefijo:

- `nav.*` - Navegación
- `hero.*` - Sección principal
- `aboutUs.*` - Sobre nosotros
- `service.*` - Servicios
- `project.*` - Proyectos
- `members.*` - Equipo
- `reviews.*` - Testimonios
- `blog.*` - Blog
- `footer.*` - Pie de página

---

## Sistema de Blogs

### Crear un Nuevo Blog

#### Paso 1: Crear la Estructura de Carpetas

```bash
# Crear carpeta del blog
mkdir src/content/blog/mi-nuevo-blog

# Crear subcarpetas para idiomas
mkdir src/content/blog/mi-nuevo-blog/es
mkdir src/content/blog/mi-nuevo-blog/en
```

#### Paso 2: Crear el Archivo en Español

`src/content/blog/mi-nuevo-blog/es/index.md`:

```markdown
---
title: "Innovaciones en Construcción Sostenible"
description: "Exploramos las últimas tecnologías y métodos que están revolucionando la construcción sostenible en Colombia."
author: "Ingeniero Juan Pérez"
date: 2024-12-15T00:00:00.000Z
image: "/assets/blog/construccion-sostenible.jpg"
tags: ["sostenibilidad", "innovación", "construcción", "tecnología"]
lang: "es"
---

# 🌱 Innovaciones en Construcción Sostenible

La industria de la construcción está experimentando una transformación sin precedentes hacia prácticas más sostenibles y respetuosas con el medio ambiente.

## Materiales Eco-Amigables

### Concreto Reciclado

El uso de concreto reciclado reduce significativamente:

- **Huella de carbono** en un 40%
- **Costos de materiales** hasta un 25%
- **Residuos de construcción** en vertederos

### Acero Reutilizado

En nuestros proyectos implementamos:

- Estructuras metálicas recicladas
- Certificación de origen sostenible
- Procesos de tratamiento ecológicos

## Tecnologías Emergentes

### Construcción Modular

La construcción modular ofrece ventajas como:

- Reducción del tiempo de construcción en 50%
- Mayor control de calidad
- Menor impacto ambiental en el sitio

### Domótica Integrada

Implementamos sistemas inteligentes que incluyen:

- Control automatizado de iluminación
- Gestión eficiente de climatización
- Monitoreo de consumo energético en tiempo real

## Casos de Éxito

### Proyecto Eco-Industrial Barranquilla

En este proyecto logramos:

- **Certificación LEED Gold**
- **30% de ahorro energético**
- **Reducción de 60% en consumo de agua**

> "La sostenibilidad no es solo una tendencia, es el futuro de la construcción" - Ing. María González, Directora de Proyectos HSC

## Beneficios Económicos

| Aspecto       | Ahorro Promedio | Período de Retorno |
| ------------- | --------------- | ------------------ |
| Energía       | 35%             | 3-5 años           |
| Agua          | 25%             | 2-3 años           |
| Mantenimiento | 40%             | 1-2 años           |

## Compromiso HSC

En **HSC Construcciones**, nuestro compromiso con la sostenibilidad se refleja en:

1. **Certificaciones ambientales** de todos nuestros proyectos
2. **Capacitación constante** de nuestro equipo
3. **Investigación y desarrollo** de nuevas técnicas
4. **Alianzas estratégicas** con proveedores sostenibles

## Futuro de la Construcción

Las tendencias que marcarán el 2025:

- Construcción con impresión 3D
- Materiales bio-degradables
- Energías renovables integradas
- Ciudades inteligentes

### Próximos Pasos

¿Estás listo para construir el futuro de manera sostenible? Contáctanos para conocer cómo podemos hacer realidad tu proyecto con las mejores prácticas ambientales.

---

_¿Te interesa conocer más sobre nuestros proyectos sostenibles? Visita nuestra sección de proyectos o contáctanos directamente._
```

#### Paso 3: Crear el Archivo en Inglés

`src/content/blog/mi-nuevo-blog/en/index.md`:

```markdown
---
title: "Innovations in Sustainable Construction"
description: "We explore the latest technologies and methods that are revolutionizing sustainable construction in Colombia."
author: "Engineer Juan Pérez"
date: 2024-12-15T00:00:00.000Z
image: "/assets/blog/construccion-sostenible.jpg"
tags: ["sustainability", "innovation", "construction", "technology"]
lang: "en"
---

# 🌱 Innovations in Sustainable Construction

The construction industry is experiencing an unprecedented transformation towards more sustainable and environmentally friendly practices.

## Eco-Friendly Materials

### Recycled Concrete

The use of recycled concrete significantly reduces:

- **Carbon footprint** by 40%
- **Material costs** up to 25%
- **Construction waste** in landfills

### Reused Steel

In our projects we implement:

- Recycled metal structures
- Sustainable origin certification
- Ecological treatment processes

## Emerging Technologies

### Modular Construction

Modular construction offers advantages such as:

- 50% reduction in construction time
- Better quality control
- Lower environmental impact on site

### Integrated Home Automation

We implement intelligent systems that include:

- Automated lighting control
- Efficient climate management
- Real-time energy consumption monitoring

## Success Stories

### Eco-Industrial Project Barranquilla

In this project we achieved:

- **LEED Gold Certification**
- **30% energy savings**
- **60% reduction in water consumption**

> "Sustainability is not just a trend, it's the future of construction" - Eng. María González, HSC Project Director

## Economic Benefits

| Aspect      | Average Savings | Payback Period |
| ----------- | --------------- | -------------- |
| Energy      | 35%             | 3-5 years      |
| Water       | 25%             | 2-3 years      |
| Maintenance | 40%             | 1-2 years      |

## HSC Commitment

At **HSC Construcciones**, our commitment to sustainability is reflected in:

1. **Environmental certifications** for all our projects
2. **Constant training** of our team
3. **Research and development** of new techniques
4. **Strategic partnerships** with sustainable suppliers

## Future of Construction

Trends that will mark 2025:

- 3D printing construction
- Bio-degradable materials
- Integrated renewable energy
- Smart cities

### Next Steps

Are you ready to build the future sustainably? Contact us to learn how we can make your project a reality with the best environmental practices.

---

_Interested in learning more about our sustainable projects? Visit our projects section or contact us directly._
```

#### Paso 4: Agregar la Imagen

1. Subir la imagen a `public/assets/blog/`
2. Usar el nombre especificado en el frontmatter (`construccion-sostenible.jpg`)

### Metadatos del Blog (Frontmatter)

```yaml
---
title: "Título del Blog" # Título principal
description: "Descripción SEO" # Meta descripción
author: "Nombre del Autor" # Autor del artículo
date: 2024-12-15T00:00:00.000Z # Fecha de publicación
image: "/assets/blog/imagen.jpg" # Imagen destacada
tags: ["tag1", "tag2", "tag3"] # Etiquetas
lang: "es" # Idioma del contenido
---
```

### Elementos de Markdown Soportados

#### Encabezados

```markdown
# Título Principal (H1)

## Subtítulo (H2)

### Sección (H3)

#### Subsección (H4)
```

#### Texto Enriquecido

```markdown
**Texto en negrita**
_Texto en cursiva_
~~Texto tachado~~
`Código inline`
```

#### Listas

```markdown
- Elemento de lista
- Otro elemento
  - Subelemento
  - Otro subelemento

1. Lista numerada
2. Segundo elemento
3. Tercer elemento
```

#### Enlaces e Imágenes

```markdown
[Texto del enlace](https://ejemplo.com)
![Texto alternativo](ruta/a/imagen.jpg)
```

#### Tablas

```markdown
| Columna 1 | Columna 2 | Columna 3 |
| --------- | --------- | --------- |
| Dato 1    | Dato 2    | Dato 3    |
| Dato 4    | Dato 5    | Dato 6    |
```

#### Citas

```markdown
> Esta es una cita importante
> que puede ocupar varias líneas
```

#### Código

````markdown
```javascript
const ejemplo = "código de ejemplo";
console.log(ejemplo);
```
````

````

---

## Gestión de Proyectos

### Agregar un Nuevo Proyecto

#### Paso 1: Ubicar el Componente
Navegar a: `src/components/Projects.astro`

#### Paso 2: Encontrar el Array de Proyectos
```javascript
const projects = [
  // Proyectos existentes...
];
````

#### Paso 3: Agregar el Nuevo Proyecto

```javascript
const projects = [
  // Proyectos existentes...

  // Nuevo Proyecto
  {
    title: translateLabels("project-card-fourth-title"),
    description: translateLabels("project-card-fourth-description"),
    image: "/assets/projects/mi-nuevo-proyecto.webp",
    imageAlt: translateLabels("project-card-fourth-alt"),
  },
];
```

#### Paso 4: Agregar las Traducciones

En `src/ui/index.ts`:

```typescript
export const labels = {
  es: {
    // ... otras traducciones
    "project-card-fourth-title": "Centro Comercial Moderno",
    "project-card-fourth-description":
      "Complejo comercial con diseño arquitectónico innovador y espacios multifuncionales.",
    "project-card-fourth-alt":
      "Vista exterior del centro comercial con fachada moderna de vidrio y acero.",
  },
  en: {
    // ... otras traducciones
    "project-card-fourth-title": "Modern Shopping Center",
    "project-card-fourth-description":
      "Commercial complex with innovative architectural design and multifunctional spaces.",
    "project-card-fourth-alt":
      "Exterior view of the shopping center with modern glass and steel facade.",
  },
};
```

#### Paso 5: Agregar la Imagen

1. Subir la imagen a `public/assets/projects/`
2. Usar formato WebP para mejor rendimiento
3. Resolución recomendada: 600x400px mínimo

### Estructura de un Proyecto

```javascript
{
  title: "Título del proyecto (traducido)",
  description: "Descripción del proyecto (traducida)",
  image: "/assets/projects/nombre-imagen.webp",
  imageAlt: "Texto alternativo (traducido)",
}
```

---

## Gestión de Miembros del Equipo

### Agregar un Nuevo Miembro

#### Paso 1: Ubicar el Componente

Navegar a: `src/components/Members.astro`

#### Paso 2: Encontrar el Array de Miembros

```javascript
const members = [
  // Miembros existentes...
];
```

#### Paso 3: Agregar el Nuevo Miembro

```javascript
const members = [
  // Miembros existentes...

  // Nuevo Miembro
  {
    image: "/assets/images/members-fourth-card-image.webp",
    imageAlt: translateLabels("members.fourth.card.imageAlt"),
    name: "Ana María González",
    Occupation: translateLabels("members.fourth.card.ocupation"),
  },
];
```

#### Paso 4: Agregar las Traducciones

En `src/ui/index.ts`:

```typescript
export const labels = {
  es: {
    // ... otras traducciones
    "members.fourth.card.imageAlt":
      "Foto de Ana María González, Arquitecta Senior",
    "members.fourth.card.ocupation": "Arquitecta Senior",
  },
  en: {
    // ... otras traducciones
    "members.fourth.card.imageAlt":
      "Photo of Ana María González, Senior Architect",
    "members.fourth.card.ocupation": "Senior Architect",
  },
};
```

#### Paso 5: Agregar la Imagen del Miembro

1. Subir la imagen a `public/assets/images/`
2. Usar formato WebP para mejor rendimiento
3. Resolución recomendada: 400x400px
4. Nombre sugerido: `members-fourth-card-image.webp`

### Estructura de un Miembro

```javascript
{
  image: "/assets/images/members-nombre-image.webp",
  imageAlt: "Texto alternativo descriptivo (traducido)",
  name: "Nombre Completo",
  Occupation: "Cargo o Posición (traducido)",
}
```

---

## Gestión de Reviews/Testimonios

### Agregar un Nuevo Testimonio

#### Paso 1: Ubicar el Componente

Navegar a: `src/components/Reviews.astro`

#### Paso 2: Encontrar el Array de Reviews

```javascript
const reviews = [
  // Reviews existentes...
];
```

#### Paso 3: Agregar el Nuevo Testimonio

```javascript
const reviews = [
  // Reviews existentes...

  // Nuevo Testimonio
  {
    image: "/assets/images/reviews-card-fourth-image.webp",
    imageAlt: translateLabels("reviews.card.fourth.imageAlt"),
    name: "María Fernández",
    occupation: "Directora de Proyectos",
    review: translateLabels("reviews.card.fourth.review"),
  },
];
```

#### Paso 4: Agregar las Traducciones

En `src/ui/index.ts`:

```typescript
export const labels = {
  es: {
    // ... otras traducciones
    "reviews.card.fourth.imageAlt":
      "Foto de María Fernández, cliente satisfecha",
    "reviews.card.fourth.review":
      "Excelente trabajo de HSC. Cumplieron con todos los plazos y la calidad superó nuestras expectativas. Recomendados al 100%.",
  },
  en: {
    // ... otras traducciones
    "reviews.card.fourth.imageAlt":
      "Photo of María Fernández, satisfied client",
    "reviews.card.fourth.review":
      "Excellent work from HSC. They met all deadlines and quality exceeded our expectations. 100% recommended.",
  },
};
```

#### Paso 5: Agregar la Imagen del Cliente

1. Subir la imagen a `public/assets/images/`
2. Usar formato WebP para mejor rendimiento
3. Resolución recomendada: 300x300px
4. Nombre sugerido: `reviews-card-fourth-image.webp`

### Estructura de un Testimonio

```javascript
{
  image: "/assets/images/reviews-card-nombre-image.webp",
  imageAlt: "Descripción de la imagen (traducida)",
  name: "Nombre del Cliente",
  occupation: "Cargo o Empresa",
  review: "Testimonio completo (traducido)",
}
```

---

## Configuración de Redes Sociales

### Editar Enlaces de Redes Sociales

#### Paso 1: Ubicar el Archivo JavaScript

El archivo que controla las redes sociales está en: `src/components/footer.js`

#### Paso 2: Modificar las URLs

En la función `redirectTo`, cambiar las URLs por las correctas:

```javascript
// Facebook
if (facebookLink) {
  facebookLink.style.cursor = "pointer";
  facebookLink.addEventListener("click", () => {
    redirectTo("https://www.facebook.com/tu-pagina-facebook");
  });
}

// Twitter/X
if (twitterLink) {
  twitterLink.style.cursor = "pointer";
  twitterLink.addEventListener("click", () => {
    redirectTo("https://twitter.com/tu-usuario-twitter");
  });
}

// LinkedIn
if (linkedinLink) {
  linkedinLink.style.cursor = "pointer";
  linkedinLink.addEventListener("click", () => {
    redirectTo("https://www.linkedin.com/company/tu-empresa");
  });
}

// Instagram
if (instagramLink) {
  instagramLink.style.cursor = "pointer";
  instagramLink.addEventListener("click", () => {
    redirectTo("https://www.instagram.com/tu-usuario-instagram");
  });
}
```

#### Ejemplo de URLs Reales:

```javascript
// Ejemplos para HSC
redirectTo("https://www.facebook.com/HSCConstrucciones");
redirectTo("https://twitter.com/HSC_Construccion");
redirectTo("https://www.linkedin.com/company/hsc-construcciones");
redirectTo("https://www.instagram.com/hsc_construcciones");
```

---

## Configuración de Email y Formularios

### Variables de Entorno (.env)

#### Configuración Actual

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=carlosasalas321@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
RECIPIENT_EMAIL=carlosasalas321@gmail.com
```

#### Cómo Obtener la Contraseña de Aplicación de Gmail

1. **Activar Verificación en 2 Pasos**:

   - Ir a [Google Account Security](https://myaccount.google.com/security)
   - Activar la verificación en 2 pasos

2. **Generar Contraseña de Aplicación**:

   - En la misma página de seguridad
   - Buscar "Contraseñas de aplicaciones"
   - Seleccionar "Correo" y "Otra (nombre personalizado)"
   - Escribir "HSC Website" como nombre
   - Copiar la contraseña generada (16 caracteres)

3. **Actualizar el .env**:

```env
SMTP_PASS=abcd efgh ijkl mnop
```

#### Cambiar Email de Destino

Para que los emails lleguen a otra dirección:

```env
# Email desde donde se envía (debe ser el mismo que SMTP_USER)
SMTP_USER=carlosasalas321@gmail.com

# Email donde llegan los mensajes (puede ser diferente)
RECIPIENT_EMAIL=contacto@hsc.com
```

#### Múltiples Destinatarios

```env
# Separar con comas
RECIPIENT_EMAIL=contacto@hsc.com,admin@hsc.com,gerencia@hsc.com
```

### Configuración de Información de Contacto

#### Actualizar Datos de Contacto en el Footer

En `src/components/Footer.astro`, buscar la sección de contacto:

```astro
<div class="contact-item">
  <figure>
    <img src="/assets/Icons/location.svg" alt="" />
  </figure>
  <p>Cra 6 No 14 - 44 Palmar de Varela - Atlantico</p>
</div>
<div class="contact-item">
  <figure>
    <img src="/assets/Icons/phone.svg" alt="" />
  </figure>
  <div>
    <p>(+57) 3012886951</p>
    <p>(+57) 3004989512</p>
  </div>
</div>
<div class="contact-item">
  <figure>
    <img src="/assets/Icons/gmail.svg" alt="" />
  </figure>
  <p>ssspv@hotmail.com</p>
</div>
```

#### Para Cambiar los Datos:

1. **Dirección**: Modificar el texto en la primera `<p>`
2. **Teléfonos**: Cambiar los números en las `<p>` internas
3. **Email**: Actualizar el email en la última `<p>`

#### Ejemplo de Actualización:

```astro
<div class="contact-item">
  <figure>
    <img src="/assets/Icons/location.svg" alt="" />
  </figure>
  <p>Calle 85 No 52-45 Barranquilla - Atlántico</p>
</div>
<div class="contact-item">
  <figure>
    <img src="/assets/Icons/phone.svg" alt="" />
  </figure>
  <div>
    <p>(+57) 300 123 4567</p>
    <p>(+57) 301 987 6543</p>
  </div>
</div>
<div class="contact-item">
  <figure>
    <img src="/assets/Icons/gmail.svg" alt="" />
  </figure>
  <p>contacto@hsc.com</p>
</div>
```

### Configuración del Servidor de Email (Opcional)

#### Para Hosting Personalizado

Si usas un proveedor de hosting con email propio:

```env
# Configuración para hosting personalizado
SMTP_HOST=mail.tu-dominio.com
SMTP_PORT=587
SMTP_USER=contacto@tu-dominio.com
SMTP_PASS=tu_contraseña
RECIPIENT_EMAIL=info@tu-dominio.com
```

#### Para Otros Proveedores de Email

**Outlook/Hotmail:**

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=tu-email@outlook.com
SMTP_PASS=tu_contraseña
```

**Yahoo:**

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=tu-email@yahoo.com
SMTP_PASS=contraseña_de_aplicacion
```

### Prueba de Configuración de Email

#### Verificar que Funciona

1. **Completar el formulario** en el sitio web
2. **Revisar logs** del servidor para errores
3. **Verificar spam** en el email de destino
4. **Probar con diferentes navegadores**

#### Solución de Problemas Comunes

**Error de Autenticación:**

- Verificar usuario y contraseña
- Para Gmail, usar contraseña de aplicación
- Verificar que la verificación en 2 pasos esté activa

**Emails no llegan:**

- Revisar carpeta de spam
- Verificar que RECIPIENT_EMAIL esté correcto
- Comprobar límites del proveedor de email

**Timeout de Conexión:**

- Verificar SMTP_HOST y SMTP_PORT
- Comprobar firewall del servidor
- Intentar con puerto 465 (SSL) en lugar de 587 (TLS)

---

## Manejo de Imágenes

### Estructura de Carpetas de Imágenes

```
public/assets/
├── blog/           # Imágenes para artículos de blog
├── icons/          # Iconos del sitio (SVG, PNG)
├── images/         # Imágenes principales del sitio
├── members/        # Fotos del equipo
└── projects/       # Imágenes de proyectos
```

### Formatos Recomendados

- **WebP**: Formato principal para mejor rendimiento
- **JPEG**: Para fotos con muchos colores
- **PNG**: Para imágenes con transparencia
- **SVG**: Para iconos y gráficos vectoriales

### Dimensiones Recomendadas

```
Hero Image:         1920x1080px
Project Cards:      600x400px
Blog Featured:      1200x630px
Team Members:       400x400px
Icons:              24x24px, 32x32px, 48x48px
Thumbnails:         300x200px
```

### Optimización de Imágenes

1. **Comprimir imágenes** antes de subirlas
2. **Usar WebP** siempre que sea posible
3. **Mantener tamaños apropiados** para cada uso
4. **Incluir texto alternativo** descriptivo

### Agregar Nuevas Imágenes

#### Para Blogs

```markdown
![Descripción de la imagen](/assets/blog/mi-nueva-imagen.jpg)
```

#### Para Proyectos

1. Subir imagen a `public/assets/projects/`
2. Referenciar en el componente:

```javascript
{
  image: "/assets/projects/nuevo-proyecto.webp",
  title: "Título del Proyecto",
  description: "Descripción del proyecto",
  imageAlt: "Descripción de la imagen",
}
```

#### Para Miembros del Equipo

1. Subir imagen a `public/assets/images/`
2. Usar formato: `members-nombre-apellido.webp`
3. Referenciar en el array de miembros

#### Para Hero/Banner

1. Subir a `public/assets/images/`
2. Actualizar en el componente correspondiente
3. Usar resolución mínima de 1920x1080px

### Convenciones de Nomenclatura de Imágenes

```
Blog:          blog-titulo-del-articulo.webp
Proyectos:     project-nombre-descriptivo.webp
Miembros:      members-nombre-apellido.webp
Testimonios:   reviews-nombre-cliente.webp
Iconos:        icon-funcion-nombre.svg
Hero:          hero-seccion-principal.webp
General:       seccion-descripcion.webp
```

### Optimización de Imágenes

1. **Formato WebP** para mejor compresión
2. **Calidad 80-85%** para balance tamaño/calidad
3. **Dimensiones apropiadas** según uso
4. **Compresión sin pérdida** para iconos

### Herramientas Recomendadas

- **Squoosh.app**: Convertir y optimizar online
- **TinyPNG**: Comprimir PNG y JPEG
- **ImageOptim**: Para macOS
- **GIMP**: Editor gratuito multiplataforma

### Proceso de Optimización

1. **Redimensionar** a tamaño requerido
2. **Convertir a WebP** si es posible
3. **Comprimir** manteniendo calidad visual
4. **Verificar tamaño final** (máx. 500KB)
5. **Subir** a carpeta correspondiente

---

## Gestión de Proyectos

### Agregar un Nuevo Proyecto

#### Paso 1: Ubicar el Componente

Navegar a: `src/components/Projects.astro`

#### Paso 2: Encontrar el Array de Proyectos

```javascript
const projects = [
  // Proyectos existentes...
];
```

#### Paso 3: Agregar el Nuevo Proyecto

```javascript
const projects = [
  // Proyectos existentes...

  // Nuevo Proyecto
  {
    title: translateLabels("project-card-fourth-title"),
    description: translateLabels("project-card-fourth-description"),
    image: "/assets/projects/mi-nuevo-proyecto.webp",
    imageAlt: translateLabels("project-card-fourth-alt"),
  },
];
```

#### Paso 4: Agregar las Traducciones

En `src/ui/index.ts`:

```typescript
export const labels = {
  es: {
    // ... otras traducciones
    "project-card-fourth-title": "Centro Comercial Moderno",
    "project-card-fourth-description":
      "Complejo comercial con diseño arquitectónico innovador y espacios multifuncionales.",
    "project-card-fourth-alt":
      "Vista exterior del centro comercial con fachada moderna de vidrio y acero.",
  },
  en: {
    // ... otras traducciones
    "project-card-fourth-title": "Modern Shopping Center",
    "project-card-fourth-description":
      "Commercial complex with innovative architectural design and multifunctional spaces.",
    "project-card-fourth-alt":
      "Exterior view of the shopping center with modern glass and steel facade.",
  },
};
```

#### Paso 5: Agregar la Imagen

1. Subir la imagen a `public/assets/projects/`
2. Usar formato WebP para mejor rendimiento
3. Resolución recomendada: 600x400px mínimo
4. Nombrar archivo: `mi-nuevo-proyecto.webp`

### Estructura de un Proyecto

```javascript
{
  title: "Título del proyecto (traducido)",
  description: "Descripción del proyecto (traducida)",
  image: "/assets/projects/nombre-imagen.webp",
  imageAlt: "Texto alternativo (traducido)",
}
```

### Ejemplo Completo de Proyecto

```javascript
{
  title: translateLabels("project-card-hospital-title"),
  description: translateLabels("project-card-hospital-description"),
  image: "/assets/projects/hospital-regional-barranquilla.webp",
  imageAlt: translateLabels("project-card-hospital-alt"),
}
```

Con las traducciones correspondientes:

```typescript
// Español
"project-card-hospital-title": "Hospital Regional Barranquilla",
"project-card-hospital-description": "Moderno complejo hospitalario con tecnología de punta y capacidad para 500 pacientes.",
"project-card-hospital-alt": "Vista aérea del Hospital Regional de Barranquilla con sus instalaciones modernas.",

// English
"project-card-hospital-title": "Barranquilla Regional Hospital",
"project-card-hospital-description": "Modern hospital complex with cutting-edge technology and capacity for 500 patients.",
"project-card-hospital-alt": "Aerial view of Barranquilla Regional Hospital with its modern facilities.",
```
