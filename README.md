# Full-Stack-Cinema-Subscription-Website

This is a Cinema Movies Subscritpions Website <br/> <br/>

<ins>**Backend:**</ins> <br/> <br/>

* **CinemaWS:** <br/>
- This is the server responsible for communication with clients, handling most of the logic. <br/>
- Using SubscriptionsWS as a webservice. <br/>
- Credentials persistance with MongoDB <br/>
- Orchestration - Router -> BL -> DAL <br/>
- Data layer consists of 3 different kinds of sources - MongoDB, webservice and json files. <br/>
- JWT Authentication - token creation, validation and refreshing <br/> <br/>

* **SubscriptionsWS:** <br/>
- This is the server is acting as a webservice for CinemaWS <br/>
- It is responsible for handling most of the data of members subscriptions and movies <br/>
- Persistance with MongoDB <br/>
- Orchestration - Router -> BL -> DAL <br/> <br/>

**<ins>Frontend:</ins>** <br/> <br/>

* **React Client Cinema Website:** <br/>
- Full client web app - login, view, add, edit and delete data according to user permissions. <br/>
- Using CinemaWS as the backend <br/>
- Using Redux toolkit for holding states of users, movies and members. <br/>
- Redux toolkit thunks for async communication with backend. <br/>
- Axios interceptors for token passing, token refreshment and handling errors. <br/>
- React-router-dom for routing pages <br/>
