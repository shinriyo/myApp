import { createAction, createAsyncAction } from "typesafe-actions";
import { Speaker } from "./types";

export const fetchSpeakers = createAsyncAction(
  "speakers/FETCH_REQUEST",
  "speakers/FETCH_SUCCESS",
  "speakers/FETCH_FAILURE"
)<void, Speaker[], Error>();

export const updateSpeakers = createAction("locations/UPDATE_SPEAKERS", resolve => () => resolve());
