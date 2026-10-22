/*
 * Portfolio · Laura Coello Cabada
 * Menú, sección activa, apariciones suaves, certificaciones y copia del correo.
 */
;(function () {
  'use strict'

  const PENDIENTE = '<span class="pending">Pendiente de confirmar</span>'

  function esc(text) {
    return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  function icon(name, size) {
    return `<svg class="icon" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${name}" /></svg>`
  }

  /* ───────────── Cabecera y menú móvil ───────────── */

  const header = document.querySelector('.site-header')
  const toggle = document.getElementById('menu-toggle')
  const menu = document.getElementById('mobile-menu')
  const toggleLabel = toggle.querySelector('.visually-hidden')

  function setMenu(open) {
    menu.hidden = !open
    toggle.setAttribute('aria-expanded', String(open))
    toggleLabel.textContent = open ? 'Cerrar menú' : 'Abrir menú'
    updateHeader()
  }

  function updateHeader() {
    header.classList.toggle('is-raised', window.scrollY > 8 || !menu.hidden)
  }

  toggle.addEventListener('click', () => setMenu(menu.hidden))
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false)
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setMenu(false)
      toggle.focus()
    }
  })
  window.matchMedia('(min-width: 1080px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false)
  })
  window.addEventListener('scroll', updateHeader, { passive: true })
  updateHeader()

  /* ───────────── Sección activa en la navegación ───────────── */

  const sectionIds = ['inicio', 'sobre-mi', 'formacion', 'experiencia', 'certificaciones', 'competencias', 'contacto']
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-menu ol a')

  if ('IntersectionObserver' in window) {
    const visible = new Map()
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        const active = sectionIds.find((id) => visible.get(id))
        if (!active) return
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'true')
          else a.removeAttribute('aria-current')
        })
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) spy.observe(el)
    })
  }

  /* ───────────── Aparición suave al desplazarse ───────────── */

  const revealObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible')
                revealObserver.unobserve(entry.target)
              }
            })
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
        )
      : null

  function observeReveal(root) {
    root.querySelectorAll('[data-reveal]').forEach((el) => {
      if (revealObserver) revealObserver.observe(el)
      else el.classList.add('is-visible')
    })
  }

  /* ───────────── Certificaciones ───────────── */

  const grid = document.getElementById('cert-grid')
  const dialog = document.getElementById('cert-dialog')
  const HASH = '#certificado-'
  const certs = typeof CERTIFICADOS !== 'undefined' ? CERTIFICADOS : []
  let lastTrigger = null

  function docStatus(doc) {
    return doc
      ? `<span class="doc-status doc-status--ready"><span class="doc-status-dot" aria-hidden="true"></span>Documento disponible · ${doc.tipo === 'pdf' ? 'PDF' : 'Imagen'}</span>`
      : '<span class="doc-status doc-status--pending"><span class="doc-status-dot" aria-hidden="true"></span>Documento disponible próximamente</span>'
  }

  function renderCards() {
    grid.innerHTML = certs
      .map((c, i) => {
        const extra = c.competencias.length - 3
        return `
        <li data-reveal>
          <article class="cert-card" aria-labelledby="cert-title-${esc(c.id)}">
            <div class="cert-top">
              <span class="cert-code">CERT · ${String(i + 1).padStart(2, '0')}</span>
              <span class="cert-area">${esc(c.area)}</span>
            </div>
            <h3 id="cert-title-${esc(c.id)}" class="cert-title">${esc(c.titulo)}</h3>
            ${c.subtitulo ? `<p class="cert-subtitle">${esc(c.subtitulo)}</p>` : ''}
            <p class="cert-summary">${esc(c.resumen)}</p>
            <ul class="tag-list tag-list--sm" aria-label="Competencias principales">
              ${c.competencias.slice(0, 3).map((s) => `<li class="tag">${esc(s)}</li>`).join('')}
              ${extra > 0 ? `<li class="tag tag--more">+${extra}</li>` : ''}
            </ul>
            <dl class="cert-facts">
              <div><dt>Entidad</dt><dd>${c.entidad ? esc(c.entidad) : '<span class="pending">Pendiente</span>'}</dd></div>
              <div><dt>Fecha</dt><dd>${c.fecha ? esc(c.fecha) : '<span class="pending">Pendiente</span>'}</dd></div>
              ${c.duracion ? `<div><dt>Duración</dt><dd>${esc(c.duracion)}</dd></div>` : ''}
            </dl>
            <div class="cert-foot">
              ${docStatus(c.documento)}
              <button id="cert-open-${esc(c.id)}" type="button" class="cert-open" aria-haspopup="dialog" data-cert="${esc(c.id)}">
                Ver detalle<span class="visually-hidden"> de ${esc(c.titulo)}</span>
                ${icon('arrow-up-right', 18)}
              </button>
            </div>
          </article>
        </li>`
      })
      .join('')
    observeReveal(grid)
  }

  function renderDialog(c) {
    dialog.innerHTML = `
      <div class="cert-dialog-panel">
        <header class="cert-dialog-head">
          <div>
            <p class="eyebrow">${esc(c.area)}</p>
            <h2 id="cert-dialog-title" class="cert-dialog-title">${esc(c.titulo)}</h2>
            ${c.subtitulo ? `<p class="cert-subtitle">${esc(c.subtitulo)}</p>` : ''}
          </div>
          <button type="button" class="icon-btn" data-close autofocus>
            ${icon('x', 22)}<span class="visually-hidden">Cerrar</span>
          </button>
        </header>
        <div class="cert-dialog-body">
          <dl class="cert-dialog-facts">
            <div><dt>Entidad</dt><dd>${c.entidad ? esc(c.entidad) + (c.fuenteEntidad ? `<span class="fact-source">${esc(c.fuenteEntidad)}</span>` : '') : PENDIENTE}</dd></div>
            <div><dt>Fecha</dt><dd>${c.fecha ? esc(c.fecha) : PENDIENTE}</dd></div>
            <div><dt>Duración</dt><dd>${c.duracion ? esc(c.duracion) : PENDIENTE}</dd></div>
            <div><dt>Documento</dt><dd>${docStatus(c.documento)}</dd></div>
          </dl>
          <div class="cert-dialog-text">
            <h3 class="eyebrow">Descripción</h3>
            <p>${esc(c.descripcion)}</p>
            ${
              c.contenidos && c.contenidos.length
                ? `<h3 class="eyebrow">Contenidos</h3><ul class="plain-list">${c.contenidos.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
                : ''
            }
            <h3 class="eyebrow">Competencias relacionadas</h3>
            <ul class="check-list">${c.competencias.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>
          <div class="cert-dialog-doc">
            <h3 class="eyebrow">Documento original</h3>
            <div class="doc-slot"></div>
          </div>
        </div>
      </div>`
    renderDocument(dialog.querySelector('.doc-slot'), c)
  }

  /* Visor del documento: pendiente, cargando, error o disponible */
  function renderDocument(slot, c) {
    const doc = c.documento
    if (!doc) {
      slot.innerHTML = `
        <div class="doc-box doc-box--pending">
          ${icon('file-clock', 28)}
          <div>
            <p class="doc-box-title">Documento disponible próximamente</p>
            <p class="doc-box-text">El certificado original se podrá consultar y descargar aquí en cuanto esté disponible.</p>
          </div>
        </div>`
      return
    }

    const fileName = doc.nombreDescarga || doc.archivo.split('/').pop()
    const actions = `
      <div class="doc-actions">
        <a class="btn btn-ghost btn-sm" href="${esc(doc.archivo)}" target="_blank" rel="noopener">${icon('external', 16)}Abrir en pestaña nueva</a>
        <a class="btn btn-primary btn-sm" href="${esc(doc.archivo)}" download="${esc(fileName)}">${icon('download', 16)}Descargar</a>
      </div>`

    slot.innerHTML = `<div class="doc-box" role="status">${icon('loader', 24).replace('class="icon"', 'class="icon spin"')}<p class="doc-box-text">Cargando documento…</p></div>`

    // Al abrir la web desde el disco (file://) no se puede comprobar el archivo: se muestra directamente
    const check =
      location.protocol === 'file:'
        ? Promise.resolve(true)
        : fetch(doc.archivo, { method: 'HEAD' })
            .then((r) => r.ok && !(r.headers.get('content-type') || '').includes('text/html'))
            .catch(() => false)

    check.then((ok) => {
      if (!dialog.open || dialog.dataset.cert !== c.id) return
      if (!ok) {
        slot.innerHTML = `
          <div class="doc-box doc-box--error" role="alert">
            ${icon('alert', 26)}
            <div>
              <p class="doc-box-title">No se ha podido cargar el documento</p>
              <p class="doc-box-text">Puedes intentar abrirlo directamente.</p>
              <a class="text-link" href="${esc(doc.archivo)}" target="_blank" rel="noopener">Abrir el archivo</a>
            </div>
          </div>`
        return
      }

      if (doc.tipo === 'imagen') {
        slot.innerHTML = `
          <div class="doc-view">
            <a class="doc-image" href="${esc(doc.archivo)}" target="_blank" rel="noopener">
              <img src="${esc(doc.archivo)}" alt="Certificado original: ${esc(c.titulo)}" />
            </a>
            ${actions}
          </div>`
        return
      }

      // Los visores de PDF integrados no son fiables en móviles: allí se ofrece abrir o descargar
      const canEmbed = window.matchMedia('(min-width: 900px) and (pointer: fine)').matches
      slot.innerHTML = `
        <div class="doc-view">
          ${
            canEmbed
              ? `<div class="doc-frame">
                   <div class="doc-frame-loading" role="status">${icon('loader', 24).replace('class="icon"', 'class="icon spin"')}Cargando vista previa…</div>
                   <iframe src="${esc(doc.archivo)}#view=FitH" title="Certificado original: ${esc(c.titulo)}"></iframe>
                 </div>`
              : `<div class="doc-box">${icon('file', 28)}<div><p class="doc-box-title">${esc(fileName)}</p><p class="doc-box-text">Documento PDF. Ábrelo o descárgalo para consultarlo.</p></div></div>`
          }
          ${actions}
        </div>`
      const frame = slot.querySelector('iframe')
      if (frame) frame.addEventListener('load', () => slot.querySelector('.doc-frame-loading')?.remove())
    })
  }

  function openCert(c, trigger) {
    lastTrigger = trigger || document.getElementById('cert-open-' + c.id)
    dialog.dataset.cert = c.id
    renderDialog(c)
    if (!dialog.open) dialog.showModal()
    history.replaceState(null, '', HASH + c.id)
  }

  function closeCert() {
    if (dialog.open) dialog.close()
  }

  // Al cerrar (botón, Escape o clic fuera) se restaura la URL y el foco
  dialog.addEventListener('close', () => {
    delete dialog.dataset.cert
    history.replaceState(null, '', '#certificaciones')
    if (lastTrigger) lastTrigger.focus()
  })
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target.closest('[data-close]')) closeCert()
  })

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cert]')
    if (!btn) return
    const c = certs.find((x) => x.id === btn.dataset.cert)
    if (c) openCert(c, btn)
  })

  // Enlace directo a una certificación: index.html#certificado-microbiologia-leche
  function openFromHash() {
    if (!location.hash.startsWith(HASH)) return
    const c = certs.find((x) => x.id === decodeURIComponent(location.hash.slice(HASH.length)))
    if (!c) return
    document.getElementById('certificaciones').scrollIntoView()
    openCert(c)
  }
  window.addEventListener('hashchange', openFromHash)

  /* ───────────── Copiar correo ───────────── */

  const copyBtn = document.getElementById('copy-email')
  const copyFeedback = document.querySelector('.copy-feedback')
  copyBtn.addEventListener('click', () => {
    if (!navigator.clipboard) return
    navigator.clipboard
      .writeText(copyBtn.dataset.email)
      .then(() => {
        copyBtn.classList.add('is-copied')
        copyFeedback.textContent = 'Dirección copiada'
        setTimeout(() => {
          copyBtn.classList.remove('is-copied')
          copyFeedback.textContent = ''
        }, 2400)
      })
      .catch(() => {
        /* Sin acceso al portapapeles: la dirección sigue visible y seleccionable */
      })
  })

  /* ───────────── Inicio ───────────── */

  document.documentElement.classList.add('has-reveal')
  renderCards()
  observeReveal(document)
  openFromHash()
})()
