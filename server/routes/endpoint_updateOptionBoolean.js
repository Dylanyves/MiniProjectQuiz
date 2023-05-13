module.exports = async (req, res) => {
    const { updated_option_id, old_option_id } = req.body.data;

    if (!old_option_id) {
        const updateOptionBoolean = `UPDATE options SET correct = 1 WHERE id = ${updated_option_id}`;
        connection.query(updateOptionBoolean, (err, rows) => {
            if (err) {
                res.json({ success: false, message: err.message });
            } else {
                const getUpdatedOptionQuery = `SELECT * FROM options WHERE id = ${updated_option_id}`;
                connection.query(getUpdatedOptionQuery, (err, result) => {
                    if (err) {
                        res.json({ success: false, message: err.message });
                    } else {
                        const updatedOption = result[0]; // Assuming only one row is updated

                        res.json({
                            success: true,
                            message: "Single option boolean has been updated",
                            updatedOption: updatedOption,
                        });
                    }
                });
            }
        });
    } else {
        const updateOptionBoolean = `
                UPDATE options
                SET correct =
                    CASE
                        WHEN id = ? THEN 1
                        WHEN id = ? THEN 0
                        ELSE correct
                    END
                WHERE id IN (?, ?)
                `;

        connection.query(
            updateOptionBoolean,
            [
                updated_option_id,
                old_option_id,
                updated_option_id,
                old_option_id,
            ],
            (err, rows) => {
                if (err) {
                    res.json({ success: false, message: err.message });
                } else {
                    res.json({
                        success: true,
                        message: "Multiple options boolean has been updated",
                        updated_option_id: updated_option_id,
                    });
                }
            }
        );
    }
};
