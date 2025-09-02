const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const db = mysql.createConnection(dbConfig);

db.connect(err=> {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como ID ' + dbConfig.threadId);
});

app.use(express.json());

//user -----------------------------------------------------------------------------------------------------

app.post('/users', (req, res) => {
  const { nome, email, password, registration, points, level, idFunction, idGroup, idClass } = req.body;
  const query = 'INSERT INTO users (name, email, password, registration, points, level, idFunction, idGroup, idClass) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, email, password, registration, points, level, idFunction, idGroup, idClass], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar usuário.');
      return;
    }
    res.status(201).json({ message: 'Usuário criado com sucesso!', id: result.insertId });
  });
});
app.get('/users', (req, res) => {
  const query = 'SELECT u.idUser, u.nome, u.email, u.registration, u.points, u.level, f.title AS function_title, f.description AS function_description, f.image AS function_image, g.nome AS group_name, g.points AS group_points,c.period AS class_period, c.subject AS class_subject FROM users AS u LEFT JOIN function AS f ON u.idFunction = f.idFunction LEFT JOIN group AS g ON u.idGroup = g.idGroup LEFT JOIN class AS c ON u.idClass = c.idClass WHERE u.idUser = ?';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar usuários.');
      return;
    }
    res.json(results);
  });
});
app.get('/users/:idUser', (req, res) => {
  const { idUser } = req.params;
  const query = 'SELECT u.idUser, u.nome, u.email, u.registration, u.points, u.level, f.title AS function_title, f.description AS function_description, f.image AS function_image, g.nome AS group_name, g.points AS group_points,c.period AS class_period, c.subject AS class_subject FROM users AS u LEFT JOIN function AS f ON u.idFunction = f.idFunction LEFT JOIN group AS g ON u.idGroup = g.idGroup LEFT JOIN class AS c ON u.idClass = c.idClass WHERE u.idUser = ?';
  db.query(query, [idUser], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar usuário.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuário não encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/users/:idUser', (req, res) => {
  const { idUser } = req.params;
  const { nome, email, password, registration, points, level, idFunction, idGroup, idClass } = req.body;
  const query = 'UPDATE users SET nome = ?, email = ?, password = ?, registration = ?, points = ?, level = ?, idFunction = ?, idGroup = ?, idClass = ? WHERE idUser = ?';
  db.query(query, [nome, email, password, registration, points, level, idFunction, idGroup, idClass, idUser], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar usuário.');
      return;
    }
    res.json({ message: 'Usuário atualizado com sucesso!' });
  });
});


app.delete('/users/:idUser', (req, res) => {
  const { idUser } = req.params;
  const query = 'DELETE FROM users WHERE idUser = ?';
  db.query(query, [idUser], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar usuário.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Usuário não encontrado.');
      return;
    }
    res.json({ message: 'Usuário deletado com sucesso!' });
  });
});

// master ----------------------------------------------------------------------------------------

app.post('/master', (req, res) => {
  const { nome, email, senha, idClass } = req.body;
  const query = 'INSERT INTO master (nome, email, senha, idClass) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, senha, idClass], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar master.');
      return;
    }
    res.status(201).json({ message: 'Master criado com sucesso!', id: result.insertId });
  });
});
app.get('/master', (req, res) => {
  const query = 'SELECT mt.idMaster, mt.nome, mt.email, mt.senha, c.period AS class_period, c.subject AS class_subject FROM master AS mt LEFT JOIN class AS c ON mt.idClass = c.idClass';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar master.');
      return;
    }
    res.json(results);
  });
});
app.get('/master/:idMaster', (req, res) => {
  const { idMaster } = req.params;
  const query = 'SELECT mt.idMaster, mt.name, mt.email, mt.senha, c.period AS class_period, c.subject AS class_subject FROM master AS mt LEFT JOIN class AS c ON mt.idClass = c.idClass WHERE mt.idMaster = ?';
  db.query(query, [idMaster], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar master.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Master não encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/master/:idMaster', (req, res) => {
  const { idMaster } = req.params;
  const { nome, email, senha, idClass } = req.body;
  const query = 'UPDATE master SET nome = ?, email = ?, senha = ?, idClass = ? WHERE idMaster = ?';
  db.query(query, [nome, email, senha, idClass, idMaster], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar master.');
      return;
    }
    res.json({ message: 'Master atualizado com sucesso!' });
  });
});
app.delete('/master/:idMaster', (req, res) => {
  const { idMaster } = req.params;
  const query = 'DELETE FROM master WHERE idMaster = ?';
  db.query(query, [idMaster], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar master.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Master não encontrado.');
      return;
    }
    res.json({ message: 'Master deletado com sucesso!' });
  });
});

