const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'koncert_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function koncertek() {
    const query = 'SELECT koncertek.id, koncertek.fellepo_nev, koncertek.datum, koncertek.jegy_ar, helyszinek.nev, helyszinek.varos FROM koncertek INNER JOIN helyszinek ON koncertek.helyszin_id = helyszinek.id;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function ujkoncert(fellepo_nev, datum, jegy_ar, helyszin_id) {
    const query = 'INSERT INTO koncertek (fellepo_nev, datum, jegy_ar, helyszin_id) VALUES (?,?,?,?);';
    const [rows] = await pool.execute(query);
    return rows;
}
async function koncertTorles(id) {
    const query = 'DELETE ROW FROM koncertek WHERE id LIKE (id);';
    const [rows] = await pool.execute(query, [id]);
    return rows;
}
async function helyszinek() {
    const query = 'SELECT * FROM helyszinek;';
    const [rows] = await pool.execute(query);
    return rows;
}
async function venuesSummary() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}
//!Export
module.exports = {
    selectall,
    koncertek,
    ujkoncert,
    koncertTorles,
    helyszinek
};
