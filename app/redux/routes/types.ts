import { LatLng } from "react-native-maps";

export interface RouteProperty {
  name: string;
  valor: string;
}

export interface Route {
  name: string;
  coordinates: LatLng[];
  properties: RouteProperty[];
}

export interface RoutePropertyDef {
  name: string;
  required: boolean;
}

export interface RoutesState {
  savedRoutes: Route[]; 
}

export const SAVE_ROUTE = 'SAVE_ROUTE';

interface SaveRouteAction {
  type: typeof SAVE_ROUTE;
  payload: Route;
}

export type RoutesActionTypes = SaveRouteAction;