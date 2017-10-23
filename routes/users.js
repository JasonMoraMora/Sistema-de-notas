const express = require('express');
const router = express.Router();
const bd = require('./bd');

//PAGINA DE INICIO PARA ADMINISTRADOR
router.get('/', function(req, res, next) {
  res.render('login-admin');
});

//FORMULARIO PARA INGRESAR A LAS OPCIONES DEL ADMINISTRADOR
router.post('/inicio', function(req, res, next) {
  var reg = {usuario:req.body.usr, clave:req.body.psw};
  var sql = 'SELECT id_user, username, pass, id_tipo FROM usuario WHERE username = "' + reg.usuario + '" AND pass = "' + reg.clave + '" ';
  bd.query(sql, (err, result)=>{
    if(err) throw err;
    if(result[0] == null){
      res.send('Usuario no existe');
    }else{
      res.render('administrador/admin-ini');
    }
  });
});

//--HBS ALUMNO--//
//LISTA
router.get('/alumno', (req, res, next)=>{
  var sql = 'SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2';
  bd.query(sql,(err, result)=>{
    if(err) throw err;
    res.render('administrador/alumno' , {listado: result});
  });  
});
//ALTA
router.post('/insert_alu', (req, res, next)=>{
  /*
  var reg = {doc: req.body.doc_id, nom: req.body.nom_ape, dev_id: 2};
  bd.query('INSERT INTO alumno SET ?', reg, (err, result)=>{
    if(err) throw err;
    console.log(result.affectedRows);
  });
  */
});
//MODIFICAR
router.post('/update_alu', (req, res, next)=>{
  console.log('Update');
  console.log(req.body.upd);
});
//ELIMINAR
router.post('/delete_alu', (req, res, next)=>{
  console.log('Delete');
  console.log(req.body.upd);
});















//--HBS PROFESOR
router.get('/profesor', (req, res, next)=>{
  res.render('administrador/profesor');
});

//--HBS CURSO
router.get('/curso', (req, res, next)=>{
  res.render('administrador/curso');
});

module.exports = router;