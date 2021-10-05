// Emojis are licensed MIT | https://opensource.org/licenses/MIT
import emojis from './emojis.json';

export const randomEmoji = () => {
    return emojis?.[Math.floor(Math.random() * emojis?.length)];
};