// Class ---------------------------------------------------------------------------------------------

app.post('/class', (req, res) => {
  const { period, subject } = req.body;
  const query = 'INSERT INTO class (period, subject) VALUES (?, ?, ?)';
  db.query(query, [period, subject], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar classe.');
      return;
    }
    res.status(201).json({ message: 'Classe criada com sucesso!', id: result.insertId });
  });
});
app.get('/class', (req, res) => {
  const query = 'SELECT idClass, period, subject FROM class';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar classes.');
      return;
    }
    res.json(results);
  });
});

app.get('/class/:idClass', (req, res) => {
  const { idClass } = req.params;
  const query = 'SELECT idClass, period, subject FROM class WHERE idClass = ?';
  db.query(query, [idClass], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar classe.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Classe não encontrada.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/class/:idClass', (req, res) => {
  const { idClass } = req.params;
  const { period, subject } = req.body;
  const query = 'UPDATE class SET period = ?, subject = ? WHERE idClass = ?';
  db.query(query, [period, subject, idClass], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar classe.');
      return;
    }
    res.json({ message: 'Classe atualizada com sucesso!' });
  });
});

app.delete('/class/:idClass', (req, res) => {
  const { idClass } = req.params;
  const query = 'DELETE FROM class WHERE idClass = ?';
  db.query(query, [idClass], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar classe.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Classe não encontrada.');
      return;
    }
    res.json({ message: 'Classe deletada com sucesso!' });
  });
});

// function -------------------------------------------------------------------------------------------------

app.post('/function', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO function (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar função.');
      return;
    }
    res.status(201).json({ message: 'Função criada com sucesso!', id: result.insertId });
  });
});
app.get('/function', (req, res) => {
  const query = 'SELECT idFunction, name, description FROM function';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar funções.');
      return;
    }
    res.json(results);
  });
});

app.get('/function/:idFunction', (req, res) => {
  const { idFunction } = req.params;
  const query = 'SELECT idFunction, name, description FROM function WHERE idFunction = ?';
  db.query(query, [idFunction], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar função.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Função não encontrada.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/function/:idFunction', (req, res) => {
  const { idFunction } = req.params;
  const { name, description } = req.body;
  const query = 'UPDATE function SET nome = ?, description = ? WHERE idFunction = ?';
  db.query(query, [name, description, idFunction], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar função.');
      return;
    }
    res.json({ message: 'Função atualizada com sucesso!' });
  });
});

app.delete('/function/:idFunction', (req, res) => {
  const { idFunction } = req.params;
  const query = 'DELETE FROM function WHERE idFunction = ?';
  db.query(query, [idFunction], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar função.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Função não encontrada.');
      return;
    }
    res.json({ message: 'Função deletada com sucesso!' });
  });
});

//grupo -----------------------------------------------------------------------------------------------------

app.post('/group', (req, res) => {
const { nome } = req.body;
const query = 'INSERT INTO group (nome) VALUES (?)';
  db.query(query, [nome], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar grupo.');
      return;
    }
    res.status(201).json({ message: 'Grupo criado com sucesso!', id: result.insertId });
  });
});
app.get('/group', (req, res) => {
  const query = 'SELECT idGroup, nome FROM group';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar grupos.');
      return;
    }
    res.json(results);
  });
});

app.get('/group/:idGroup', (req, res) => {
  const { idGroup } = req.params;
  const query = 'SELECT idGroup, nome FROM group WHERE idGroup = ?';
  db.query(query, [idGroup], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar grupo.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Grupo não encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/group/:idGroup', (req, res) => {
  const { idGroup } = req.params;
  const { nome, points } = req.body;
  const query = 'UPDATE group SET nome, points = ? WHERE idGroup = ?';
  db.query(query, [nome, points, idGroup], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar grupo.');
      return;
    }
    res.json({ message: 'Grupo atualizado com sucesso!' });
  });
});

