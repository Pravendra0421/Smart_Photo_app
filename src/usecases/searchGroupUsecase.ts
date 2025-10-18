import { ISearchRepository } from "../Repository/SearchGroupRepository.js";
import { GroupMemberShipEntity } from "../entity/GroupEntity.js";
export class SearchUsecase {
  constructor(private SearchRepository: ISearchRepository) {}
  async Search(query: string): Promise<GroupMemberShipEntity[]> {
    if (query == null) {
      throw new Error("Query is empty!");
    }
    const search = await this.SearchRepository.search(query);
    return search;
  }
}
