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
  bd.query('SELECT id_user, username, pass, id_tipo FROM usuario WHERE username = "' + reg.usuario + '" AND pass = "' + reg.clave + '"', (err, result)=>{
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
  bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2',(err, result)=>{
    if(err) throw err;
    res.render('administrador/alumno' , {listado: result});
  });  
});
//ALTA
router.post('/insert_alu', (req, res, next)=>{
  var reg = {doc: req.body.doc_id, nom: req.body.nom_ape, dev_id: 2};
  bd.query('INSERT INTO alumno (alumno_doc, alumno_nombre, devaluado_id) VALUES ('+reg.doc+', "'+reg.nom+'", '+reg.dev_id+')', (err, result)=>{
    if(err){
      bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2 AND alumno_doc = ' + reg.doc + '',(err, result)=>{
        var pagina = '<b>El usuario ya existe</b><br>';
        pagina += 'Nro Doc' + result[0].alumno_doc + ' <br> ' + result[0].alumno_nombre + '<br> <br>';
        pagina += '<b>Intentaste registrar</b><br>';
        pagina += 'Nro Doc' + reg.doc + ' <br> ' + reg.nom + '<br><br>';
        pagina += '<a href="/users/alumno">Retornar</a>';
        res.send(pagina);  
      });
    }
    bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2',(err, result)=>{
      if(err) throw err;
      res.render('administrador/alumno' , {listado: result});
    });
  });
});
//MODIFICAR
router.post('/update_alu', (req, res, next)=>{
  var  doc_id = req.body.upd;
  bd.query('SELECT * FROM alumno WHERE alumno_doc = "' + doc_id + '"', (err, result)=>{
    if(err) throw err;
    res.render('administrador/alumnoUpdate', {listado: result});
  });
});
router.post('/update', (req, res, next)=>{
  var reg = {doc: req.body.doc_id, nom: req.body.nom_ape, dev_id: 2};
  bd.query('UPDATE alumno SET alumno_nombre = "' + reg.nom + '" WHERE alumno_doc = ' + reg.doc + '', (err, result)=>{
    bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2',(err, result)=>{
      if(err) throw err;
      res.render('administrador/alumno' , {listado: result});
    });
  });
});
//ELIMINAR
router.post('/delete_alu', (req, res, next)=>{
  var doc_id = req.body.del;
  bd.query('SELECT * FROM alumno WHERE alumno_doc = "' + doc_id + '"', (err, result)=>{
    res.render('administrador/alumnoDelete', {listado: result});
  });
});
router.post('/delete', (req, res, next)=>{
  var reg = {doc: req.body.doc_id, nom: req.body.nom_ape, dev_id: 2};
  bd.query('UPDATE alumno SET devaluado_id = 1 WHERE alumno_doc = ' + reg.doc + '', (err, result)=>{
    bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2',(err, result)=>{
      if(err) throw err;
      res.render('administrador/alumno' , {listado: result});
    });
  });
});
//RETIRADOS
router.get('/aluRet', (req, res, next)=>{
  bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 1',(err, result)=>{
    if(result[0] == null){
      res.send();
    }
    res.render('administrador/alumnoRet' , {listado: result});
  });
});
router.post('/aluRem', (req, res, next)=>{
  var doc = req.body.ret;
  bd.query('UPDATE alumno SET devaluado_id = 2 WHERE alumno_doc = ' + doc + '',(err, result)=>{
    bd.query('SELECT alumno_doc, alumno_nombre, devaluado_id FROM alumno WHERE devaluado_id = 2',(err, result)=>{
      if(err) throw err;
      res.render('administrador/alumno' , {listado: result});
    });
  });
  
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