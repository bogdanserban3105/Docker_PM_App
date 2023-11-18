# Task Manager App

## Technologies Used
- **React:** JavaScript library for building attractive and interactive user interfaces.
- **Node.js:** JavaScript runtime environment for building the backend server.
- **MongoDB:** NoSQL database for efficient storage of task and user-related data.
- **Docker Engine:** Virtualization platform for packaging and delivering the application as portable containers.

## Key Features
1. **Display Tasks:** Load and display the current list of tasks.
2. **Add Task:** Users can add a new task with relevant details.
3. **Update Status:** Change the status of tasks as they are completed.
4. **Delete Task:** Remove outdated or completed tasks.
5. **Email Submission:** Option to send task details via email.
6. **Download to Email:** Save and send the task list via email.

## Getting Started
To run the project locally, follow these steps:

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Docker installed
![image](https://github.com/bogdanserban3105/Docker_PM_App/assets/114236989/9d3f5c3f-649e-442e-be48-0b7da79f36dc)

### Installation
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
