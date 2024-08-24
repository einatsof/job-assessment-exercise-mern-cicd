# Dev Job Assessment Test - MERN Stack + CI/CD

1. DevOps challenge - in an azure DevOps account, connect a repo and add a pipeline that publishes an artifact, the pipeline is triggered by changes to the repo
2. Dev challenge - implement one page with a responsive table, get data with NodeJS backend from MongoDB, data in table is sortable ASC/DESC by each column, and the table can be downloaded as a PDF file

## Client
I created a react app for the front-end.  
I used [bootstrap](https://www.npmjs.com/package/bootstrap) to assist with the UI and make the page and table responsive.  
I used [jsPDF](https://www.npmjs.com/package/jspdf) and [jsPDF-AutoTable](https://www.npmjs.com/package/jspdf-autotable) to generate a PDF file from HTML & CSS with selectable text (as opposed to a static image).  
In order for the printed table to be of constant size I used another non-responsive invisible table and used its HTML & CSS to generate the file.

## Server  
I created a node.js server for the back-end.  
The server uses [express](https://www.npmjs.com/package/express) and [cors](https://www.npmjs.com/package/cors) to set up the server and [mongodb](https://www.npmjs.com/package/mongodb) to connect to the MongoDB database and fetch the data.

## Pipeline
I created a new Azure pipeline.  
I used the master branch of my repository as a trigger for the pipeline.
The pipeline installs dependencies and builds the react front-end, then install dependencies for the server. After that it copies the react build files and the servers files, archives them in a zip file and publish the file.
