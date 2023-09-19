Области хранения данных:
-база данных на json-server
-BFF
-Redux store

Сущности приложения:
-Пользователь: БД (Список пользователей), BFF(сессия текущего пользователя), store (отоброжение в браузере)
-Роль пользователя: БД (Список ролей) BFF (сессия пользователя с ролью), store (использование на клиенте)
-статья: БД (Список статей) store (отоброжение в браузере)
-комментарий: БД (Список комментариев), store (отоброжение в браузере)

Таблицы БД:
-пользователи - users: id / login / password / registered_at /role_id
-роли - roles: id / name
-статьи - posts: title / image_url / content / published_at
-комментарии - comments: id / author_id / post_id / content

Схема состояния на BFF:

-сессия текущего пользователя: login / password / role

Схема для Redux-store (на клиенте)
-user: id / login / roleId / session
-posts: массив posts: id / title / imageUrl / publishedAt / commentsCount
-post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
-users: массив user: id / login / registeredAt / role
