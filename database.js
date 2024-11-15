const sqlite3 = require("sqlite3").verbose();
console.log(sqlite3);

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);
});

const addUser = (name, email) => {
  db.run(
    `INSERT INTO users (name, email) VALUES (?, ?)`,
    [name, email],
    function (err) {
      if (err) {
        return console.error("Erro ao inserir dados:", err.message);
      }

      console.log(`Usuário adicionado com ID ${this.lastID}`);
    }
  );
};

const updateUser = (id, name) => {
  db.run(`UPDATE users SET name = ? WHERE id = ?`, [name, id], function (err) {
    if (err) {
      return console.error("Erro ao atualizar dados:", err.message);
    }
    console.log(`Usuário atualizado com ID ${id}`);
  });
};

const deleteUser = (id) => {
  db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
    if (err) {
      return console.error("Erro ao deletar dados:", err.message);
    }
    console.log(`Usuário com ID ${id} deletado`);
  });
};

module.exports = { db, addUser, updateUser, deleteUser };
