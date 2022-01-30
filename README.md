# Medicare_API
 
 This is the API side of Medicare application that connects to mysql database ( personaly used MySQL workbench) to send the data like patients, thier prescriptions and appointments as well as manage the log in and register system. Application manages the user mail system for the registration, appointments and prescriptions.
 
 ## Prerequisite - Required to run the application ‼  ‼  ‼ 
 
 Database required: [Mysql database script](https://github.com/LainonShiraya/Medicare_API/blob/main/Mysql-database-schema.sql)
 
 May be suggested to change the user and/or password in database connection: [database connection file](https://github.com/LainonShiraya/Medicare_API/blob/main/config/mysql2/db.js)
 
 Fill the file with your mail and password ( if gmail it has to be password generated for applications) : [.env](https://github.com/LainonShiraya/Medicare_API/blob/main/.env)
 
  ## Run the application( In the project folder) 
 
 To download required node_modules
 ```sh
 npm i
  ```
  I personaly used nodemon as npm start
   ```sh
 npm i nodemon
  ```
  to start the application
 ```sh
 npm start
 ```
 
  ## Tools used
  
* Sessions
* Express
* Bcrypt
* Nodemailer
 
<!--  # Medicare

This is a application based on self made API that uses local storage as well as api calls to allow the patients register, as well as log in.
It displays pretty simple designed menu for user that can check it's own prescriptions and appointments as well as edit their information. Doctor as the user that cannot register, has different menu after logging in, that allows him to check the next patients he has, check the patients list as well as edit the patient details, add him the prescriptions and appointments, as well as remove the appointments. Doctor can add a patient himself, and if so, the patient will get a mail notification about that with a password that is required to register to the application. Every time Doctor adds or removes an appointment or adds a prescription, notification gets send as well.
Application has the option to change the languages between polish and english.

## Prerequisite - Api required to run the application ‼  ‼  ‼ 
  
[![Medicare_API](https://github-readme-stats.vercel.app/api/pin/?username=LainonShiraya&repo=Medicare_API&show_owner=true)](https://github.com/LainonShiraya/Medicare_API)
     
## Doctor Log in Parameters (required to test the application as admin)


<p align="center"> 
Login/Pesel/personal ID number : 1234
 </p>  
<p align="center">
Password: zaq1
</p>
 
 ## Run the application( In the project folder) 
 
 To download required node_modules
 ```sh
 npm i
  ```
  to start the application
 ```sh
 npm start
 ```
 ## External libraries used

* Axios
* react-i18next
* React router v6
* [Sweet Alert](https://github.com/t4t5/sweetalert)
 
## Few screenshots

 <p float="center" align="center">
<img src="https://user-images.githubusercontent.com/59234543/151683015-cb6316b4-9678-4d74-b9a0-b0fc32c09059.png" width="384" height="216" >
&nbsp; &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/59234543/151682893-11c3abc4-5472-4bfa-9e67-8cf115c7efcc.png" width="384" height="216" >
<img src="https://user-images.githubusercontent.com/59234543/151682900-a3bb3d29-d3bc-446a-bb04-8d8e93e6fe70.png" width="384" height="216" >
&nbsp; &nbsp; &nbsp; <img src="https://user-images.githubusercontent.com/59234543/151682912-1a2678ea-2d1d-4c80-85b6-e85ad0c4d82b.png" width="384" height="216" >
<img src="https://user-images.githubusercontent.com/59234543/151682918-2cede209-f314-4b12-b2df-b6a535643565.png" width="384" height="216" >
 </p>
 
     -->
