import {sqlConnect, sql} from "../utils/sql.js"

/*
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

    if(isLogin) {
        res.status(400).json({isLogin: isLogin, user: data.recordset[0]});
    }else {
        res.status(400).json({isLogin: isLogin, user: {}});
    }

};
*/

export const login = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM users WHERE username=@username");

        if (data.recordset.length > 0) {
            const isLogin = data.recordset[0].password === req.body.password;
            if (isLogin) {
                res.status(200).json({ isLogin: true, user: data.recordset[0] });
            } else {
                res.status(401).json({ isLogin: false, message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ isLogin: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Database connection or query error:', error);
        res.status(500).json({ isLogin: false, message: 'Server error' });
    }
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
