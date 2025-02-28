import {sqlConnect, sql} from "../utils/sql.js"

export const login = async (req, res) => {
    const pool = await sqlConnect();

    const data = await pool
        .request()
        .input("username", sql.VarChar, req.body.username)
        .query("select * from users where username=@username")

    //console.log(data.recordset);
    if (data.recordset.length === 0) {
        return res.status(404).json({ isLogin: false, message: "Usuario no encontrado" });
    }
    
    let isLogin = data.recordset[0].password === req.body.password

    res.status(200).json({isLogin: isLogin});
};

export const signin = async (req, res) => {
    const pool = await sqlConnect();

    const data = await pool.request()
        .input("name", sql.VarChar, req.body.name)
        .input("username", sql.VarChar, req.body.username)
        .input("password", sql.VarChar, req.body.password)

        .query("insert into users (name, username, password) values (@name, @username, @password)");

    //console.log(data.recordset);
    res.status(200).json({operation:true});
};


export const getUsers = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().query("select * from users");

    //console.log(data.recordset);
    res.json(data.recordset);

};

export const getUser = async (req, res) => {
    const pool = await sqlConnect();

    const data = await pool.request()
        .input("myId", sql.Int, req.params.id)
        .query("select * from users where id = @myId");

    //console.log(data.recordset);
    res.json(data.recordset);

};

export const deleteUser = async (req, res) => {
    const pool = await sqlConnect();

    const data = await pool.request()
        .input("myId", sql.Int, req.params.id)
        .query("delete from users where id=@myId");

    //console.log(data.recordset);
    res.status(200).json({operation:true});
};

export const putUser = async (req, res) => {
    const pool = await sqlConnect();

    const data = await pool.request()
        .input("myId", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.name)
        .input("username", sql.VarChar, req.body.username)
        .input("password", sql.VarChar, req.body.password)
        .query("update users set name=@name, username=@username, password=@password where id=@myId");

    //console.log(data.recordset);
    res.status(200).json({operation:true});
};
