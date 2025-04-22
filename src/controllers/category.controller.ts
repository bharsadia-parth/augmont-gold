import { Request, Response } from "express";
import client from "../server";
import { categories } from "../../generated/prisma";


export const getCategories = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const categories = await client.categories.findMany({
      skip: offset,
      take: limit,
    });
    if(!categories.length){
      res.status(204).send()
    }
    res.status(200).json({ data: categories });
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const category = await client.categories.findFirst({where:{id: id}})
        if(!category){
            res.status(400).json({err: `Category with id '${id}' not found`});
        }
        res.status(200).json({data:category});
      } catch (e) {
        console.error("Failed to fetch category", e)
        res.status(500).json({ error: "Failed to fetch category" });
      }
}

export const deleteCategoryById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const result = await client.categories.delete({where: {id}});
        res.status(200).json({data:`category deleted with id '${result.id}'`});
      } catch (e) {
        console.error("Failed to delete category", e)
        res.status(500).json({ error: "Failed to delete category" });
      }
}

export const updateCategoryById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const data: Partial<categories> = req.body;
        delete data.id;
        const result = await client.categories.update({
            data: data,
            where: {id}
        });
        res.status(200).json({data:`category updated with id '${result.id}'`, category: result});
      } catch (e) {
        console.error("Failed to update category", e)
        res.status(500).json({ error: "Failed to update category" });
      }
}


export const createCategory = async  (req: Request, res: Response) => {
  try{
    const data: categories = req.body;
    const result = await client.categories.create({ data});
    res.status(200).json({msg:`Category created with id '${result.id}'`, category: result});
  }catch (e) {
    console.error("Failed to create category", e)
    res.status(500).json({ error: "Failed to create category" });
  }

}