import supabase from "../utils/supabase.js";

export const getAllConversations = async function (req, res) {
    const participatingConversationIds = await supabase
        .from('user_conversation')
        .select('conversation_id')
        .eq('user_id', req.query.user_id);

    if (!participatingConversationIds.data?.length) {
        return res.send([]);
    }

    const conversations = await supabase
        .from('conversations')
        .select(`
            *, 
            messages (
                id,
                conversation_id,
                message,
                created_at,
                users (
                    id,
                    username
                )
            )
        `)
        .or(`owner_user_id.eq.${req.query.user_id},or(id.in.(${participatingConversationIds.data.map(item => item.conversation_id)}))`);

    return res.send(conversations.data);
};

export const createConversation = async function (req, res) {
    console.log(req.body);
    const {
      owner_id,
      participant_ids,
      group_name,
    } = req.body;

    const conversation = await supabase
      .from('conversations')
      .upsert({ 
        name: group_name,
        owner_user_id: owner_id,
        created_at: ((new Date()).toISOString()).toLocaleString()
       })
      .select();

    if (conversation.error) {
        res.sendStatus(500);
    }

    let participants = [];

    if (participant_ids.length > 1 && conversation.data?.length) {
        const pivotData = await supabase
            .from('user_conversation')
            .upsert(participant_ids.map((participant_id) => {
            return { 
                user_id: participant_id, 
                conversation_id: conversation.data[0].id
            };
            }))
            .select();

            if (pivotData.data?.length) {
                const actualParticipantUsers = await supabase
                    .from('users')
                    .select()
                    .in('id', participant_ids);

                if (actualParticipantUsers.data?.length) participants = actualParticipantUsers.data;
            }
    }


        const conv = {
            ...conversation.data[0],
            participants
        };

        return res.send(conv);
    
};
