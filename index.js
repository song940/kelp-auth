/**
 * [function BasicAuth Middleware]
 * @docs http://www.ietf.org/rfc/rfc2617.txt
 * @param  {[type]} username [description]
 * @param  {[type]} password [description]
 * @param  {[type]} realm    [description]
 * @return {[type]}          [description]
 */
module.exports = function(username, password, realm){
  var user_pass = new Buffer([username,password].join(':')).toString('base64');
  return function(req, res, next){
    var authorization = (req.headers[ 'authorization' ] || '').split(' ')[1];
    if(authorization == user_pass) return next();
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic' + (realm ? (' realm="' + realm + '"') : '')
    });
    res.end('401 Unauthorized');
  };
};
