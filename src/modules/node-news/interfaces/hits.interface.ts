import { Document } from 'mongoose';

export interface HitsNews extends Document {
  created_at?: string;
  title?: string;
  url?: string;
  author?: string;
  points?: number;
  story_text?: string;
  comment_text?: string;
  num_comments?: number;
  story_id?: number;
  story_title?: string;
  story_url?: string;
  parent_id?: number;
  created_at_i?: number;
  _tags?: Array<string>;
  objectID?: string;
  _highlightResult?: object;
}
