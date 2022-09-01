import { Schema } from 'mongoose';

export const HitsSchema = new Schema({
  created_at: String,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: Number,
  story_title: String,
  story_url: String,
  parent_id: Number,
  created_at_i: Number,
  _tags: Array<string>,
  objectID: String,
  _highlightResult: Object,
});
