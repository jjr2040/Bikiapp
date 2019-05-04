import { Route, SAVE_ROUTE } from "./types";

export function saveRoute(route: Route) {
  return {
    type: SAVE_ROUTE,
    payload: route
  }
}