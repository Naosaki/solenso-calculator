import type { MicroInverter, PanelInputs } from '../types';

const STC_TEMPERATURE = 25; // Standard Test Conditions temperature in °C

export function calculatePanelParameters(panel: PanelInputs) {
  // Calculate Vmax (maximum voltage at minimum temperature)
  const vmax = panel.voc + (panel.voc * (panel.tmin - STC_TEMPERATURE) * (panel.coef_voc / 100));

  // Calculate Vmin (minimum voltage at maximum temperature)
  const vmin = panel.voc + (panel.voc * (panel.tmax - STC_TEMPERATURE) * (panel.coef_voc / 100));

  // Calculate Vmpp_min (minimum VMPP at maximum temperature)
  const vmpp_min = panel.vmpp + (panel.vmpp * (panel.tmax - STC_TEMPERATURE) * (panel.coef_voc / 100));

  // Calculate Isc_max (maximum short circuit current at maximum temperature)
  const isc_max = panel.isc + (panel.isc * (panel.tmax - STC_TEMPERATURE) * (panel.coef_isc / 100));

  return {
    vmax,
    vmin,
    vmpp_min,
    isc_max
  };
}

// Type pour la fonction de traduction
export type TranslateFunction = (key: string) => string;

// Fonction utilitaire pour remplacer les variables dans les messages traduits
function formatTranslatedMessage(message: string, replacements: Record<string, string | number>): string {
  let formattedMessage = message;
  for (const [key, value] of Object.entries(replacements)) {
    formattedMessage = formattedMessage.replace(`{${key}}`, String(value));
  }
  return formattedMessage;
}

export function checkInverterCompatibility(
  panel: PanelInputs,
  inverter: MicroInverter,
  t?: TranslateFunction
): { compatible: boolean; reasons: string[] } {
  const { vmax, vmin, vmpp_min, isc_max } = calculatePanelParameters(panel);
  const reasons: string[] = [];

  // Fonction par défaut si aucune fonction de traduction n'est fournie
  const translate = t || ((key: string) => key);

  // Check voltage range compatibility
  if (vmin < inverter.vmin) {
    const message = translate('calculator.results.incompatibilityReasons.lowVoltage');
    reasons.push(formatTranslatedMessage(message, {
      value: vmin.toFixed(1),
      min: inverter.vmin
    }));
  }

  if (vmax > inverter.vmax) {
    const message = translate('calculator.results.incompatibilityReasons.highVoltage');
    reasons.push(formatTranslatedMessage(message, {
      value: vmax.toFixed(1),
      max: inverter.vmax
    }));
  }

  // Check VMPP range compatibility
  if (vmpp_min < inverter.vmpp_min) {
    const message = translate('calculator.results.incompatibilityReasons.lowVmpp');
    reasons.push(formatTranslatedMessage(message, {
      value: vmpp_min.toFixed(1),
      min: inverter.vmpp_min
    }));
  }

  // Check current compatibility
  if (isc_max > inverter.isc_max) {
    const message = translate('calculator.results.incompatibilityReasons.highCurrent');
    reasons.push(formatTranslatedMessage(message, {
      value: isc_max.toFixed(1),
      max: inverter.isc_max
    }));
  }

  return {
    compatible: reasons.length === 0,
    reasons
  };
}

export function filterCompatibleInverters(
  panel: PanelInputs,
  inverters: MicroInverter[],
  t?: TranslateFunction
): { compatible: MicroInverter[]; incompatible: Array<{ inverter: MicroInverter; reasons: string[] }> } {
  const compatible: MicroInverter[] = [];
  const incompatible: Array<{ inverter: MicroInverter; reasons: string[] }> = [];

  for (const inverter of inverters) {
    const { compatible: isCompatible, reasons } = checkInverterCompatibility(panel, inverter, t);
    if (isCompatible) {
      compatible.push(inverter);
    } else {
      incompatible.push({ inverter, reasons });
    }
  }

  return { compatible, incompatible };
}