app.delete('/group/:idGroup', (req, res) => {
  const { idGroup } = req.params;
  const query = 'DELETE FROM group WHERE idGroup = ?';
  db.query(query, [idGroup], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar grupo.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Grupo não encontrado.');
      return;
    }
    res.json({ message: 'Grupo deletado com sucesso!' });
  });
});

//match ----------------------------------------------------------------------------------------

app.post('/match', (req, res) => {
  const { idMaster, data_inicio, estado_partida } = req.body;
  const query = 'INSERT INTO match (idMaster, data_inicio, estado_partida) VALUES (?, ?, ?)';
  db.query(query, [idMaster, data_inicio, estado_partida], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar partida.');
      return;
    }
    res.status(201).json({ message: 'Partida criada com sucesso!', id: result.insertId });
  });
});
app.get('/match', (res) => {
  const query = 'SELECT m.idMatch, mt.nome AS master_name, m.data_inicio, m.estado_partida FROM match AS m LEFT JOIN Master AS mt ON m.idMaster = mt.idMaster';
  db.query(query, [estado_partida], (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar partidas.');
      return;
    }
    res.json(results);
  });
});

app.get('/match/:idMatch', (req, res) => {
  const { idMatch } = req.params;
  const query = 'SELECT m.idMatch, mt.nome AS master_name, m.data_inicio, m.estado_partida FROM match AS m LEFT JOIN Master AS mt ON m.idMaster = mt.idMaster WHERE m.idMatch = ?';
  db.query(query, [idMatch], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar partida.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Partida não encontrada.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/match/:idMatch', (req, res) => {
  const { idMatch } = req.params;
  const { idMaster, data_fim, estado_partida } = req.body;
  const query = 'UPDATE match SET idMaster = ?, data_fim = ?, estado_partida = ? WHERE idMatch = ?';
  db.query(query, [idMaster, data_fim, estado_partida, idMatch], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar partida.');
      return;
    }
    res.json({ message: 'Partida atualizada com sucesso!' });
  });
});

app.delete('/match/:idMatch', (req, res) => {
  const { idMatch } = req.params;
  const query = 'DELETE FROM match WHERE idMatch = ?';
  db.query(query, [idMatch], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar partida.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Partida não encontrada.');
      return;
    }
    res.json({ message: 'Partida deletada com sucesso!' });
  });
});

//match_group ----------------------------------------------------------------------------------------

app.post('/match_group', (req, res) => {
  const { idMatch, idGroup } = req.body;
  const query = 'INSERT INTO match_group (idMatch, idGroup) VALUES (?, ?)';
  db.query(query, [idMatch, idGroup], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar grupo.');
      return;
    }
    res.status(201).json({ message: 'Grupo criado com sucesso!', id: result.insertId });
  });
});
app.get('/match_group', (res) => {
  const query = 'SELECT mg.idMatchGroup, m.idMatch, m.data_inicio as match_start_date, m.estado_partida as match_status, m.data_fim as match_end_date, g.nome AS group_name, mg.pontuacao_match, mg.posicao_rank FROM match_group AS mg LEFT JOIN match AS m ON mg.idMatch = m.idMatch LEFT JOIN group AS g ON mg.idGroup = g.idGroup';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar grupos.');
      return;
    }
    res.json(results);
  });
});

app.get('/match_group/:idMatchGroup', (req, res) => {
  const { idMatchGroup } = req.params;
  const query = 'SELECT mg.idMatchGroup, m.idMatch, m.data_inicio as match_start_date, m.estado_partida as match_status, m.data_fim as match_end_date, g.nome AS group_name, mg.pontuacao_match, mg.posicao_rank FROM match_group AS mg LEFT JOIN match AS m ON mg.idMatch = m.idMatch LEFT JOIN group AS g ON mg.idGroup = g.idGroup WHERE mg.idMatchGroup = ?';
  db.query(query, [idMatchGroup], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar grupo.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Grupo não encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/match_group/:idMatchGroup', (req, res) => {
  const { idMatchGroup } = req.params;
  const { pontuacao_match, posicao_rank } = req.body;
  const query = 'UPDATE match_group SET pontuacao_match = ?, posicao_rank = ? WHERE idMatchGroup = ?';
  db.query(query, [pontuacao_match, posicao_rank, idMatchGroup], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar grupo.');
      return;
    }
    res.json({ message: 'Grupo atualizado com sucesso!' });
  });
});

