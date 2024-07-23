const crypto = require('crypto');

const secret = 'DAVIPAULO@24';

function encripitarSenha(senha){
  const hash = crypto.createHash('sha256');
  hash.update(senha + secret);
  return hash.digest('hex');
}

module.exports = encripitarSenha;