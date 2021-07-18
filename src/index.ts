import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("API rodando...");
});

var sessao: any = 0;
let notas: any = [];
let usuario: any = {};

function Authenticator(req: Request, res: Response, next: NextFunction) {
  if (sessao == 1) {
    return next();
  }
  return res.status(403).json({
    message: "Usuario não esta logado",
  });
}

function verificarNota(req: Request, res: Response, next: NextFunction) {
  const { detalhamento, descricao } = req.body;

  if (!detalhamento || !descricao || detalhamento !== "" || descricao !== "") {
    return next();
  }
  return res.status(401).json({
    mensagem: "Dados inválidos",
  });
}

app.get("/", (req, response) => {
  return response.sendStatus(401);
});
app.get("/notas", Authenticator, (req: Request, res: Response) => {
  return res.json(notas);
});
app.get("/usuario", Authenticator, (req: Request, res: Response) => {
  return res.json(usuario);
});

app.post("/sessao", (req, res) => {
  const { atualizar } = req.body;
  sessao = atualizar;
  return res.sendStatus(200);
});

app.post(
  "/criar-nota",
  [Authenticator, verificarNota],
  (req: Request, res: Response) => {
    const { detalhamento, descricao, id } = req.body;

    const nota = {
      id,
      detalhamento,
      descricao,
    };

    notas.push(nota);
    return res.json(nota);
  }
);

app.post("/criar-conta", (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({
      mensagem: "Dados inválidos",
    });
  }

  const user = {
    login,
    senha,
  };

  usuario = user;
  return res.sendStatus(200);
});

app.post("/salvar-notas", Authenticator, (req: Request, res: Response) => {
  const { novasnotas } = req.body;

  if (!novasnotas) {
    return res.status(400).json({
      mensagem: "Dados inválidos",
    });
  }

  notas = JSON.parse(novasnotas);
  return res.sendStatus(200);
});

app.post("/carregar-sessao", (req: Request, res: Response) => {
  const { novasessao } = req.body;

  if (!novasessao) {
    return res.status(400).json({
      mensagem: "Dados inválidos",
    });
  }

  sessao = novasessao;
  return res.sendStatus(200);
});

app.delete(
  "/deletar-nota/:id",
  Authenticator,
  (req: Request, res: Response) => {
    const { id } = req.params;
    var index = notas.indexOf(id);
    if (index) {
      notas.splice(id, 1);
    }
    return res.sendStatus(204);
  }
);

app.put(
  "/editar-nota/:idUsuario",
  [Authenticator, verificarNota],
  (req: Request, res: Response) => {
    const { detalhamento, descricao, id } = req.body;
    const { idUsuario } = req.params;
    const indice = Number(idUsuario);

    notas[indice].id = indice;
    notas[indice].descricao = descricao;
    notas[indice].detalhamento = detalhamento;

    return res.json(notas[indice]);
  }
);