app.delete('/match_group/:idMatchGroup', (req, res) => {
  const { idGroup } = req.params;
  const query = 'DELETE FROM match_group WHERE idGroup = ?';
  db.query(query, [idGroup], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar grupo.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Grupo não encontrado.');
      return;
    }
    res.json({ message: 'Grupo deletado com sucesso!' });
  });
});


//quests --------------------------------------------------------------------------------------------------

app.post('/quests', (req, res) => {
  const { idQuest, idFunction, text_quest, level } = req.body;
  const query = 'INSERT INTO quests (idQuest, idFunction, level, text_quest) VALUES (?, ?, ?, ?)';
  db.query(query, [idQuest, idFunction, level, text_quest], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar quest.');
      return;
    }
    res.status(201).json({ message: 'Quest criada com sucesso!', id: result.insertId });
  });
});
app.get('/quests', (req, res) => {
  const query = 'SELECT q.idQuest, f.title AS function_title, q.text_quest, q.level FROM quests AS q LEFT JOIN function AS f ON q.idFunction = f.idFunction';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar quests.');
      return;
    }
    res.json(results);
  });
});

app.get('/quests/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const query = 'SELECT q.idQuest, f.title AS function_title, q.text_quest, q.level FROM quests AS q LEFT JOIN function AS f ON q.idFunction = f.idFunction WHERE q.idQuest = ?';
  db.query(query, [idQuest], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar quest.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Quest não encontrada.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/quests/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const { idFunction, text_quest, level } = req.body;
  const query = 'UPDATE quests SET idFunction = ?, text_quest = ?, level = ? WHERE idQuest = ?';
  db.query(query, [idFunction, text_quest, level, idQuest], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar quest.');
      return;
    }
    res.json({ message: 'Quest atualizada com sucesso!' });
  });
});

app.delete('/quests/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const query = 'DELETE FROM quests WHERE idQuest = ?';
  db.query(query, [idQuest], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar quest.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Grupo não encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

//alternatives_quest --------------------------------------------------------------------------------------------------

app.post('/alternatives_quest', (req, res) => {
  const { idAlternatives, idQuest, text_alternative, isTrue } = req.body;
  const query = 'INSERT INTO alternatives_quest (idAlternatives, idQuest, text_alternative, isTrue) VALUES (?, ?, ?, ?)';
  db.query(query, [idAlternatives, idQuest, text_alternative, isTrue], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar alternativa.');
      return;
    }
    res.status(201).json({ message: 'Alternativa criada com sucesso!', id: result.insertId });
  });
});
app.get('/alternatives_quest', (req, res) => {
  const query = 'SELECT aq.idAlternatives, q.idQuest as quest_id, q.title as quest_title, aq.text_alternative, aq.isTrue, q.text_quest FROM alternatives_quest AS aq LEFT JOIN quests AS q ON aq.idQuest = q.idQuest';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar alternativas.');
      return;
    }
    res.json(results);
  });
});

app.get('/alternatives_quest/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const query = 'SELECT aq.idAlternatives, aq.idQuest, aq.text_alternative, aq.isTrue, q.text_quest FROM alternatives_quest AS aq LEFT JOIN quests AS q ON aq.idQuest = q.idQuest WHERE aq.idQuest = ?';
  db.query(query, [idQuest], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar alternativas.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Alternativas não encontradas.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/alternatives_quest/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const { idAlternatives, text_alternative, isTrue } = req.body;
  const query = 'UPDATE alternatives_quest SET idQuest = ?, text_alternative = ?, isTrue = ? WHERE idAlternatives = ?';
  db.query(query, [idQuest, text_alternative, isTrue, idAlternatives], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar alternativa.');
      return;
    }
    res.json({ message: 'Alternativa atualizada com sucesso!' });
  });
});

app.delete('/alternatives_quest/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const query = 'DELETE FROM alternatives_quest WHERE idQuest = ?';
  db.query(query, [idQuest], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar alternativa.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Alternativa não encontrada.');
      return;
    }
    res.json({ message: 'Alternativa deletada com sucesso!' });
  });
});

//Answers --------------------------------------------------------------------------------------------------

