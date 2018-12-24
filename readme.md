# Snake

Play Snake [here](https://holdenlee.github.io/purescript-games/html/SnakeS.html).

Writeup [here](http://holdenlee.github.io/blog/posts/programming/purescript/snake-in-purescript.html).

Notes: 

* Code has been updated to compile with purescript version 0.12.1 (pulp 12.3.0). 
* Updated to use `psc-package` rather than `bower`. On windows, use Powershell rather than Cygwin.
* Writeup is out of date.
* After building, run `pulp --psc-package browserify -O --main SnakeS >> dist/SnakeS.js`.
* For some reason there were weird characters in the output file which I had to manually remove. (Check for syntax errors in the javascript.)

