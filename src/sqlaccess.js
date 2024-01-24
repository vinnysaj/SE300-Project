const { Client } = require('pg')
const client = new Client({
  user: 'se300',
  host: '10.6.0.1',
  database: 'se300database',
  password: 'se300',
  port: 5432,
})
client.connect(function(err) {
  if (err){
    throw err;
    console.log(err);
  } 
  console.log("Connected!");
  sqlQuery();
});

async function sqlQuery() {
    const query = {
        text: 'SELECT * FROM Users',
      }
       
    const res = await client.query(query)
    
    for(let i = 0; i < res.rowCount; i++) {
        console.log(res.rows[i]);
    }
}
