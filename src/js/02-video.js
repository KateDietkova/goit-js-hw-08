import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframe);


player.on('timeupdate', throttle(savedTimeUpdate, 1000));
getSavedTime();

function savedTimeUpdate(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

function getSavedTime() {
  const getCurrentItem = localStorage.getItem(STORAGE_KEY);

  if (getCurrentItem) {
    player.setCurrentTime(getCurrentItem);
  }
}
