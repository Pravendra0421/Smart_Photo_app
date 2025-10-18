import { SearchUsecase } from "../usecases/searchGroupUsecase.js";
import { SearchRepository } from "../Repository/SearchGroupRepository.js";
import { Request, Response } from "express";
const searchRepo = new SearchRepository();
const Searchusecase = new SearchUsecase(searchRepo);
export class SearchController {
  async Search(req: Request, res: Response) {
    try {
      const query = req.query.query;
      if (!query || typeof query !== "string") {
        return res.status(400).json({
          // 400 Bad Request is more appropriate here
          message: "A valid 'query' string parameter is required.",
        });
      }
      const search = await Searchusecase.Search(query);
      return res.status(201).json(search);
    } catch (error) {
      console.error("error during the search");
      return res.status(401).json({ message: "error during the search" });
    }
  }
}
