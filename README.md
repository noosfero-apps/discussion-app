# Dialoga App

Start development:

```bash
# dev with no proxy (local data)
gulp serve
json-server data.js -p 9000 -w data.js

# dev with proxy to hom server
gulp serve --target="http://hom.login.dialoga.gov.br"

# dev with proxy to production server
gulp serve --target="http://login.dialoga.gov.br"
```

# Project Decisions

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
