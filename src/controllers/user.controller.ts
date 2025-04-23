import { Request, Response } from "express";
import client from "../server";
import { users } from "../../generated/prisma";
import generatePassword from "../utils/password-generator";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const users = await client.users.findMany({
      skip: offset,
      take: limit,
    });
    if(!users.length){
      res.status(204).send()
    }
    res.status(200).json({ data: users });
  } catch (e) {
    console.error("Failed to fetch users:", e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const user = await client.users.findFirst({where:{id: id}})
        if(!user){
            res.status(400).json({err: `User with id '${id}' not found`});
        }
        res.status(200).json({data:user});
      } catch (e) {
        console.error("Failed to fetch user", e)
        res.status(500).json({ error: "Failed to fetch users" });
      }
}

export const deleteUserById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const result = await client.users.delete({where: {id}});
        res.status(200).json({data:`user deleted with id '${result.id}'`});
      } catch (e) {
        console.error("Failed to delete user", e)
        res.status(500).json({ error: "Failed to delete user" });
      }
}

export const updateUserById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const data: Partial<users> = req.body;
        delete data.id;
        const result = await client.users.update({
            data: data,
            where: {id}
        });
        res.status(200).json({data:`user updated with id '${result.id}'`, user: result});
      } catch (e) {
        console.error("Failed to update user", e)
        res.status(500).json({ error: "Failed to update user" });
      }
}


export const createUser = async  (req: Request, res: Response) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
      res.status(400).json({"err":"invalid email or password"});
      return;
    }

    const hash =  await generatePassword(password);

    const result = await client.users.create({ data: {
      email,
      password: hash
    }});
    
    res.status(200).json({msg:`User created with id '${result.id}'`, category: result});
  }catch (e) {
    console.error("Failed to create user", e)
    res.status(500).json({ error: "Failed to create user" });
  }

}