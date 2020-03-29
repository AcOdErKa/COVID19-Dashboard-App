# COVID19 Dashboard App

This application reads data from KAGGLE Data Set and Displays in a Dashboard. The [Data Set]("https://www.kaggle.com/imdevskp/corona-virus-report/data#") is updated every 24 hours in [Kaggle]("https://www.kaggle.com/") and You can replace the .csv file to Get The Latest Data.

## Getting Started

This project has A NodeJS backend which consists of Several REST API's to get Data and A Angular frontend for the acual dashboard.

### Prerequisites

You Need to Install Node.js and Angular

### Installing

Clone the git repo. Go to the backend folder and run :
```
npm install
```
To start the Backend Server run : 
```
npm start
```
If you get error for nodemon, please Install nodemon using :
```
npm install -g nodemon
```

For the dashboard, go to the frontend foler and run :
```
npm install
```
To start the Application run : 
```
ng serve
```
This will start the angular application on PORT 4200

## API Description

Get All Data From the Dataset
```
http://localhost:3000/getAllData/
```

Get All Data for a Specific Country
```
http://localhost:3000/getAllData/CountryName

Example:

http://localhost:3000/getAllData/India
```
Get All Data fora Specific State of a Country
```
http://localhost:3000/getAllData/CountryName/StateName

Example:

http://localhost:3000/getAllData/China/Beijing

```

Get All Country Names
```
http://localhost:3000/getAllCountry
```

Get All Province/State Names for a Country
```
http://localhost:3000/getAllCountry/CountryName

Example:

http://localhost:3000/getProvince/China
```
## Authors

* **Abhisek Karmakar**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details