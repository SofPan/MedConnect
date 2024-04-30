| HTTP Method | URL Pattern             | Use                                              |
|------------ | ------------------------|--------------------------------------------------|
| GET         | /                       | Landing Page                                     |
| GET         | /login                  | Login Page                                       |
| GET         | /login/:id              | User Login                                       |
| GET         | /register               | Registration Page                                |
| POST        | /register               | Submit Registration                              |
| GET         | /register/info          | Info collection page                             |
| POST        | /register/info          | Submit Info collect form                         |
| GET         | /profile/:id            | Display user profile                             |
| POST        | /profile/:id            | Edit user profile                                |
| GET         | /doctor/:id             | Display a doctor                                 |
| POST        | /doctor                 | Create new doctor                                |
| PUT         | /doctor/:id             | Edit existing doctor                             |
| DELETE      | /doctor/:id/delete      | Delete existing doctor                           |
| GET         | /appointments           | Display all appointments (clinic)                |
| GET         | /appointment/:id        | Display an appointment                           |
| POST        | /appointment            | Create a new appointment                         |
| PUT         | /appointment/:id        | Edit appointment (patient booking & cancelling)  |
| DELETE      | /appointment/:id/delete | Delete appointment (clinic)                      |