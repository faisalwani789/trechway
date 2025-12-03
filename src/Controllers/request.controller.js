export const sendRequest = async (req, res) => {
    try {
        res.json(200).json({ success: true, message: 'connection request sent' })
    } catch (error) {
        res.json(500).json({ success: false, message: error.message })
    }
}