app.post('/answers', (req, res) => {
  const { idAnswers, idMatch, idQuest, idUser, idGroup, answers, isTrue, pontos_conquistados, timestamp } = req.body;
  const query = 'INSERT INTO answers (idAnswers, idMatch, idQuest, idUser, idGroup, answers, isTrue, pontos_conquistados, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [idAnswers, idMatch, idQuest, idUser, idGroup, answers, isTrue, pontos_conquistados, timestamp], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar resposta.');
      return;
    }
    res.status(201).json({ message: 'Resposta criada com sucesso!', id: result.insertId });
  });
});
app.get('/answers', (req, res) => {
  const query = 'SELECT aw.idAnswers, m.idMatch as match_id, q.idQuest as quest_id, q.title as quest_title, q.level as quest_level, q.text_quest as quest_text, u.idUser as user_id, u.name as user_name, g.idGroup as group_id, g.name as group_name, aw.answers, aw.isTrue, aw.pontos_conquistados, aw.timestamp FROM answers as aw left join match as m ON aw.idMatch = m.idMatch left join quests as q ON aw.idQuest = q.idQuest left join users as u ON aw.idUser = u.idUser left join group as g ON aw.idGroup = g.idGroup';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar respostas.');
      return;
    }
    res.json(results);
  });
});

app.get('/answers/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const query = 'SELECT aw.idAnswers, m.idMatch as match_id, q.idQuest as quest_id, q.title as quest_title, q.level as quest_level, q.text_quest as quest_text, u.idUser as user_id, u.name as user_name, g.idGroup as group_id, g.name as group_name, aw.answers, aw.isTrue, aw.pontos_conquistados, aw.timestamp FROM answers as aw left join match as m ON aw.idMatch = m.idMatch left join quests as q ON aw.idQuest = q.idQuest left join users as u ON aw.idUser = u.idUser left join group as g ON aw.idGroup = g.idGroup WHERE aw.idQuest = ?';
  db.query(query, [idQuest], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar respostas.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Respostas não encontradas.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/answers/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const { idAnswers, idMatch, idUser, idGroup, answers, isTrue, pontos_conquistados, timestamp } = req.body;
  const query = 'UPDATE answers SET idMatch = ?, idUser = ?, idGroup = ?, answers = ?, isTrue = ?, pontos_conquistados = ?, timestamp = ? WHERE idQuest = ?';
  db.query(query, [idMatch, idUser, idGroup, answers, isTrue, pontos_conquistados, timestamp, idQuest], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar resposta.');
      return;
    }
    res.json({ message: 'Resposta atualizada com sucesso!' });
  });
});

app.delete('/answers/:idQuest', (req, res) => {
  const { idQuest } = req.params;
  const query = 'DELETE FROM answers WHERE idQuest = ?';
  db.query(query, [idQuest], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar resposta.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Resposta não encontrada.');
      return;
    }
    res.json({ message: 'Resposta deletada com sucesso!' });
  });
});

//game_rule --------------------------------------------------------------------------------------------------

app.post('/game_rule', (req, res) => {
  const { idRule, title_rule, description } = req.body;
  const query = 'INSERT INTO game_rule (idRule, title_rule, description) VALUES (?, ?, ?)';
  db.query(query, [idRule, title_rule, description], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar regra de jogo.');
      return;
    }
    res.status(201).json({ message: 'Regra de jogo criada com sucesso!', id: result.insertId });
  });
});
app.get('/game_rule', (req, res) => {
  const query = 'SELECT idRule, title_rule, description FROM game_rule';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar regras de jogo.');
      return;
    }
    res.json(results);
  });
});

app.get('/game_rule/:idRule', (req, res) => {
  const { idRule } = req.params;
  const query = 'SELECT idRule, title_rule, description FROM game_rule WHERE idRule = ?';
  db.query(query, [idRule], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar regra de jogo.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Regra de jogo não encontrada.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/game_rule/:idRule', (req, res) => {
  const { idRule } = req.params;
  const { title_rule, description } = req.body;
  const query = 'UPDATE game_rule SET title_rule = ?, description = ? WHERE idRule = ?';
  db.query(query, [title_rule, description, idRule], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar regra de jogo.');
      return;
    }
    res.json({ message: 'Regra de jogo atualizada com sucesso!' });
  });
});

app.delete('/game_rule/:idRule', (req, res) => {
  const { idRule } = req.params;
  const query = 'DELETE FROM game_rule WHERE idRule = ?';
  db.query(query, [idRule], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar regra de jogo.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Regra de jogo não encontrada.');
      return;
    }
    res.json({ message: 'Regra de jogo deletada com sucesso!' });
  });
});

