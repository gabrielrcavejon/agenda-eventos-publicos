import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const gerarToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });
};

export const verificarToken = (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return null;
	}
};
