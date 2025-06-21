// sqlService.js
const sql = require('mssql');
const config = require('./sqlConfig');

async function querySQLServer(queryString, params = []) {
  try {
    let pool = await sql.connect(config);
    let request = pool.request();

    // Bind parameters by name and value
    params.forEach(param => {
      request.input(param.name, param.value);
    });

    let result = await request.query(queryString);
    return result.recordset;
  } catch (err) {
    console.error('SQL Server Error:', err);
    throw err;
  }
}

module.exports = { querySQLServer };
