import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframe);


player.on('timeupdate', throttle(savedTimeUpdate, 1000));

const getCurrentItem = localStorage.getItem(STORAGE_KEY);
player.setCurrentTime(getCurrentItem);

function savedTimeUpdate(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}
