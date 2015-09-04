# Dialoga App

Convenções:

- Os *programas* são **topics**;
- Os *temas* são **categories**;
- Um *grupo de programas* é um **discussion** (um grupo de topics);
- As *propostas* são **proposals**;


Para iniciar o desenvolvimento:

```bash
# dev with no proxy (local data)
gulp serve && json-server data.js -p 9000 -w data.js

# dev with proxy to hom server
gulp serve --target="http://hom.login.dialoga.gov.br"

# dev with proxy to production server
gulp serve --target="http://login.dialoga.gov.br"
```

##### Referências

- [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)
- Angular
  - angular-animate
  - angular-cookies
  - angular-touch
  - angular-sanitize
  - angular-ui-router
  - restangular
- gulp (default task: serve)
- JS old style (no CoffeeScript or ES6 or ...)
- HTML pure (no JADE or HBS or ...)
- Bootstrap CSS only (without JS files)
