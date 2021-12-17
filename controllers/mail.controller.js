let nodemailer = require('nodemailer');

exports.sendMail = async function (req, res, next){
    var codigo = Math.random().toString(36).slice(-8);

    console.log("body",req.body)
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //host: 'svp-02715.fibercorp.local',
        //secure: false,
        port:25,
        service: 'Gmail',
        auth: {
            user: 'crecerAPPi@gmail.com',//poner cuenta gmail
            pass: 'aajayxtapcgnfyei'  //contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });


    // Definimos el email
    var mailOptions = {
        from: 'Crecer - Recuperar contraseña',
        to: req.body.destinatario,
        codigo: codigo,
        subject: 'Recupero de contraseña - Crecer',
        html: '<h1> El codigo para recuperar su contraseña es: </h1><h3>' +codigo+'</h3>',
        
    };
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log(codigo)
        return res.status(201).json({codigo: codigo})
    }
    catch(error)    
    {
        console.log("Error envio mail: ",error);      
    }
};