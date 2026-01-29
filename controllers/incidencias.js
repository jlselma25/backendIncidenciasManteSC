

const { response } = require('express');
const { executeQuery } = require('../database/operations');
const sql = require('mssql');
const moment = require('moment');

CargarTiendas = async(req, res = response ) => { 
    try{        

      
        const empresas = " Numero <> 701 AND Numero <> 702 AND Numero <> 703 AND Numero <> 705 AND Numero <> 704 AND Numero <> 706 AND Numero <> 707 AND Numero <> 708 AND Numero <> 713 AND Numero <> 724 AND Numero <> 725 AND Numero <> 738 AND Numero <> 739 AND Numero <> 103 AND Numero <> 204 AND Numero <> 205 AND Numero <> 308 AND Numero <> 309 AND Numero <> 99 AND Numero <> 900 AND Numero <> 700 AND Numero <> 0 AND Numero <> 900";
        const query = `SELECT Numero  ,Nombre FROM Clientes WHERE  ${empresas} UNION ALL SELECT  '-1' Numero, 'Todas tiendas' Nombre`;

       
        data = await executeQuery(query,process.env.IP);  
        const mappedData = data.map(row => ({
            numero: row.Numero, 
            nombre: row.Nombre 
        }));        
       
      
        return res.json(mappedData);    
    
     }catch(err){
         console.log('Error insertando '  + err);
         return res.json({
             numero: '0',
            nombre: ''
            });
     }
 }


GuardarIncidencia = async(req, res = response ) => {
   
    const { motivo,fecha,tienda, observaciones, prioridad} = req.query; 
        //const fechaIncidencia = formatoFecha(fecha);   

    const fechaFormateada = moment(fecha, "DD/MM/YYYY HH:mm").format('YYYY-MM-DD HH:mm'); 
   
   try{      
        
        const query ="INSERT INTO IncidenciasManteTiendas (fecha,motivo,tienda,observaciones,prioridad) VALUES ('" + fechaFormateada + "','"  + motivo + "','" + tienda + "','" + observaciones + "'," + prioridad + ")";       
                       
        await executeQuery(query,process.env.IP);  
         return res.json({
            resul: true,
            
        });
    }catch(error){
        console.log(error);
        return res.json({
            resul: false,
            
        });
    }   
  
   }


   ActualizarIncidencia = async(req, res = response ) => {
   
    const { motivo,fecha,tienda, observaciones, id,prioridad} = req.query; 
        //const fechaIncidencia = formatoFecha(fecha);   

    const fechaFormateada = moment(fecha, "DD/MM/YYYY HH:mm").format('YYYY-MM-DD HH:mm'); 

   
   try{      
        
        const query ="UPDATE IncidenciasManteTiendas SET Fecha = '" + fechaFormateada + "', Motivo='"  + motivo + "',Tienda = '" + tienda + "', Observaciones ='" + observaciones + "', Prioridad = " + prioridad + " WHERE id=" + id;                                  ;
        await executeQuery(query,process.env.IP);  
         return res.json({
            resul: true,
            
        });
    }catch(error){
        console.log(error);
        return res.json({
            resul: false,
            
        });
    }   
  
   }

   EliminarIncidencia = async(req, res = response ) => {
   
    const { id} = req.query;    

   
   try{      
        
        const query ="DELETE FROM IncidenciasManteTiendas WHERE id =" + id;       
                       
        await executeQuery(query,process.env.IP);  
         return res.json({
            resul: true,
            
        });
    }catch(error){
        console.log(error);
        return res.json({
            resul: false,
            
        });
    }   
  
   }


   CargarIncidencias = async(req, res = response ) => { 
    try{        
        let sql;
        const { fechaDesde,fechaHasta ,tienda , individual , id, prioridad} = req.query;  

        const fechaDesdeFormateada = moment(fechaDesde, 'YYYY-MM-DD HH:mm:ss.SSSSS').format('YYYY-MM-DD 00:00:00');  
        const fechaHastaFormateada = moment(fechaHasta, 'YYYY-MM-DD HH:mm:ss.SSSSS').format('YYYY-MM-DD 23:59:59');  

        const filtroTiendas =   tienda != '-1' ? " AND Tienda ='" + tienda + "'" : '';
        const filtroPrioridad = prioridad != 0 ? " AND Prioridad =" + prioridad : '';

        if (individual == 0){
            sql  = "SELECT Fecha, id, Motivo Titulo, Tienda, Estado, Observaciones, C.Nombre, Prioridad FROM IncidenciasManteTiendas T JOIN Clientes C ON T.Tienda = C.Numero WHERE Fecha >='" + fechaDesdeFormateada + "' AND Fecha <='" + fechaHastaFormateada + "'" + filtroTiendas + filtroPrioridad + " ORDER BY Prioridad DESC, Fecha "
        }else{            
            sql = "SELECT Fecha, id, Motivo Titulo, Tienda, Estado, '' Nombre, Observaciones, Prioridad FROM IncidenciasManteTiendas WHERE id =" + id.ToString(); 
        }       
  
        data = await executeQuery(sql,process.env.IP);         

        const mappedData = data.map(row => ({
            id: row.id, 
            fecha: moment(row.Fecha).local().format('DD/MM/YYYY HH:mm') ,
            titulo: row.Titulo,
            tienda: row.Tienda,
            nombre: row.Nombre,  
            observaciones: row.Observaciones,         
            finalizado: row.Estado == 'PENDIENTE' ? false : true,
            prioridad: row.Prioridad

            
        }));        
       
      
        return res.json(mappedData);    
    
     }catch(err){
         console.log('Error cargar incidencias '  + err);
         return res.json({
            id: -1,                         
            });
     }
 }



  Status = async(req, res = response ) => {  
     return res.json({ resul: 1});
   }

   Keepalive = async(req, res = response ) => {  
     
    return res.status(200).send('OK');
}



  module.exports = {  
    CargarTiendas ,
    GuardarIncidencia ,
    CargarIncidencias ,
    EliminarIncidencia  ,
    ActualizarIncidencia,
    Status,
    Keepalive
   
 }