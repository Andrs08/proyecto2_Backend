# proyecto2_Backend
 Backend para la plataforma de una biblioteca
 Usuarios – Endpoints y Documentación

Todas las rutas de usuarios están bajo el prefijo:

/biblioteca/users

Autenticación

Los endpoints protegidos requieren enviar un token JWT en el encabezado:

Authorization: Bearer <token>


El token se obtiene en el endpoint /login.

1. Crear Usuario

POST /biblioteca/users/

Body (JSON)
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "document_number": "10203040",
  "password": "123456"
}

Respuesta (201)
{
  "message": "Usuario creado correctamente",
  "persona_creada": {
    "id": "673abc123",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "document_number": "10203040",
    "permissions": []
  }
}

2. Iniciar Sesión

POST /biblioteca/users/login

Body
{
  "email": "juan@example.com",
  "password": "123456"
}

Respuesta (202)
{
  "message": "token generado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}

3. Obtener información del usuario autenticado

GET /biblioteca/users/me
Requiere autenticación.

Respuesta (200)
{
  "message": "Personas consultada",
  "persona": {
    "id": "673abc123",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "document_number": "10203040",
    "permissions": []
  }
}

4. Actualizar información del usuario autenticado

PUT /biblioteca/users/
Requiere autenticación.

Body
{
  "name": "Juan A. Pérez",
  "email": "nuevo@example.com",
  "password": "nueva123"
}

Respuesta (200)
{
  "message": "Usuario actualizado correctamente",
  "usuario_actualizado": {
    "id": "673abc123",
    "name": "Juan A. Pérez",
    "email": "nuevo@example.com",
    "document_number": "10203040",
    "permissions": []
  }
}

5. Eliminar usuario autenticado

DELETE /biblioteca/users/
Requiere autenticación.

Respuesta (204)
{
  "message": "Usuario eliminado correctamente",
  "usuario_eliminado": {
    "id": "673abc123",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "document_number": "10203040",
    "permissions": []
  }
}

6. Actualizar permisos de un usuario

PATCH /biblioteca/users/:id/permissions
Requiere autenticación.
Requiere el permiso: MANAGE_PERMISSIONS.

Body
{
  "permissions": ["manage_permissions", "manage_books"]
}

Respuesta (200)
{
  "message": "Permisos actualizados correctamente",
  "usuario": {
    "id": "673abc123",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "document_number": "10203040",
    "permissions": ["manage_permissions", "manage_books"]
  }
}

Reservas – Endpoints y Documentación

Todas las rutas de reservas están bajo el prefijo:

/biblioteca/reservations


Las rutas están protegidas y requieren autenticación mediante:

Authorization: Bearer <token>

1. Crear una reserva

POST /biblioteca/reservations/
Requiere autenticación.

El usuario autenticado será tomado automáticamente desde el token (req.authUser.id).

Body
{
  "book_id": "67aa91f1233c9a8b1d049f11",
  "return_date": "2025-02-28"
}

Respuesta (201)
{
  "message": "Reserva creada exitosamente",
  "reservacion": {
    "id": "67bb82f1c4f913733e176123",
    "userId": "67aa91f1233c9a8b1d049f10",
    "bookId": "67aa91f1233c9a8b1d049f11",
    "reserve_date": "2025-02-10T15:41:22.000Z",
    "return_date": "2025-02-28T00:00:00.000Z"
  }
}

2. Historial de reservas de un libro

GET /biblioteca/reservations/book_history/:book_id
Requiere autenticación.
Requiere permiso: VIEW_BOOK_HISTORY.

Ejemplo de request
GET /biblioteca/reservations/book_history/67aa91f1233c9a8b1d049f11
Authorization: Bearer <token>

Respuesta (200)
{
  "message": "Historia de reserva de libro retornada correctamente",
  "historia": [
    {
      "id": "67bb82f1c4f913733e176123",
      "userName": "Juan Pérez",
      "userEmail": "juan@example.com",
      "reserve_date": "2025-02-10T15:41:22.000Z",
      "return_date": "2025-02-28T00:00:00.000Z"
    }
  ]
}

3. Historial de reservas de un usuario (usuario autenticado)

GET /biblioteca/reservations/user_history
Requiere autenticación.
Requiere permiso: VIEW_USER_HISTORY.

El usuario se obtiene automáticamente del token.

Respuesta (200)
{
  "message": "Historia de reserva del usuario retornada correctamente",
  "historia": [
    {
      "id": "67bb82f1c4f913733e176123",
      "bookName": "Cien Años de Soledad",
      "bookAuthor": "Gabriel García Márquez",
      "reserve_date": "2025-02-10T15:41:22.000Z",
      "return_date": "2025-02-28T00:00:00.000Z"
    }
  ]
}

Libros – Endpoints y Documentación

Todas las rutas de libros están bajo el prefijo:

/biblioteca/books


Algunas rutas requieren autenticación y permisos específicos.

1. Crear un libro

POST /biblioteca/books/
Requiere autenticación.
Requiere permiso: CREATE_BOOK.

Body
{
  "name": "Cien Años de Soledad",
  "code": "B1001",
  "genre": "Novela",
  "publication_date": "1967",
  "publisher": "Sudamericana",
  "author": "Gabriel García Márquez"
}

Respuesta (201)
{
  "message": "Libro creado correctamente",
  "libro_creado": {
    "id": "67bb82f1c4f913733e176a22",
    "name": "Cien Años de Soledad",
    "code": "B1001",
    "genre": "Novela",
    "publication_date": "1967",
    "publisher": "Sudamericana",
    "author": "Gabriel García Márquez",
    "isAvaible": true
  }
}

2. Obtener información de un libro por código

GET /biblioteca/books/:code
No requiere autenticación.

Ejemplo
GET /biblioteca/books/B1001

Respuesta (200)
{
  "message": "Informacion del libro consultada exitosamente",
  "libro_consultado": {
    "id": "67bb82f1c4f913733e176a22",
    "name": "Cien Años de Soledad",
    "code": "B1001",
    "genre": "Novela",
    "publication_date": "1967",
    "publisher": "Sudamericana",
    "author": "Gabriel García Márquez",
    "isAvaible": true
  }
}

3. Eliminar un libro

DELETE /biblioteca/books/:code
Requiere autenticación.
Requiere permiso: DELETE_BOOK.

El borrado es lógico (isDeleted = true).

Respuesta (204)
{
  "message": "Libro eliminado correctamente"
}

4. Actualizar un libro

PUT /biblioteca/books/:id
Requiere autenticación.
Requiere permiso: UPDATE_BOOK.

Body (atributos opcionales)
{
  "name": "Nuevo nombre",
  "genre": "Fantasía",
  "publication_date": "2005",
  "publisher": "Planeta",
  "author": "Autor Actualizado",
  "isAvaible": false
}

Respuesta (200)
{
  "message": "Libro actualizado correctamente",
  "libro_actualizado": {
    "id": "67bb82f1c4f913733e176a22",
    "name": "Nuevo nombre",
    "code": "B1001",
    "genre": "Fantasía",
    "publication_date": "2005",
    "publisher": "Planeta",
    "author": "Autor Actualizado",
    "isAvaible": false
  }
}

5. Filtrar libros con paginación

GET /biblioteca/books/filter
No requiere autenticación.

Permite filtrar por:

name

genre

publication_date

publisher

author

isAvaible

Además, incluye paginación.

Ejemplo de request
GET /biblioteca/books/filter?genre=Novela&page=1

Respuesta (200)
{
  "message": "Libros que cumpeln con los filtros",
  "libros": {
    "books": [
      { "name": "Cien Años de Soledad" },
      { "name": "El Amor en los Tiempos del Cólera" }
    ],
    "pagination": {
      "page": 1,
      "maxPage": 3,
      "perPage": 2,
      "total": 6
    }
  }
}
