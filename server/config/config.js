
//=================
// Puerto
//=================
process.env.PORT = process.env.PORT || 4000;

//=================
// Entorno
//=================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; 

//=================
// Base de datos
//=================

let urlDB;

//  if (process.env.NODE_ENV == 'dev') {
//      urlDB = 'mongodb://localhost:27017/diagnosticos';
// } else {
    urlDB = "mongodb+srv://sebas:XVPuTdnbk6hpnpc@cluster0-nxakw.mongodb.net/prototype-tg";//process.env.MONGO_URI;
// }

process.env.URLDB = urlDB;