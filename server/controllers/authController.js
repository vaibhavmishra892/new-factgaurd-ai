
import User from '../models/User.js';

export const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;

        // Basic validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check availability
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const newUser = await User.create({
            email,
            password, // NOTE: In a production app, password hashing is mandatory.
            name: `${firstName} ${lastName}`,
            phone
        });

        console.log(`[AUTH] New user registered: ${email}`);

        // Return user info (excluding password)
        // Convert to object and delete password
        const userObj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({ user: userObj, token: "demo-jwt-token" });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        console.log(`[AUTH] User logged in: ${email}`);

        const userObj = user.toObject();
        delete userObj.password;

        res.json({ user: userObj, token: "demo-jwt-token" });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
