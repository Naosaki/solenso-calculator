export interface MicroInverter {
  id: string;
  nom: string;
  vmin: number;
  vmax: number;
  vmpp_min: number;
  isc_max: number;
  productUrl: string;
  imageUrl: string;
  ficheTechniqueUrl?: string;
}

export interface PanelInputs {
  voc: number;
  vmpp: number;
  isc: number;
  impp: number;
  coef_voc: number;
  coef_isc: number;
  tmin: number;
  tmax: number;
}