/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as PlantService from "./plants.service";
import { Plant } from "./plant.interface";
import { WaterType } from "./waterType.enum";

/**
 * Router Definition
 */

export const plantsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET plants

plantsRouter.get("/", async (req: Request, res: Response) => {
    try {
        console.log("test")
      const plants: Plant[] = await PlantService.findAll();
  
      res.status(200).send(plants);
    } catch (e) {
        if(e instanceof Error){

      res.status(500).send(e.message);
        }
    }
  });
  
  // GET plants/:id
  
  plantsRouter.get("/byId/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const plant: Plant = await PlantService.find(id);
  
      if (plant) {
        return res.status(200).send(plant);
      }
  
      res.status(404).send("plant not found");
    } catch (e) {
        if(e instanceof Error){

      res.status(500).send(e.message);
        }
    }
  });
  
  // POST plants
  
  plantsRouter.post("/", async (req: Request, res: Response) => {
    try {
      const plant: Plant = req.body;
  
      const newPlant = await PlantService.create(plant);
  
      res.status(201).json(newPlant);
    } catch (e) {
        if(e instanceof Error){

      res.status(500).send(e.message);
        }
    }
  });

  //get all plants by waterType

  plantsRouter.get("/type", async (req: Request, res: Response) => {
    console.log("called get by waterType")

    try {

      const waterType = req.query.waterType as WaterType

        console.log(waterType)

      const plants = await PlantService.getAllPlantsByWaterType(waterType)
  
      res.status(200).json(plants);
    } catch(e) {
      if(e instanceof Error){

        res.status(500).send(e.message);
          }
    }
  });
  
  // PUT plants/:id
  
  plantsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const plantUpdate: Plant = req.body;
  
      const existingPlant: Plant = await PlantService.find(id);
  
      if (existingPlant) {
        const updatedPlant = await PlantService.update(id, plantUpdate);
        return res.status(200).json(updatedPlant);
      }

      const newPlant = await PlantService.create(plantUpdate);
  
      res.status(201).json(newPlant);
    } catch (e) {
        if(e instanceof Error){

      res.status(500).send(e.message);
        }
    }
  });

    // PUT  water plants plants/:id
  
    plantsRouter.put("/water/:id", async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id, 10);
      
        try {
          const wateredPlant = await PlantService.waterPlant(id)
          
          return res.status(200).json(wateredPlant);
            
        } catch (e) {
            if(e instanceof Error){
    
          res.status(500).send(e.message);
            }
        }
      });
  
  // DELETE plants/:id
  
  plantsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await PlantService.remove(id);
  
      res.sendStatus(204);
    } catch (e: unknown) {
        if(e instanceof Error){
            res.status(500).send(e.message);
        }
    }
  });