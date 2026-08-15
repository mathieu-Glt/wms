import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, firstname, email, password, role } = req.body;

      if (!name || !firstname || !email || !password) {
        return res.status(400).json({ error: "Champs manquants" });
      }

      const result = await authService.register({
        name,
        firstname,
        email,
        password,
        role,
      });

      return res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(400).json({ error: message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis" });
      }

      const result = await authService.login({ email, password });

      return res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(401).json({ error: message });
    }
  }
}
