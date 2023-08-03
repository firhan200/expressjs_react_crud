import connection from "../utils/db.js";
import util from "util"

// node native promisify
const query = util.promisify(connection.query).bind(connection);

export async function get(req, res){
    let queryData = ['SELECT * FROM users ORDER BY id DESC'];
    if(typeof req.params.id !== 'undefined'){
        const { id } = req.params;
        queryData = ['SELECT * FROM users WHERE id=?', [id]]
    }

    const users = await query(...queryData)
    return res.json({
        success: true,
        data: users
    });
}

export async function submit(req, res){
    const { full_name, email_address } = req.body;
    const user = await query('INSERT INTO users(full_name, email_address) VALUES (?, ?)', [full_name, email_address])
    res.json({
        success: true,
        data: user
    });
}

export async function update(req, res){
    const { id } = req.params;
    const { full_name, email_address } = req.body;

    //check if exist
    const user = await query('SELECT * FROM users WHERE id=?', [id]);
    const userJson = JSON.parse(JSON.stringify(user));
    if(userJson.length < 1){
        return res.json({
            success: false,
            error: 'user not found'
        });
    }

    //exist, then update
    const updatedUser = await query('UPDATE users SET full_name=?, email_address=? WHERE id=?', [full_name, email_address, id])
    return res.json({
        success: true,
    });
}

export async function remove(req, res){
    const { id } = req.params;

    //check if exist
    const user = await query('SELECT * FROM users WHERE id=?', [id]);
    const userJson = JSON.parse(JSON.stringify(user));
    if(userJson.length < 1){
        return res.json({
            success: false,
            error: 'user not found'
        });
    }

    //exist, then update
    const deletedUser = await query('DELETE FROM users WHERE id=?', [id])
    return res.json({
        success: true,
    })
}