import { OkPacket } from "mysql2";
import connection from "../db";

import Person from "../models/person.model";
import Runner from "../models/person.model";
import {RunStatType} from "../models/person.model";

class RunRepository {
  
  save(person: Person, publicKey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO lets_run (name, age, city, publickKey) VALUES(?,?,?,?)",
        [
          person.name,
          person.age,
          person.city,
          publicKey
        ],
        (err, res) => {
          if (err) reject(err);
          resolve(true);
        }
      );
    });
  }
  
  retrieveByName(name: string): Promise<Runner[]> {
    return new Promise((resolve, reject) => {
      connection.query<Runner[]>(
        "SELECT * FROM lets_run WHERE name = ?",
        [name],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  update(id: number, distance: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        'UPDATE lets_run SET total_distance_run = total_distance_run + ? WHERE id = ?', [distance, id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

  getRanking(runner: Runner, type: RunStatType): Promise<number> {
    return new Promise((resolve, reject) => {
        let query: any;
        let params;
        switch (type) {
            case RunStatType.city: 
                query = 'SELECT COUNT(*) AS ranking FROM users WHERE city = ? AND total_distance_run > (SELECT total_distance_run FROM users WHERE name = ?)';
                params = [runner.city, runner.name];
                break;
            case RunStatType.age:
                query = 'SELECT COUNT(*) AS ranking FROM users WHERE age = ? AND total_distance_run > (SELECT total_distance_run FROM users WHERE name = ?)';
                params = [runner.age, runner.name];
                break;
            case RunStatType.overall:
                query = 'SELECT COUNT(*) AS ranking FROM users WHERE total_distance_run > (SELECT total_distance_run FROM users WHERE name = ?)';
                params = [runner.name];
                break;
            default:
              reject('Invalid stat option');
        }

        connection.query(query, params, (err, res:any) => {
            if (err) reject(err);
            else resolve(res[0].ranking + 1); // or first or next after the best
        });
      });
    }

}

export default new RunRepository();