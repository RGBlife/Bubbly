import supabase from "../utils/supabase.js";

export const createUser = async function (req, res) {
    console.log(res.body);
    const { data, error } = await supabase
        .from('users')
        .upsert({ 
            username: req.body.username,
            created_at: ((new Date()).toISOString()).toLocaleString()
        })
        .select();

    if (error) {
        res.sendStatus(500);
    } else {
        res.send(data[0]);
    }
};

export const searchUsers = async function (req, res) {
    let query = supabase
      .from('users')
      .select();

    if (req.query.q) {
        query = query.like('username', `%${req.query.q}%`);
    }

    query = query.neq('id', req.query.user_id)
    .limit(50);

    const { data, error } = await query;

    if (error) {
        res.sendStatus(500);
    } else {
        res.send(data);
    }
};
