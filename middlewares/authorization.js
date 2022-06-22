const test = require('../index');

const authorizationFunc = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== test) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return next();
};

module.exports = authorizationFunc;