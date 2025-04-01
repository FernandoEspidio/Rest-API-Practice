import {sqlConnect, sql} from "../utils/sql.js"
import crypto from 'crypto';
import { hashPassword, verifyPassword } from '../utils/cryptoUtils.js';

export const login = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM users WHERE username=@username");

        if (data.recordset.length > 0) {
            
            const hashedPassword = data.recordset[0].password;

            const isLogin = verifyPassword(hashedPassword, req.body.password);

            //const isLogin = data.recordset[0].password === req.body.passwsord;

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

    const hashedPassword = hashPassword(req.body.password);

    const data = await pool.request()
        .input("name", sql.VarChar, req.body.name)
        .input("username", sql.VarChar, req.body.username)
        .input("password", sql.VarChar, hashedPassword)

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

    let hashedPassword = req.body.password;

    if (req.body.password) {
        hashedPassword = hashPassword(req.body.password);
    }

    const data = await pool.request()
        .input("myId", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.name)
        .input("username", sql.VarChar, req.body.username)
        .input("password", sql.VarChar, hashedPassword)
        .query("update users set name=@name, username=@username, password=@password where id=@myId");

    //console.log(data.recordset);
    res.status(200).json({operation:true});
};
