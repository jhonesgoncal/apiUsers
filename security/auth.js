var jwt = require('jsonwebtoken');

exports.signIn = function(user){
    return jwt.sign(
        {username: user.username, admin: user.admin}, 
        global.SALT_KEY, 
        {
            expiresIn: 60*60*24*2 //Expira em 2 dias
        }
    );
};

exports.authorize = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    }else{
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            }else{
                next();
            }
        })
    }
};

exports.isAdmin = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    }else{
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            }else{
                if(decoded.admin){
                    next();
                }else{
                    res.status(401).json({
                        message: 'Você não tem permissão para essa funcionalidade'
                    });
                }
                
            }
        })
    }
};
