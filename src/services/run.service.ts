import runRepository from "../repositories/run.repository";
import Person from "../models/person.model";
import RunScore from "../models/person.model";
import Runner from "../models/person.model";
import {RunStatType} from "../models/person.model";

class RunService {

  async save(person: Person, publicKey: string): Promise<boolean> {
    return await runRepository.save(person, publicKey);
  }

  async retrieveRunners(name: string): Promise<Runner[]> {
    return await runRepository.retrieveByName(name);
  }
  
  async update(id: number, distance: number): Promise<number> {
    return await runRepository.update(id, distance);
  }

  async getRanking(runner: Runner, type: RunStatType): Promise<number> {
    return await runRepository.getRanking(runner, type);
  }
}

export default new RunService();
