/**
 * Data Model Interfaces
 */
import { Plant, BasePlant } from "./plant.interface";
import { Plants } from "./plants.interface";
import { WaterType } from "./waterType.enum";

/**
 * In-Memory Store
 */

let plants: Plants = {
  1: {
    id: 1,
    name: "Monstera",
    lastWatered: new Date(2023, 2, 6, 6, 0, 0, 0),
    waterType: WaterType.LOW
  },
  2: {
    id: 2,
    name: "Palm Tree",
    lastWatered: new Date(),
    waterType: WaterType.MID
  },
  3: {
    id: 3,
    name: "Orchid",
    lastWatered: new Date(),
    waterType: WaterType.LOW
  }
};


/**
 * Service Methods
 */

export const findAll = async (): Promise<Plant[]> => Object.values(plants);

export const find = async (id: number): Promise<Plant> => plants[id];

export const create = async (newPlant: BasePlant): Promise<Plant> => {
  const id = new Date().valueOf();

  plants[id] = {
    id,
    ...newPlant
  }

  return plants[id]
}

export const update = async (
  id: number,
  plantUpdate: BasePlant
): Promise<Plant | null> => {
  const plant = await find(id);

  if (!plant) {
    return null;
  }

  plants[id] = { id, ...plantUpdate };

  return plants[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const plant = await find(id);

  if (!plant) {
    return null;
  }

  delete plants[id];
};

export const waterPlant = async (id: number): Promise<Plant | null> => {
  const plant = await find(id)

  if (!plant) {
    return null;
  }

  plant.lastWatered = new Date()

  return plant
}

export const getAllPlantsByWaterType = async (waterType: WaterType): Promise<Plant[]> => {
  return Object.values(plants).filter(plant => plant.waterType === waterType)
}
