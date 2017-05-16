# Gibrex

## Preparation
- Make sure `redis` is installed
- MySQL, PostgreSQL should be installed too

## Howto

1. Clone the repo
``` bash
 $ git clone git@gitlab.tracto.org:syahrun/agibrex.git
```

2. Install the npm dependencies
``` bash
 $ cd agibrex
 $ npm install
 $ cp .env.example .env
```

3. Run Redis, MySQL/PostgreSQL if you haven't

4. Init the database
``` bash
 $ ./ace migration:run
```

5. Serve the pages, and continue developing
``` bash
 $ npm run serve:dev
```