//game_card --------------------------------------------------------------------------------------------------

app.post('/game_card', (req, res) => {
  const { idCard, idFunction, idBonus } = req.body;
  const query = 'INSERT INTO game_card (idCard, idFunction, idBonus) VALUES (?, ?, ?)';
  db.query(query, [idCard, idFunction || null, idBonus || null], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar carta de jogo.');
      return;
    }
    res.status(201).json({ message: 'Carta de jogo criada com sucesso!', id: result.insertId });
  });
});
app.get('/game_card', (req, res) => {
  const query = 'SELECT gc.idCard, f.title AS function_title, f.description AS function_description, f.image AS function_image, b.title AS bonus_title, b.description AS bonus_description, b.image AS bonus_image FROM game_card AS gc LEFT JOIN function AS f ON gc.idFunction = f.idFunction LEFT JOIN bonus AS b ON gc.idBonus = b.idBonus';
  db.query(query, [idCard], (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar cartas de jogo.');
      return;
    }
    res.json(results);
  });
});

app.get('/game_card/:idCard', (req, res) => {
  const { idCard } = req.params;
  const query = 'SELECT gc.idCard, f.title AS function_title, f.description AS function_description, f.image AS function_image, b.title AS bonus_title, b.description AS bonus_description, b.image AS bonus_image FROM game_card AS gc LEFT JOIN function AS f ON gc.idFunction = f.idFunction LEFT JOIN bonus AS b ON gc.idBonus = b.idBonus WHERE gc.idCard = ?';
  
  db.query(query, [idCard], (err, results) => {
    if (err) {
       res.status(500).send('Erro ao buscar carta de jogo.');
       return;
      }
    if (results.length === 0) {
        res.status(404).send('Carta de jogo não encontrada.');
        return;
      }
      res.json(results[0]);
    });
});

app.put('/game_card/:idCard', (req, res) => {
  const { idCard } = req.params;
  const { idFunction, idBonus } = req.body;
  const query = 'UPDATE game_card SET idFunction = ?, idBonus = ? WHERE idCard = ?';
  db.query(query, [idFunction || null, idBonus || null, idCard], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar carta de jogo.');
      return;
    }
    res.json({ message: 'Carta de jogo atualizada com sucesso!' });
  });
});

app.delete('/game_card/:idCard', (req, res) => {
  const { idCard } = req.params;
  const query = 'DELETE FROM game_card WHERE idCard = ?';
  db.query(query, [idCard], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar carta de jogo.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Carta de jogo não encontrada.');
      return;
    }
    res.json({ message: 'Carta de jogo deletada com sucesso!' });
  });
});

//Bonus --------------------------------------------------------------------------------------------------

app.post('/bonus', (req, res) => {
  const { idCard, title_card, description, image } = req.body;
  const query = 'INSERT INTO bonus (idBonus, title, description, image) VALUES (?, ?, ?, ?)';
  db.query(query, [idCard, title_card, description, image], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao criar de bônus.');
      return;
    }
    res.status(201).json({ message: 'Bônus criado com sucesso!', id: result.insertId });
  });
});
app.get('/bonus', (req, res) => {
  const query = 'SELECT idBonus, title, image, description FROM bonus';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro na query:', err);
      res.status(500).send('Erro no servidor ao buscar bônus.');
      return;
    }
    res.json(results);
  });
});

app.get('/bonus/:idBonus', (req, res) => {
  const { idBonus } = req.params;
  const query = 'SELECT idBonus, title, image, description FROM bonus WHERE idBonus = ?';
  db.query(query, [idBonus], (err, results) => {
    if (err) {
      res.status(500).send('Erro ao buscar bônus.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Bônus não encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/bonus/:idBonus', (req, res) => {
  const { idBonus } = req.params;
  const { title, description, image } = req.body;
  const query = 'UPDATE bonus SET title = ?, description = ?, image = ? WHERE idBonus = ?';
  db.query(query, [title, description, image, idBonus], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar bônus.');
      return;
    }
    res.json({ message: 'Bônus atualizado com sucesso!' });
  });
});

app.delete('/bonus/:idBonus', (req, res) => {
  const { idBonus } = req.params;
  const query = 'DELETE FROM bonus WHERE idBonus = ?';
  db.query(query, [idBonus], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao deletar bônus.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Bônus não encontrado.');
      return;
    }
    res.json({ message: 'Bônus deletado com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});