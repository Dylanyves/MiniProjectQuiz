module.exports = async (req, res) => {
    const { tag_id } = req.body;

    const deleteTag = "DELETE FROM tags WHERE id = ?";

    connection.query(deleteTag, [tag_id], (err, rows) => {
        if (err) {
            res.json({ success: false, message: err.message });
        } else {
            res.json({ success: true, message: "Tag has been deleted" });
        }
    });
};
