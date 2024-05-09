const express = require("express")
const router = express.Router()

let listaPessoas = [
  {
      id: "1",
      nome: "Rafael",
      idade: 24,
      email: "rafael@email.com",
      telefone: "61993128132"
  },
  {
      id: "2",
      nome: "Carolina",
      idade: 27,
      email: "carolina@email.com",
      telefone: "61987654321"
  },
  {
      id: "3",
      nome: "Gabriel",
      idade: 32,
      email: "gabriel@email.com",
      telefone: "61965432109"
  },
  {
      id: "4",
      nome: "Isabela",
      idade: 21,
      email: "isabela@email.com",
      telefone: "61912345678"
  },
  {
      id: "5",
      nome: "Thiago",
      idade: 29,
      email: "thiago@email.com",
      telefone: "61998765432"
  },
  {
      id: "6",
      nome: "Juliana",
      idade: 36,
      email: "juliana@email.com",
      telefone: "61934567890"
  }
];
// intermediario - middleware 
function validarPessoa(req, res, next) {
  const id = req.params.id;
  const pessoa = listaPessoas.find(p => p.id === id);
  const index = listaPessoas.findIndex(p => p.id === id);
  if (pessoa) {
      res.pessoa = pessoa;
      res.index = index;
      return next();
  }
  return res.status(400).json("Pessoa não encontrada!");
}

function validarAtributos(req, res, next) {
  const dados = req.body;
  if (!dados.nome || !dados.idade || !dados.email || !dados.telefone) {
      return res.status(400).json("Nome, idade, email e telefone são obrigatórios!");
  }
  return next();
}

router.get("/pessoa", (req, res) => {
  res.json(listaPessoas);
});

router.get("/pessoa/:id", validarPessoa, (req, res) => {
  res.json(res.pessoa);
});

router.post("/pessoa", validarAtributos, (req, res) => {
  const dados = req.body;
  const novaPessoa = {
      id: Math.round(Math.random() * 1000).toString(),
      nome: dados.nome,
      idade: dados.idade,
      email: dados.email,
      telefone: dados.telefone
  };
  listaPessoas.push(novaPessoa);
  res.json("Nova pessoa adicionada com sucesso!");
});

router.put("/pessoa/:id", validarPessoa, validarAtributos, (req, res) => {
  const dados = req.body;
  const pessoaAtualizada = {
      id: req.params.id,
      nome: dados.nome,
      idade: dados.idade,
      email: dados.email,
      telefone: dados.telefone
  };
  listaPessoas[res.index] = pessoaAtualizada;
  res.json("Pessoa atualizada com sucesso!");
});

router.delete("/pessoa/:id", validarPessoa, (req, res) => {
  listaPessoas.splice(res.index, 1);
  res.json("Pessoa excluída com sucesso!");
});

module.exports = router;