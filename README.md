# docker-react
Acest repo foloseste tehnologii precum ExpressJS, React and Docker.

## React side
Aceasta se afla in folderul de Client. Reprezinta frontend acestui proiect

## ExpressJS side
Aceasta se afla in folderul de Server. Reprezinta backend acestui proiect si comunicarea cu MongoDB.

# How to run?
### Singular
daca doresti sa rulezi doar client side foloseste
```bash
npm run client
```
daca doresti sa rulezi doar server side foloseste
```bash
npm run server
```
### Concomitent
Daca doresti sa rulezi atat client side cat si server side foloseste
```bash
npm run dev
```
# Docker implementation
## Download this repository
După ce descarci/clonezi acest repo tot ce trebuie sa faci in folderul principal este sa rulezi următoarea comanda:
```bash
docker-compose up --build
```
Aceasta comanda va rula informațiile din docker-compose.yml si va genera cele 2 imagini + containere aferente.
Aplicația poate fi deschisa la adresa:
http://localhost:3000/
