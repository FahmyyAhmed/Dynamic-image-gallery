// DOM Elements
const heroCarousel = document.getElementById('hero-carousel');
const galleryContainer = document.getElementById('gallery-container');
const addImageBtn = document.getElementById('add-image-btn');
const imageModal = document.getElementById('image-modal');
const closeModal = document.querySelector('.close');
const cancelBtn = document.getElementById('cancel-btn');
const imageForm = document.getElementById('image-form');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// API Config
const API_BASE_URL = 'http://localhost:3000/images';
const IMAGES_ENDPOINT = `${API_BASE_URL}/images`;

// State
let images = [], isEditing = false, currentImageId = null, currentCategory = 'all', currentSearch = '';

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
addImageBtn.addEventListener('click', () => openImageModal());
closeModal.addEventListener('click', closeImageModal);
cancelBtn.addEventListener('click', closeImageModal);
imageForm.addEventListener('submit', handleImageSubmit);
searchInput.addEventListener('input', (e) => { currentSearch = e.target.value; renderGallery(); });
filterBtns.forEach(btn => btn.addEventListener('click', (e) => {
  filterBtns.forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentCategory = e.target.dataset.category;
  renderGallery();
}));
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});
window.addEventListener('click', (e) => e.target === imageModal && closeImageModal());

// API Functions
async function fetchImages() {
  try {
    const res = await fetch(IMAGES_ENDPOINT);
    return res.ok ? await res.json() : (showAlert('Failed to load images. Using sample data.', 'error'), sampleImages);
  } catch (err) { console.error('Error:', err); return sampleImages; }
}

async function postImage(data) {
  const res = await fetch(IMAGES_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to add image');
  return await res.json();
}

async function patchImage(id, data) {
  const res = await fetch(`${IMAGES_ENDPOINT}/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to update image');
  return await res.json();
}

async function deleteImageFromServer(id) {
  const res = await fetch(`${IMAGES_ENDPOINT}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete image');
  return true;
}

// App Functions
async function initializeApp() {
  images = await fetchImages();
  renderHeroCarousel();
  renderGallery();
}

function renderHeroCarousel() {
  heroCarousel.innerHTML = images.slice(0, 5).map(img => `<img src="${img.imageUrl}" alt="${img.title}" loading="lazy">`).join('');
}

function renderGallery() {
  const filtered = images.filter(img => 
    (currentCategory === 'all' || img.category === currentCategory) &&
    (img.title.toLowerCase().includes(currentSearch) || img.description.toLowerCase().includes(currentSearch))
  );
  
  galleryContainer.innerHTML = filtered.length ? filtered.map(img => `
    <div class="image-card">
      <img src="${img.imageUrl}" alt="${img.title}" loading="lazy">
      <div class="image-info">
        <span class="image-category ${img.category}">${img.category.charAt(0).toUpperCase() + img.category.slice(1)}</span>
        <h3>${img.title}</h3>
        <p>${img.description}</p>
        <p class="image-meta">By ${img.photographer}</p>
        <div class="image-actions">
          <button class="btn secondary edit-btn" data-id="${img.id}">Edit</button>
          <button class="btn danger delete-btn" data-id="${img.id}">Delete</button>
        </div>
      </div>
    </div>
  `).join('') : '<p class="no-images">No images found.</p>';
  
  document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', (e) => openEditImageModal(e.target.dataset.id)));
  document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => confirm('Delete this image?') && deleteImage(e.target.dataset.id)));
}

function openImageModal(editId = null) {
  isEditing = !!editId;
  currentImageId = editId;
  document.getElementById('modal-title').textContent = isEditing ? 'Edit Image' : 'Add New Image';
  
  if (isEditing) {
    const img = images.find(i => i.id == editId);
    if (img) ['category', 'title', 'image-url', 'description', 'photographer'].forEach(field => 
      document.getElementById(field).value = img[field.replace('-', '')]);
  } else imageForm.reset();
  
  imageModal.style.display = 'block';
}

function closeImageModal() { imageModal.style.display = 'none'; }

async function handleImageSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const imageData = Object.fromEntries(formData.entries());
  
  try {
    if (isEditing) {
      const updated = await patchImage(currentImageId, imageData);
      images[images.findIndex(img => img.id == currentImageId)] = updated;
    } else {
      const newImage = await postImage({ ...imageData, id: Date.now() });
      images.unshift(newImage);
    }
    renderHeroCarousel();
    renderGallery();
    closeImageModal();
    showAlert(`Image ${isEditing ? 'updated' : 'added'} successfully!`, 'success');
  } catch (err) { showAlert(`Failed to ${isEditing ? 'update' : 'add'} image.`, 'error'); }
}

async function deleteImage(id) {
  try {
    if (await deleteImageFromServer(id)) {
      images = images.filter(img => img.id != id);
      renderHeroCarousel();
      renderGallery();
      showAlert('Image deleted!', 'success');
    }
  } catch (err) { showAlert('Failed to delete image.', 'error'); }
}

function showAlert(msg, type) {
  const alert = document.createElement('div');
  alert.className = `alert ${type}`;
  alert.textContent = msg;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

// Sample Data
const sampleImages = [
  { id: 1, title: 'Mountain Sunrise', category: 'nature', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', description: 'Beautiful sunrise over mountain peaks', photographer: 'John Doe' },
  { id: 2, title: 'City Skyline', category: 'urban', imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', description: 'Night view of downtown cityscape', photographer: 'Jane Smith' },
  { id: 3, title: 'Portrait Session', category: 'people', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', description: 'Professional portrait photography', photographer: 'Alex Johnson' },
  { id: 4, title: 'Abstract Painting', category: 'art', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5', description: 'Colorful abstract art exhibition', photographer: 'Maria Garcia' }
];

// Add alert styles
const style = document.createElement('style');
style.textContent = `
  .alert { position: fixed; top: 20px; right: 20px; padding: 1rem 2rem; border-radius: 5px; color: white; font-weight: 500; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1000; animation: slideIn 0.3s ease-out; }
  .alert.success { background-color: var(--success-color); }
  .alert.error { background-color: var(--danger-color); }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  .no-images { text-align: center; grid-column: 1 / -1; padding: 2rem; color: #666; }
`;
document.head.appendChild(style);