/* ─── PFN PRINTS — main.js ──────────────────────────────── */

// Product categories and their display names
const PRODUCTS = [
  { id: 'tshirts',   label: 'T-Shirts',           emoji: '👕' },
  { id: 'hoodies',   label: 'Hoodies & Sweatshirts', emoji: '🧥' },
  { id: 'mugs',      label: 'Mugs & Tumblers',    emoji: '☕' },
  { id: 'caps',      label: 'Caps',               emoji: '🧢' },
  { id: 'tote-bags', label: 'Tote Bags',          emoji: '👜' },
  { id: 'keychains', label: 'Keychains',          emoji: '🔑' },
];

const WHATSAPP_URL = 'https://wa.me/2348067765321';

/* ── Modal helpers ───────────────────────────────────────── */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

// Close modal when clicking the backdrop
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

/* ── Category card clicks → route appropriately ─────────── */
// Gift boxes → always signature (PFN only offers signature for gift boxes)
// Custom Design card → always custom (no need to ask)
// Everything else → show the signature/custom choice modal
function initCategoryCards() {
  document.querySelectorAll('.cat-card[data-category]').forEach(card => {
    card.addEventListener('click', () => {
      const categoryId   = card.dataset.category;
      const categoryName = card.dataset.name;

      if (categoryId === 'gift-boxes') {
        window.location.href = `pages/signature.html?category=gift-boxes`;
        return;
      }

      if (categoryId === 'custom') {
        window.location.href = `pages/custom.html`;
        return;
      }

      openChoiceModal(categoryId, categoryName);
    });
  });
}

function openChoiceModal(categoryId, categoryName) {
  const modal = document.getElementById('choice-modal');
  if (!modal) return;

  const subtitle = modal.querySelector('.modal-sub');
  if (subtitle) subtitle.textContent = `How would you like to proceed with ${categoryName}?`;

  const sigLink = modal.querySelector('[data-modal-action="signature"]');
  if (sigLink) sigLink.href = `pages/signature.html?category=${categoryId}`;

  const customLink = modal.querySelector('[data-modal-action="custom"]');
  if (customLink) customLink.href = `pages/custom.html?category=${categoryId}`;

  openModal('choice-modal');
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCategoryCards();
});