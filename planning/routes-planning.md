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
| GET         | /doctors/               | Display all doctors                              |
| GET         | /doctors/:id            | Display a doctor                                 |
| POST        | /doctors                | Create new doctor                                |
| PUT         | /doctors/:id            | Edit existing doctor                             |
| DELETE      | /doctors/:id/delete     | Delete existing doctor                           |
| GET         | /appointments           | Display all appointments (clinic)                |
| GET         | /appointments/:id       | Display an appointment                           |
| POST        | /appointments           | Create a new appointment                         |
| PUT         | /appointments/:id       | Edit appointment (patient booking & cancelling)  |
| DELETE      | /appointments/:id/delete| Delete appointment (clinic)                      |
| GET         | /documents              | Display all documents                            |
| GET         | /documents/:id          | Display a document                               |
| POST        | /documents              | Create a new document                            |
| DELETE      | /documents/:id/delete   | Delete a document                                |