var app = require('../app')

app.set('port', process.env.PORT || 9999)

var server = app.listen(app.get('port'), function(){
    console.log( 'Server Ativo:', server.address().port )
})