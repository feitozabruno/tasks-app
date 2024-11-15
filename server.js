const http = require("node:http");
const { db, addUser } = require("./database");

http
  .createServer((request, response) => {
    const { method } = request;

    let body = "";
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body += chunk.toString();
      })
      .on("end", () => {
        response.on("error", (err) => {
          console.error(err);
        });

        if (method === "POST") {
          const bodyParsed = JSON.parse(body);

          const { name, email } = bodyParsed;

          addUser(name, email);

          response.writeHead(201, { "Content-Type": "application/json" });
          response.write("Usuário criado!");

          db.close((err) => {
            if (err) {
              console.error("Erro ao fechar a conexão:", err.message);
            }
            console.log("Conexão com o banco de dados encerrada.");
          });
          // response.write(JSON.stringify([name, email]));
        }

        // response.write(body);
        response.end();
      });
  })
  .listen(8080, () => {
    console.log("Servidor rodando!");
  });
