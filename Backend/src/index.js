const express = require('express'); 
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos (ex: /:id)
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * Usando Driver: SELECT * FROM users
 * Usando Query Builder: table('users).select('*').where()
 *      a segunda o opção, em javascript, permite a reutilização do codigo independente
 *      do banco de dados escolhido.
 */

app.listen(3333);