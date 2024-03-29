//ייצוא אובייקט עם 5 פונקציות עבטר כל אחת מהפעולות,המטרה שכל הלוגיקה תשב בקובץ הנוכחי

module.exports ={
    
    GetAllProducts:(req,res)=>
    {   const ProductModel = require('../models/product') //קישור למודל של אוסף המוצרים
        ProductModel.find().then((products)=>{
        console.log(products);
        return res.status(200).json(products)
       });
    },
       

    GetProductbyID:(req,res)=>
    {  const ProductModel = require('../models/product') //קישור למודל של אוסף המוצרים
        ProductModel.findOne({Pid:req.params.id}).then((product)=>{
        console.log(product);
        return res.status(200).json(product)
       });
    },

    AddProduct:(req,res)=>
    {
        
        const ProductModel = require('../models/product') //קישור למודל של אוסף המוצרים
        ProductModel.insertMany(req.body).then((result)=>{
        console.log(result);
        return res.status(200).json(result)
       });
        
    },

        //return res.status(200).json({MSG:"add new product"})},

    DeleteProduct:(req,res)=>
    {   let connection = global.db;
        connection.query('DELETE from t_product WHERE pid = '+req.params.id,
        (err,rows,fields)=>
        {
        {
            if(err)
            {
                console.log(err.message);
                return res.status(500).json(err.message);
            }
            else
            {
                console.log("ok");
                return res.status(200).json(rows);
            }
        }   
        }
    )},
    
        //return res.status(200).json({MSG:"delete product" + req.params.id})},

    UpdateProduct:(req,res)=>
    {
        let connection = global.db;
        var pname = req.body.pname;
        var price = req.body.price;
        var pdesc = req.body.pdesc;
        var picname = req.body.picname;
        var sql = "UPDATE t_product SET pname='" + pname +"', price='" + price + "',pdesc='" +  pdesc + "',picname='" + picname +"' WHERE pid="+ req.params.id;
        console.log(sql);
        connection.query(sql,function(err,rows,fields)
        {
            if(err)
            {
                console.log(err.message);
                return res.status(500).json(err.message);
            }
            else
            {
                console.log("ok");
                return res.status(200).json(rows);
            }
        }
        //return res.status(200).json({MSG:"update product by id" + req.params.id
    )},
};