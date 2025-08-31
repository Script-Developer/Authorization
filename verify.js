// Roblox key verification API

function generateRandomKey() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    function randomGroup(len) {
        let str = "";
        for (let i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    }

    const group1 = randomGroup(4);
    const group2 = randomGroup(5);
    const group3 = randomGroup(5);
    const group4 = randomGroup(4);

    return `${group1}-${group2}-${group3}-${group4}`;
}

// Store keys in memory (resets on redeploy)
const validKeys = [];

export default function handler(req, res) {
    const { action, key } = req.query;

    // Generate a new key
    if (action === "getKey") {
        const newKey = generateRandomKey();
        validKeys.push(newKey);
        return res.status(200).json({ key: newKey });
    }

    // Verify a key
    if (key && validKeys.includes(key)) {
        // Optional: remove key after use
        const index = validKeys.indexOf(key);
        if (index > -1) validKeys.splice(index, 1);

        return res.status(200).json({ status: "valid" });
    }

    return res.status(200).json({ status: "invalid" });
}