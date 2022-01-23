const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

class Server {

   constructor() {

    this.app       = express();
    this.port      = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath  = '/api/auth';
    this.funcPath  = '/api/function';
    this.catePath  = '/api/category';
    this.importer  = '/api/importer';

    //Middlewares
    this.middlewares();
    
    // Rutas de mi aplicación
    this.routes();
   }
   

   middlewares(){

        //CORS: Si quisiera no le doy acceso a paginas y asi
        this.app.use( cors() ); // Esto es para que no me tire en el chrome los problemas de cors
        //Puedo crear listas blancas o negras de acceso, para decir que paginas pueden o no acceder al server

        //Lectura y parseo del body a tipo JSON
        //this.app.use( express.json() ); //cada vez que me envien algo lo voy a tratar de parsear a JSON

        // Directorio público 
        this.app.use( express.static('public'));

        this.app.use(bodyParser.urlencoded({ extended: false }));
        
        this.app.use( bodyParser.json() )
   }

   routes() {
       this.app.use(this.authPath,  require('../routes/auth'    ));
       this.app.use(this.usersPath, require('../routes/user'    ));
       this.app.use(this.funcPath,  require('../routes/function'));
       this.app.use(this.catePath,  require('../routes/category'));
   }

   listen() {
        
        this.app.listen( this.port , () => {
            console.log(`Servidor corriendo en el puerto: ${ this.port }`);
            
        });
   }

} 

module.exports = Server;