# relice_app_frontend
This project is front side of Relice App system. The backend side is here: https://github.com/MrFisherman19/Relice.
It has been coded in Vue along with Vuetify for beauty.

## Genesis

The project was created for one of Krakow's aviation business companies.
Company was relocating the office and I offered to write this project as part of self-study. 
It took about 3-4 months of coding after working from scratch (with an average of 2-3 hours a day).

## Description

Relice is office relocation system which is supposed to help in moving office space.
There are a lot of features to work with office assets. Application queries the backend which stores the data in the database.
For draggable-resizable inside maps I've used vue-draggable-resizable-2 project which can be found here: https://github.com/mauricius/vue-draggable-resizable.

Main features of system:

- users login and registration
- admin and user roles
- JWT token authentication 
- exporting barcodes of assets to pdf
- creating buildings, floors for office
- creating new assets, updating existing ones
- maps with the arrangement of the office
- relocation assets with simply clicking on another floor
- office reports (office health report, relocation report)
- fast barcode search for barcode reader

## Lifecycle of application

First user should log in or register to the system, every new user is ADMIN Role, admins can add normal USER to their group (every new ADMIN user is a new group).

![Login](https://i.imgur.com/2qwwSgh.png?raw=true)

Then user will see database of office assets, if user select a few or more assets than barcodes for those assets can be downloaded as .pdf. User can delete one or more rows in one time. When Location State will be set as TO_RELOCATION, one or more assets can be marked as already moved (to a new office/floor). When the user presses the green eye, he will be redirected to the exact location of the asset on the floor map. 

![Database](https://i.imgur.com/cScnOY6.png?raw=true)

User can go to the selected floor manually by selecting the building and then the floor in the building. Here he can also add a new building or remove an existing one.

![Buildings](https://i.imgur.com/lzIVgM6.png?raw=true)

Then will see a map of selected floor. He can add new items, resize and move them as he wants. Letters and colors helps with distinguish the items. User can add a few same items on the same time or duplicate existing ones.

![Map](https://i.imgur.com/c8wYPLn.png?raw=true)

Then user can go to relocation panel where can move the asset with a click of the mouse (on second map). All of data is saved in database so if page will be reloaded, all necessary data will be saved.

![Relocation](https://i.imgur.com/RDx2ixL.png?raw=true)

Current user (as admin) can add new or delete users from his group.

![UserPanel](https://i.imgur.com/iFPGYMt.png?raw=true)

There is also possibility to generate 2 reports in pdf, an office health report and a report of assets to be relocated.

![Reports](https://i.imgur.com/D4tcd7W.png?raw=true)

There is also special panel for transport company where employees can quickly find information about assets by scanning barcode to system.

![AssetFinder](https://i.imgur.com/3snBwEL.png)


## Auto generated - Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
