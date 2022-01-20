# Family budget

## How to run this?
* `docker-compose up`
* the website should be available at `http://127.0.0.1/`

## Loading fixtures
`python3 manage.py loaddata fixtures/categories.json`

## Things Im aware of
* i could use uuids instead of ids to reference stuff
* folder structure is weird

## Todo
- [x] docker-compose
- [x] models
- [ ] business logic
- [ ] authorization
- [ ] tests
- [ ] fixtures
- [ ] filtering
- [ ] pagination
- [ ] UI