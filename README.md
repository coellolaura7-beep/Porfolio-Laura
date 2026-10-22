# Portfolio · Laura Coello Cabada

Web estática en HTML, CSS y JavaScript, sin dependencias ni paso de compilación.

```
index.html              contenido de la página
css/styles.css          estilos (colores y tipografía al principio, en :root)
js/main.js              menú, animaciones, fichas de certificación, copiar correo
js/certificados.js      datos de las certificaciones  ← aquí se añaden los certificados
documents/              CV en PDF
cv/cv.html              CV editable del que sale el PDF
certificates/           certificados originales (vacía hasta tenerlos)
images/, logos/         foto y logotipos
fonts/                  tipografías (Manrope, Newsreader, IBM Plex Mono · licencia OFL)
assets-src/logos/       logotipos en alta resolución con fondo transparente (no los usa la web)
```

## Verla en el ordenador

Doble clic en `index.html`.

## Subirla a GitHub y publicarla con GitHub Pages

Sin instalar nada:

1. Entra en <https://github.com> e inicia sesión (o crea una cuenta).
2. Arriba a la derecha, **+ → New repository**. Nombre: por ejemplo `portfolio-laura`. Márcalo como **Public** y pulsa **Create repository**.
3. En el repositorio vacío, pulsa **uploading an existing file**.
4. Arrastra **el contenido** de esta carpeta (no la carpeta en sí): `index.html`, `css`, `js`, `documents`, `images`, `logos`, `fonts`, `certificates`, los iconos, etc. Pulsa **Commit changes**.
5. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y pulsa **Save**.
6. En uno o dos minutos la web estará en `https://TU-USUARIO.github.io/portfolio-laura/`.

Con git, desde esta carpeta (sustituye usuario y repositorio):

```bash
git init
git add .
git commit -m "Portfolio de Laura Coello Cabada"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portfolio-laura.git
git push -u origin main
```

y después el paso 5.

**Después de publicarla**: en `index.html`, cambia `content="og-image.png"` (etiqueta `og:image`) por la dirección completa, p. ej. `https://TU-USUARIO.github.io/portfolio-laura/og-image.png`, para que se vea la imagen al compartir el enlace por WhatsApp o LinkedIn.

> El repositorio es público: cualquiera puede ver los archivos, incluidos el teléfono y el correo (que también aparecen en la web y en el CV).

## Añadir el certificado original de una formación

1. Copia el archivo en `certificates/` con un nombre descriptivo: `microbiologia-leche.pdf`, `prevencion-riesgos-laborales.jpg`…
2. En `js/certificados.js`, rellena su campo `documento`:
   ```js
   documento: { archivo: 'certificates/microbiologia-leche.pdf', tipo: 'pdf' },
   ```
   Para imágenes: `tipo: 'imagen'`.
3. Completa `entidad`, `fecha` y `duracion` si figuran en el documento (lo que quede en `null` aparece como «Pendiente de confirmar»).
4. Sube los cambios a GitHub (en la web: **Add file → Upload files** para el PDF y el lápiz ✎ para editar `certificados.js`).

La tarjeta pasa sola de «Documento disponible próximamente» a «Documento disponible». En ordenador el PDF se ve dentro de la ficha. En el móvil se ofrece abrirlo o descargarlo.
Cada certificación tiene enlace directo: `.../#certificado-microbiologia-leche`.

## Cambiar textos

Todo el texto está en `index.html`, ordenado por secciones con comentarios (`Presentación`, `Sobre mí`, `Formación`…).
## Actualizar el CV

El PDF (`documents/cv-laura-coello-cabada.pdf`) sale de `cv/cv.html`. Si cambian los datos:

1. Edita el texto en `cv/cv.html`.
2. Ábrelo en Chrome o Edge, pulsa **Ctrl+P** y elige: destino **Guardar como PDF**, márgenes **Ninguno**, **Gráficos de fondo** activado.
3. Guárdalo como `documents/cv-laura-coello-cabada.pdf`, sustituyendo el anterior.

## Pendiente

- Documento original de las dos certificaciones.
- Para cambiar la foto, sustituye `images/laura-coello-cabada.jpg` y `.webp` (proporción 2:3, vertical) y vuelve a generar el CV.
