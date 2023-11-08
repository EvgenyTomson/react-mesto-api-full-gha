# Проект Mesto фронтенд + бэкенд
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

## Нипользованные технологии:   


Backend: Node.js (express), MongoDB (mongoose), JWT (jsonwebtoken), CORS.  

Frontend: React, React Router v.6, React Context.


## Запуск проекта  


Для запуска проекта на локальной машине вам потребуется установленные Node.js, npm и MongoDB  

локальный сервер должен MongoDB быть запущен на порту 27017 (или внесите изменения в конфигурацию backend\config.js).  

Клонировать проект:  

```bash
git clone https://github.com/EvgenyTomson/react-mesto-api-full-gha.git  
```

Backend:  


Установить зависимости:  

```bash  
cd backend
npm install  
```

Запустить проект:  

`npm run start` — запускает сервер  

`npm run dev` — запускает сервер с hot-reload  


Frontend:  


Установить зависимости:  

```bash  
cd frontend
npm install  
```

Запустить проект:  

`npm run start` — запускает проект на порту 3001  

