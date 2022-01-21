# Family budget

## How to run this?
* `docker-compose up`
* the website should be available at `http://127.0.0.1/`

## Loading fixtures
`python3 manage.py loaddata fixtures/*.json`

## Things Im aware of
* i could use uuids instead of ids to reference stuff
* folder structure is weird
* passwords are plaintext
* components could've been split more, but I kept them as it is for convenience
* loading screens
* missing sharing budgets
* mess in types

## Todo
- [x] docker-compose
- [x] models
- [x] business logic
- [x] authorization
- [ ] tests
- [x] fixtures
- [ ] filtering
- [ ] pagination
- [x] UI