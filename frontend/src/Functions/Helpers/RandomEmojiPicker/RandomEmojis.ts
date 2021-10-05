// Emojis are licensed MIT | https://opensource.org/licenses/MIT
import emojis from './emojis.json';
import twemoji from 'twemoji';

export const randomEmoji = () => {
    return twemoji.parse(emojis?.[Math.floor(Math.random() * emojis?.length)]);
};
