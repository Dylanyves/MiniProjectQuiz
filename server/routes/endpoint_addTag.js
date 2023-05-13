module.exports = async (req, res) => {
    const { quiz_id, text } = req.body.data;

    const addTag = "INSERT INTO tags (quiz_id, text) VALUES (?, ?)";
    connection.query(addTag, [quiz_id, text], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            const newTagId = result.insertId;
            const getTagQuery = "SELECT * FROM tags WHERE id = ?";
            connection.query(getTagQuery, [newTagId], (err, rows) => {
                if (err) {
                    res.json({ success: false, message: err.message });
                } else {
                    const newTag = rows[0];
                    res.json({
                        success: true,
                        message: "Tag has been added!",
                        newTag: newTag,
                    });
                }
            });
        }
    });
};
