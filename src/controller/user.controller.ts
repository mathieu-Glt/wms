import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  async find(req: Request, res: Response) {
    try {
      const users = await userService.find();
      return res.status(200).json({
        msg: "Request successfully",
        ...users,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(500).json({ error: message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);
      return res.status(200).json({
        msg: "Request successfully",
        ...user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur";
      return res.status(404).json({ error: message });
    }
  }
}
