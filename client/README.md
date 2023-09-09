### IMPORTANT NOTICE
Toate comenzile din acest readme sunt folosite in terminalul "bash". Pentru a folosi alt CMD caută echivalentul pe internet.
# Starting points
### Install Docker
Prima data trebuie sa fie docker pe OS vostru (în cazul windows de exemplu: Docker Engine) - https://www.docker.com/
### Copy/Clone Git
după ce se copiaza git-ul puteti instala imaginea de docker folosind comenzile:
```bash
docker build -t < nume_imagine > .
```
Example:
```bash
docker build -t react_tasks .
```
~~### If you don't want to clone~~
REMOVED AFTER UNIFY WITH BACKEND

# Pentru a rula acum docker
### Useful info:
Ne vom folosi de un alt bash pentru a prelua id-ul ultimei imagini create ( in cazul in care ultima imagine e cea a acestui proiect )
```bash
$(docker images --format='{{.ID}}' | head -1)
```
### The command:
```bash
docker run -d -it --rm -p < port_dorit >:8080 --name < nume_container > $(docker images --format='{{.ID}}' | head -1) 
```

Example:
```bash
docker run -d -it --rm -p 3001:8080 --name react_tasks_container $(docker images --format='{{.ID}}' | head -1)
```

în cazul exemplului URL va fi : http://localhost:3001/

*cand veti opri containerul acesta se va sterge automat pentru a nu crea conflicte ulterior, datorita tagului "--rm"

## Error cases:
Daca aveti eroare deoarece ati rulat deja acea imagine utilizati urmatoarea comanda pentru a inchide orice container aveti pornit:
```bash
docker kill $(docker ps -q)
```

