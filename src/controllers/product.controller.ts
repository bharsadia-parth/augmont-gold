import { parse } from "fast-csv";
import { products } from "../../generated/prisma";
import { json2csv } from "json-2-csv";
import client from "../server";
import { Request, Response } from "express";
import fs from "fs";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const products = await client.products.findMany({
      skip: offset,
      take: limit,
    });
    if (!products.length) {
      res.status(204).send();
    }
    res.status(200).json({ data: products });
  } catch (e) {
    console.error("Failed to fetch products:", e);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) ?? 0;
    const product = await client.products.findFirst({ where: { id: id } });
    if (!product) {
      res.status(400).json({ err: `Product with id '${id}' not found` });
    }
    res.status(200).json({ data: product });
  } catch (e) {
    console.error("Failed to fetch Product", e);
    res.status(500).json({ error: "Failed to fetch Product" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) ?? 0;
    const result = await client.products.delete({ where: { id } });
    res.status(200).json({ data: `Product deleted with id '${result.id}'` });
  } catch (e) {
    console.error("Failed to delete Product", e);
    res.status(500).json({ error: "Failed to delete Product" });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) ?? 0;
    const data: Partial<products> = req.body;
    delete data.id;
    const result = await client.products.update({
      data: data,
      where: { id },
    });
    res
      .status(200)
      .json({
        data: `products updated with id '${result.id}'`,
        products: result,
      });
  } catch (e) {
    console.error("Failed to update products", e);
    res.status(500).json({ error: "Failed to update products" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, image, price, category_id } = req.body;
    if (!name || !image || !price || !category_id) {
      res
        .status(400)
        .json({
          err: "All fields (name, image, price, category_id) are required",
        });
      return;
    }
    const result = await client.products.create({
      data: {
        name,
        image,
        category_id,
        price,
      },
    });
    res
      .status(200)
      .json({ msg: `Product created with id '${result.id}'`, product: result });
  } catch (e) {
    console.error("Failed to create Product", e);
    res.status(500).json({ error: "Failed to create Product" });
  }
};

export const bulkUploadProducts = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send("File not found");
    return;
  }

  const fileRows: any[] = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(parse({ headers: true }))
    .on("error", (error) => {
      res.status(500).json({ message: error.message });
      return;
    })
    .on("data", (row) => {
      fileRows.push({
        name: row.name,
        image: row.image,
        price: parseFloat(row.price),
        category_id: parseInt(row.category_id),
      });
    })
    .on("end", async () => {
      try {
        await client.products.createMany({ data: fileRows });
        fs.unlinkSync(filePath);
        res.status(200).json({ message: "Products uploaded successfully" });
      } catch (error) {
        res.status(500).json({ message: "DB Insert Failed", error });
      }
    });
};

export const generateProductReport = async (req: Request, res: Response) => {
  try {
    console.log(req.url)
    const products = await client.products.findMany({});
    const fields = ["id", "name", "image", "price", "category_id"];

    // Convert JSON to CSV
    const csv = await json2csv(products, { keys: fields });

    // Set headers for CSV download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");

    // Send the CSV data
    res.send(csv);
  } catch (e) {
    console.error("Error generating product report", e);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
