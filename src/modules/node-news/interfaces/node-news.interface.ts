import { Document } from 'mongoose';

export interface NodeNews extends Document {
  id?: number;
  hits?: Array<object>;
  nbHits?: number;
  page?: number;
  nbPages?: number;
  hitsPerPage?: number;
  exhaustiveNbHits?: boolean;
  exhaustiveTypo?: boolean;
  exhaustive?: object;
  query?: string;
  params?: string;
  processingTimeMS?: number;
  processingTimingsMS?: object;
}
