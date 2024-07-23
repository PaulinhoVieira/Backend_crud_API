/*Paulo Fernandes Vieira

*/
const express = require('express');
const routerUser = require('./user.js');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dbconn = require('./conexao.js');
const encripitarSenha = require('./encriptacao.js');

const secretWord = 'DAVIPAULO@24';

const app = express();
app.use(bodyParser.json());
app.use('/user', verificarToken, routerUser);


function gerarToken(payload) {
  return jwt.sign(payload, secretWord, { expiresIn: 2000 });
}

function verificarToken(req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        mensagemErro:
          'Usuário não autenticado. Faça login antes de chamar este recurso.',
      });
    } else {
      jwt.verify(token, secretWord, (error, decoded) => {
        if (error) {
          return res
            .status(403)
            .json({ mensagemErro: 'Token inválido. Faça login novamente.' });
        } else {
          const nome = decoded.nome;
          console.log(`Usuário ${nome} autenticado com sucesso.`);
          next();
        }
      });
    }
  } else {
    return res
      .status(403)
      .json({ mensagemErro: 'Token não detectado. Faça login.' });
  }
}

app.post('/login', (req, res) => {
  const email = req.body.email;
  const senha = encripitarSenha(req.body.senha);
  dbconn.query(
    'SELECT nome, email FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (erro, linhas) => {
      if (erro) {
        console.log('Erro ao processar o comando SQL. ', erro.message);
      } else {
        if (linhas.length > 0) {
          const payload = {
            nome: linhas[0].nome,
            email: linhas[0].email
          };
          const token = gerarToken(payload);
          res.json({ acessToken: token });
        } else {
          res.status(403).json({ mensagemErro: 'Usuário ou senha inválidos' });
        }
      }
    }
  );
});

app.listen(3000, () =>{
  console.log('Server conectado!');
})
