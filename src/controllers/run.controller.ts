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
    // validate request contains '.'
    const [data, signature] = request.split('.');
    const runScore:RunScore = JSON.parse(CryptoHelper.decryptData(data));

    try {
      const runner = await this.fetchValidatedRunner(runScore.name, request, signature);
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
    // validate request contains '.'
    const [data, signature] = request.split('.');
    const runStat:RunStat = JSON.parse(CryptoHelper.decryptData(data));

    try {
      const runner = await this.fetchValidatedRunner(runStat.name, request, signature);
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
        message: `Error retrieving stat for name=${runStat.name}. Error: ${err}`,
      });
    }
  }

  
  private async fetchValidatedRunner(name: string, request: string, signature: string) {
    const runners:Runner[] = await runService.retrieveRunners(name);
    for(const runner of runners) {
      if (CryptoHelper.validateEncyptedData(runner.publicKey, request, signature)) {
        return runner;
      }
    }
    return null;
  }

}
