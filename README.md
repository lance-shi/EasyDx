# EasyDx - Salesforce DX GUI Version
Salesforce DX CLI tool is great. But not everybody likes command lines. Plus, sometimes it is just tedious to remember and type those long lines of commands. 

So I have written this simple GUI version of Salesforce DX to help getting our daily work with Salesforce DX easier. The code is written in React, Node and Express. 

## Installation

> Before installing Easy DX, you need to install [Salesforce CLI Tool](https://developer.salesforce.com/tools/sfdxcli) and [Node JS](https://nodejs.org/en/). 

npm install doesn't work very well for easdydx for now. So you need to use git clone (recommended) to get a local copy of the repository by: 
```shell
git clone https://github.com/lance-shi/EasyDx.git
```
or download the .zip file from this repository, unzip it into your local computer. Then go into EasyDx folder and execute: 
```shell
npm install
``` 

Once it is completed, you are ready to go! 

## Usage

In command line, go to your folder and run 
```shell
npm start
```

Then in your favourite browser, open this url: http://localhost:3666

Easy DX's UI is pretty self-explanatory. For further usage, I will post on my blog: sfdcinpractice.com 

## To Update
If you use git clone to get the project, simply use git pull get the latest source. 

If you have downloaded the .zip file. You can download an updated version and replace the existing one. Your local data (projects and orgs) are inside data/ folder. Just keep that folder will keep your local data safe. 


