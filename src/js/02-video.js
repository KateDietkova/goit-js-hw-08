import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

let currentTime;
const iframe = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframe);


player.on('timeupdate', throttle(savedTimeUpdate, 1000));

const getCurrentItem = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(getCurrentItem);

function savedTimeUpdate(data) {
  currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}
