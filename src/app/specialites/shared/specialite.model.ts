import { Tag } from '../../tag/shared/tag.model';
export class Specialite {
    constructor(public id: number,
                public label: string,
                public tags: Tag[]
            )
                 {
    }
  }