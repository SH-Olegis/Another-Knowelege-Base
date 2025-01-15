## Подготовка проекта

```bash
$ npm install
$ npm run database:start
```

## Запуск проекта

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Эндпоинты
### Base URL: /article
#### 1.	POST /article
Описание: Создание статьи.
Авторизация: Да (JWT в Cookie).
Тело: { "title": string, "content": string, "isPublic": boolean, "tags": number[] }
Ответ: Созданная статья.

#### 2.	GET /article
Описание: Получение списка статей (с фильтром по тегам).
Авторизация: Нет (публичные статьи), Да (все статьи).
Параметры: ?filter.tags=1&filter.tags=2
Ответ: Список статей.
#### 3.	GET /article/:id
Описание: Получение одной статьи.
Авторизация: Нет (публичная статья), Да (все статьи).
Ответ: Статья.
#### 4.	PUT /article/:id
Описание: Обновление статьи.
Авторизация: Да (JWT в Cookie).
Тело: { "title": string, "content": string, "isPublic": boolean, "tags": number[] }
Ответ: Обновленная статья.
#### 5.	DELETE /article/:id
Описание: Удаление статьи.
Авторизация: Да (JWT в Cookie).
Ответ: Успешное удаление.

### Base URL: /auth
#### 1.	POST /auth/login
Описание: Авторизация пользователя.
Тело: { "email": string, "password": string }
Ответ: Cookie с JWT.
#### 2.	POST /auth/register
Описание: Регистрация пользователя.
Тело: { "email": string, "password": string }
Ответ: Сообщение о создании пользователя.