import { WaterType } from "./waterType.enum";

export interface BasePlant {
  name: string;
  lastWatered: Date
  waterType: WaterType;
}

export interface Plant extends BasePlant {
  id: number
}
