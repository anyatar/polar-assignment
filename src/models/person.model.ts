import { RowDataPacket } from "mysql2"

export default interface Person {
  name: string;
  age: number;
  city: string;
}

export default interface RunScore {
  name: string;
  distance: number;
} 

export enum RunStatType {
  city = 'city',
  age = 'age',
  overall = 'overall'
}

export default interface RunStat {
  name: string;
  type: RunStatType;
} 

export default interface Runner extends RowDataPacket {
  name: string;
  age: number;
  city: string;
  total_distance_run: number;
  publicKey: string;
}

