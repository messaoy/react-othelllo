This is the Zenika intranet back-end project which will be used by the students of the academy as well as the student body and the administration.

The current project allows you to log in as a student to see his promotion and his program.
It also allows you to log in as administrator to create users, programs and promotions. The administrator can also view and edit them

The front-server project is here : https://gitlab.com/zacademy-paris-2019/zintranet_groupe2

We use Node.JS 12.11, Express 4.17, MySQL and Sequelize, Socket.io

The project is linted using Eslint with Airbnb Config : https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

This project is tested with Jest

To install the project you need to :

### `Install NodeJS V.12 on your computer`

### `Install MYSQL and create a database "zenika_academy"`

After that you will need to 

### `download/clone/fork the project`

then you run

### `npm install` to install dependencies

When you are done with downloading internet, make sure you
### `Change your database credentials in config.json`

Once your MySQL is running, run 

### `npm run migrate` to create all table using migration

Grab a coffee then run 

### `npm run start` to start your server in daemon thanks to (pm2)

Your server is available at  
### `http://localhost:4001`

and Voila ! 

## Available script

In the project directory, you can run:

### `npm run start`

Runs the server in the development mode in daemon.<br />
Open [http://localhost:4001](http://localhost:4001) to view it in the browser.

### `npm run kill`

Kill the process and shut down the server.<br />

### `npm run migrate`

Do all the migration in the 'migrations' file.<br />

### `npm run log`

Show the server log in the interactive watch mode (in the console).<br />

### `npm run test`

Launches the test runner in the interactive watch mode.<br />

### `npm run lint`

This will launch esLint to check all js/jsx file in controller.
