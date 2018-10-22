## magnetico and fzf

Find torrents fast with fzf or other fuzzy finder

Requires [magnetico](https://github.com/boramalper/magnetico) and a finder program such as [fzf](https://github.com/junegunn/fzf), [fzy](https://github.com/jhawthorn/fzy) or [dmenu](https://tools.suckless.org/dmenu/)

Assumes your database is located at `./database.sqlite3`. TODO: Take this path as an optional command line argument.

### Usage:
`./findtorrent.sh`
Start typing a search term.  Hit enter when satisfied.  Magnet link is copied to clipboard.
TODO: Open a specified torrent client.

