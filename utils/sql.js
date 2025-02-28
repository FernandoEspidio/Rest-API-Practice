import sql from "mssql"

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    //server: "127.0.0.1", --> agregué un parámetro de puerto porque no me dejaba conectarme por usuario hasta que puse el server
    //port: 65241,
    port: Number(process.env.DB_PORT),
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  };

  const sqlConnect = async() => {
    return await sql.connect(sqlConfig);
  };

  export {sqlConnect, sql};