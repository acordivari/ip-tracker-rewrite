import './style.css';

// There is no browser API that returns your *public* IP address, so we make a
// single request to a geolocation service that echoes back the IP it sees,
// along with the metadata attached to it. ipwho.is is free, keyless, served
// over HTTPS, and CORS-enabled. If the geo lookup fails we fall back to ipify,
// which returns the IP only.
const GEO_URL = 'https://ipwho.is/';
const IP_FALLBACK_URL = 'https://api.ipify.org?format=json';

const card = document.querySelector('#card');

async function lookup() {
  try {
    const res = await fetch(GEO_URL);
    const data = await res.json();

    // ipwho.is always returns HTTP 200 and signals failures via `success`.
    if (!data.success) {
      throw new Error(data.message || 'Geolocation lookup failed');
    }
    renderCard(data);
  } catch (err) {
    console.error('Geolocation lookup failed:', err);
    await renderFallback();
  }
}

async function renderFallback() {
  try {
    const res = await fetch(IP_FALLBACK_URL);
    const { ip } = await res.json();
    renderCard({ ip });
  } catch (err) {
    console.error('IP fallback failed:', err);
    card.innerHTML = `
      <p class="status error">
        Couldn't reach the IP lookup service. Check your connection
        (or an ad/tracker blocker) and try again.
      </p>`;
  }
}

function renderCard(data) {
  const facts = [
    ['City', data.city],
    ['Region', data.region],
    ['Postal code', data.postal],
    ['Country', data.country && `${data.country}${data.flag?.emoji ? ' ' + data.flag.emoji : ''}`],
    ['ISP', data.connection?.isp],
  ].filter(([, value]) => Boolean(value));

  const coords =
    data.latitude != null && data.longitude != null
      ? `${data.latitude}, ${data.longitude}`
      : null;

  card.innerHTML = `
    <h2 class="ip">${escapeHtml(data.ip ?? 'Unknown')}</h2>
    ${coords ? `<p class="coords">${escapeHtml(coords)} (lat, long)</p>` : ''}
    <dl class="facts">
      ${facts
        .map(
          ([label, value]) => `
        <div class="fact">
          <dt>${label}</dt>
          <dd>${escapeHtml(String(value))}</dd>
        </div>`
        )
        .join('')}
    </dl>`;
}

// User-controlled data goes into innerHTML, so escape it.
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Modal wiring using the native <dialog> element.
const modal = document.querySelector('#info-modal');
document
  .querySelector('#learn-more')
  .addEventListener('click', () => modal.showModal());
document
  .querySelector('#modal-close')
  .addEventListener('click', () => modal.close());

lookup();
