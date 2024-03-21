import { OkPacket } from "mysql2";
import connection from "../db";

import Person from "../models/person.model";
import Runner from "../models/person.model";
import {RunStatType} from "../models/person.model";

const USERS_TABLE = 'users';

class RunRepository {
  
  save(person: Person, publicKey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        `INSERT INTO ${USERS_TABLE} (name, age, city, publicKey) VALUES(?,?,?,?)`,
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
        `SELECT * FROM ${USERS_TABLE} WHERE name = ?`,
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
        `UPDATE ${USERS_TABLE} SET total_distance_run = total_distance_run + ? WHERE id = ?`, [distance, id],
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
                query = `SELECT COUNT(*) AS ranking FROM ${USERS_TABLE} WHERE city = ? AND total_distance_run > (SELECT total_distance_run FROM users WHERE name = ? and id = ?)`;
                params = [runner.city, runner.name, runner.id];
                break;
            case RunStatType.age:
                query = `SELECT COUNT(*) AS ranking FROM ${USERS_TABLE} WHERE age = ? AND total_distance_run > (SELECT total_distance_run FROM users WHERE name = ? and id = ?)`;
                params = [runner.age, runner.name, runner.id];
                break;
            case RunStatType.overall:
                query = `SELECT COUNT(*) AS ranking FROM ${USERS_TABLE} WHERE total_distance_run > (SELECT total_distance_run FROM users WHERE name = ? and id = ?)`;
                params = [runner.name, runner.id];
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
