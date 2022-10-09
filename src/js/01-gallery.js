import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

const imgMarkup = createGalleryMarkup(galleryItems);
galleryContainer.innerHTML = imgMarkup;

galleryContainer.addEventListener('click', onImgOpen);

const lightBox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

function onImgOpen(event) {
  event.preventDefault();
}

function createGalleryMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" title="${description}"/>
            </a>
            `;
    })
    .join('');
}
