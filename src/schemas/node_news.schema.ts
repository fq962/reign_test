import { Schema } from 'mongoose';

export const NewsSchema = new Schema({
  hits: Array<object>,
  nbHits: Number,
  page: Number,
  nbPages: Number,
  hitsPerPage: Number,
  exhaustiveNbHits: Boolean,
  exhaustiveTypo: Boolean,
  exhaustive: Object,
  query: String,
  params: String,
  processingTimeMS: Number,
  processingTimingsMS: Object,
});
