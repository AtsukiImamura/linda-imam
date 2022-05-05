import Axios from "axios";
import { IParkingData } from "../interface/ParkingData";

class ParkingStore {
  private _parkings: IParkingData[] = [];

  public getParkings(): Promise<IParkingData[]> {
    if (this._parkings.length > 0) {
      return Promise.resolve().then(() => this._parkings);
    }
    return this.importData().then(() => this._parkings);
  }

  constructor() {
    this.importData();
  }

  private importData(): Promise<void> {
    return Axios.get("./json/parking.json").then(res => {
      this._parkings = res.data as IParkingData[];
    });
  }
}

export default new ParkingStore();
