#!/bin/sh
node index.js | fzf | node create_magnet.js | xclip -i -selection clipboard
