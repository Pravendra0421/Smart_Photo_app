import { GroupMemberShipEntity } from "../entity/GroupEntity.js";
import prisma from "../../lib/prisma.js";
export interface ISearchRepository {
  search(quesry: string): Promise<GroupMemberShipEntity[]>;
}
export class SearchRepository implements ISearchRepository {
  async search(quesry: string): Promise<GroupMemberShipEntity[]> {
    const search = await prisma.groupMembership.findMany({
      where: {
        group: {
          name: {
            contains: quesry,
            mode: "insensitive",
          },
        },
      },
      include: {
        group: true,
        user: true,
      },
    });
    return search;
  }
}
