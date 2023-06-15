const { error } = require("console");
const connection = require("../connection");
const queryString = require("querystring");

module.exports.findAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "SELECT * FROM todos";
  connection.query(sql, (error, rows) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ todos: rows }),
      });
    }
  });
};

module.exports.findOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "SELECT * FROM todos WHERE id = ?";
  connection.query(sql, [event.pathParameters.todo], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ todos: row }),
      });
    }
  });
};

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { todo } = queryString.parse(event["body"]);
  const sql = "INSERT INTO todos (todo) VALUES (?)";
  connection.query(sql, [todo], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          msg: `Todo added succesfully`,
          value: row.insertId,
        }),
      });
    }
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { todo } = queryString.parse(event["body"]);
  const sql = "UPDATE todos SET todo = ? WHERE ID = ?";
  connection.query(sql, [todo, event.pathParameters.todo], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          msg: `Todo updated succesfully`,
        }),
      });
    }
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "DELETE FROM todos WHERE ID = ?";
  connection.query(sql, [event.pathParameters.todo], (error, row) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          msg: `Todo deleted succesfully`,
        }),
      });
    }
  });
};
