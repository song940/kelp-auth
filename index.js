/**
 * [function BasicAuth Middleware]
 * @docs http://www.ietf.org/rfc/rfc2617.txt
 * @param  {[type]} username [description]
 * @param  {[type]} password [description]
 * @param  {[type]} realm    [description]
 * @return {[type]}          [description]
 */
module.exports = ({
  realm,
  username,
  password,
  auth = ((user, pass) => user === username && pass === password)
}) => {
  return async (req, res, next) => {
    const authorization = (req.headers['authorization'] || '').split(' ')[1];
    const [user, pass] = Buffer.from(authorization, 'base64').toString().split(':');
    const ok = await auth(user, pass);
    if (ok) return next();
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic' + (realm ? (' realm="' + realm + '"') : '')
    });
    res.end('401 Unauthorized');
  };
};
