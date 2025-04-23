import { products } from "../../generated/prisma";
import client from "../server";
import { Request, Response } from "express";


export const getProducts = async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
  
      const products = await client.products.findMany({
        skip: offset,
        take: limit,
      });
      if(!products.length){
        res.status(204).send()
      }
      res.status(200).json({ data: products });
    } catch (e) {
      console.error("Failed to fetch products:", e);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };

export const getProductById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const product = await client.products.findFirst({where:{id: id}})
        if(!product){
            res.status(400).json({err: `Product with id '${id}' not found`});
        }
        res.status(200).json({data:product});
      } catch (e) {
        console.error("Failed to fetch Product", e)
        res.status(500).json({ error: "Failed to fetch Product" });
      }
}

export const deleteProductById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const result = await client.products.delete({where: {id}});
        res.status(200).json({data:`Product deleted with id '${result.id}'`});
      } catch (e) {
        console.error("Failed to delete Product", e)
        res.status(500).json({ error: "Failed to delete Product" });
      }
}

export const updateProductById = async  (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id) ?? 0;
        const data: Partial<products> = req.body;
        delete data.id;
        const result = await client.products.update({
            data: data,
            where: {id}
        });
        res.status(200).json({data:`products updated with id '${result.id}'`, products: result});
      } catch (e) {
        console.error("Failed to update products", e)
        res.status(500).json({ error: "Failed to update products" });
      }
}

export const createProduct = async  (req: Request, res: Response) => {
    try{
      const {name, image, price, category_id} = req.body;
      if (!name || !image || !price || !category_id) {
        res.status(400).json({ err: "All fields (name, image, price, category_id) are required" });
        return;
      }
      const result = await client.products.create({ data: {
        name,
        image,
        category_id,
        price
      }});
      res.status(200).json({msg:`Product created with id '${result.id}'`, product: result});
    }catch (e) {
      console.error("Failed to create Product", e)
      res.status(500).json({ error: "Failed to create Product" });
    }
  
  }