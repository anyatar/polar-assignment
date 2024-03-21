import { Request, Response } from "express";
import runService from "../services/run.service";
import Person from "../models/person.model";
import RunScore from "../models/person.model";
import Runner from "../models/person.model";
import RunStat from "../models/person.model";
import CryptoHelper from "../helpers/cryptoHelper";

export default class RunController {

  async create(req: Request, res: Response) {

    const { name, age, city } = req.body;

    if (!name || !age || !city) {
      res.status(400).send({
        message: "Missing data",
      });
      return;
    }

    try {
      const person:Person = req.body;
      const { publicKey, privateKey } = await CryptoHelper.getKeyPair();
      runService.save(person, publicKey);
      res.status(201).json({privateKey});
    } catch (err) {
      res.status(500).send({
        message: `Some error occurred in create runner: ${err}`,
      });
    }
  }
  
  async update(req: Request, res: Response) {

    const { request } = req.body;
    let [data, signature] = request.split('.');

    try {
      const runScore:RunScore = JSON.parse(RunController.base64_decode(data).toString());
      signature = RunController.base64_decode(signature);
      const runner = await RunController.fetchValidatedRunner(runScore.name, data, signature);
      if (runner) {
          const affectedRows = await runService.update(runner.id, runScore.distance);
          if (affectedRows == 1) {
            return res.status(200).json({totalDistanceRun: (runner.total_distance_run + runScore.distance)});
          }
      }
      console.log( 'Signature verification failed');
      return res.status(200).json({totalDistanceRun: -1});

    } catch (err) {
      res.status(500).send({
        message: `Error updating runner score ${err}`,
      });
    }
  }

  async myStats(req: Request, res: Response) {
    const { request } = req.body;
    const [data, signature] = request.split('.');

    try {
      const runStat:RunStat = JSON.parse(RunController.base64_decode(data).toString());
      const runner = await RunController.fetchValidatedRunner(runStat.name, data, signature);

      if (runner) {
        const ranking:number = await runService.getRanking(runner, runStat.type);
        if (ranking) {
          return res.status(200).json({ranking});
        }
        res.status(200).send({ranking: -1});
      } else {
        res.status(404).send({
          message: `Cannot find validated runner with name=${runStat.name}.`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving stat. Error: ${err}`,
      });
    }
  }

  
  static async fetchValidatedRunner(name: string, request: string, signature: string) {
    const runners:Runner[] = await runService.retrieveRunners(name);
    for(const runner of runners) {
      if (CryptoHelper.validateEncyptedData(runner.publicKey, request, signature)) {
        return runner;
      }
    }
    return null;
  }

  static base64_decode(data: any) {
    return Buffer.from(data, 'base64');
  }
}
