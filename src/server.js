import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let posts = [
  {
    id: 1,
    content: "Сегодня был на прекрасной прогулке в парке!",
    created: "2023-05-15T14:30:00Z",
    author: "Иван Петров",
  },
  {
    id: 2,
    content: "Только что закончил новый проект на React. Чувствую себя прекрасно!",
    created: "2023-05-16T09:15:00Z",
    author: "Алексей Смирнов",
  },
  {
    id: 3,
    content: "Кто-нибудь знает хорошие кафе в центре города?",
    created: "2023-05-17T18:45:00Z",
    author: "Мария Иванова",
  },
  {
    id: 4,
    content: "Прочитал интересную книгу 'Чистый код'. Рекомендую всем разработчикам!",
    created: "2023-05-18T11:20:00Z",
    author: "Дмитрий Васильев",
  },
  {
    id: 5,
    content: "Сегодня годовщина нашего знакомства с женой ",
    created: "2023-05-19T20:00:00Z",
    author: "Сергей Козлов",
  }
];
let nextId = 1;

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  res.send(JSON.stringify({ post: posts[index] }));
});

app.post("/posts", (req, res) => {
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);
  
  const newPost = {
    id: maxId + 1,
    content: req.body.content,
    created: new Date().toISOString(),
    author: "Аноним",
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  posts = posts.map((o) => {
    if (o.id === postId) {
      return {
        ...o,
        ...req.body,
        id: o.id,
      };
    }
    return o;
  });
  res.status(204).end();
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.status(204);
  res.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);