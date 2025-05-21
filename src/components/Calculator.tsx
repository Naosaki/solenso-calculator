import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { filterCompatibleInverters, calculatePanelParameters } from '../lib/calculations';
import { FileText, AlertTriangle, CheckCircle2, HelpCircle, Loader2, Info, Download } from 'lucide-react';
import type { MicroInverter, PanelInputs } from '../types';
import { jsPDF } from 'jspdf';
import { useLanguage } from '../hooks/useLanguage';

const DEFAULT_PANEL_VALUES = {
  voc: 45.6,
  vmpp: 37.8,
  isc: 11.2,
  impp: 10.5,
  coef_voc: -0.29,
  coef_isc: 0.05,
  tmin: -10,
  tmax: 70
};

const FIELD_DESCRIPTIONS = {
  voc: "La tension en circuit ouvert (Voc) est la tension maximale que peut produire un panneau solaire lorsqu'il n'est connecté à aucune charge.",
  vmpp: "La tension au point de puissance maximale (Vmpp) est la tension optimale de fonctionnement du panneau solaire.",
  isc: "Le courant de court-circuit (Isc) est le courant maximal que peut produire un panneau solaire.",
  impp: "Le courant au point de puissance maximale (Impp) est le courant optimal de fonctionnement du panneau solaire.",
  coef_voc: "Le coefficient de température Voc indique la variation de la tension en circuit ouvert en fonction de la température (généralement négatif).",
  coef_isc: "Le coefficient de température Isc indique la variation du courant de court-circuit en fonction de la température (généralement positif).",
  tmin: "La température minimale de fonctionnement du panneau solaire en degrés Celsius.",
  tmax: "La température maximale de fonctionnement du panneau solaire en degrés Celsius."
};

export function Calculator() {
  const { t } = useLanguage();
  const [panelInputs, setPanelInputs] = useState<Partial<PanelInputs>>({});
  const [microInverters, setMicroInverters] = useState<MicroInverter[]>([]);
  const [results, setResults] = useState<{
    compatible: MicroInverter[];
    incompatible: Array<{ inverter: MicroInverter; reasons: string[] }>;
  } | null>(null);
  const [showExampleValues, setShowExampleValues] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<keyof PanelInputs | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof PanelInputs, string>>>({});

  useEffect(() => {
    const fetchMicroInverters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'microOnduleursSolenso'));
        const inverters = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as MicroInverter));
        setMicroInverters(inverters);
      } catch (error) {
        console.error('Error fetching inverters:', error);
      }
    };

    fetchMicroInverters();
  }, []);

  const parseDecimalInput = (value: string): number => {
    // Replace comma with dot for decimal parsing
    const normalizedValue = value.replace(',', '.');
    return parseFloat(normalizedValue);
  };

  const formatDecimalOutput = (value: number): string => {
    // Format number with comma as decimal separator
    return value.toString().replace('.', ',');
  };

  const validateField = (field: keyof PanelInputs, value: number): string | null => {
    if (isNaN(value)) {
      return t('calculator.validation.required');
    }

    switch (field) {
      case 'voc':
      case 'vmpp':
        if (value < 0) return t('calculator.validation.positiveVoltage');
        if (value > 1000) return t('calculator.validation.highVoltage');
        break;
      case 'isc':
      case 'impp':
        if (value < 0) return t('calculator.validation.positiveCurrent');
        if (value > 20) return t('calculator.validation.highCurrent');
        break;
      case 'coef_voc':
        if (value > 0) return t('calculator.validation.negativeCoefVoc');
        if (value < -2) return t('calculator.validation.lowCoefVoc');
        break;
      case 'coef_isc':
        if (value < 0) return t('calculator.validation.positiveCoefIsc');
        if (value > 2) return t('calculator.validation.highCoefIsc');
        break;
    }

    return null;
  };

  const handleInputChange = (field: keyof PanelInputs, value: string) => {
    // Allow empty string, minus sign, or valid decimal input (with dot or comma)
    if (value === '' || value === '-' || value === '0' || value === '0,' || value === '0.') {
      setPanelInputs(prev => ({
        ...prev,
        [field]: value
      }));
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field]; // Supprime complètement l'erreur au lieu de la mettre à undefined
        return newErrors;
      });
      return;
    }

    // Only allow numbers, one decimal separator (dot or comma), and minus sign
    if (!/^-?\d*[.,]?\d*$/.test(value)) {
      return;
    }

    const numValue = parseDecimalInput(value);
    setPanelInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    const error = validateField(field, numValue);
    setFormErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field]; // Supprime complètement l'erreur si la valeur est valide
      }
      return newErrors;
    });
    
    setResults(null);
  };

  const loadExampleValues = () => {
    // Format example values with commas
    const formattedValues = Object.entries(DEFAULT_PANEL_VALUES).reduce((acc, [key, value]) => {
      acc[key as keyof PanelInputs] = formatDecimalOutput(value);
      return acc;
    }, {} as Record<string, string>);

    setPanelInputs(formattedValues);
    setFormErrors({});
    setShowExampleValues(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PanelInputs, string>> = {};
    let isValid = true;

    // Vérifier que tous les champs requis sont présents
    const requiredFields: (keyof PanelInputs)[] = ['voc', 'vmpp', 'isc', 'impp', 'coef_voc', 'coef_isc'];
    for (const field of requiredFields) {
      if (!panelInputs[field]) {
        newErrors[field] = t('calculator.validation.required');
        isValid = false;
      }
    }

    // Si des champs sont manquants, ne pas continuer la validation
    if (!isValid) {
      setFormErrors(newErrors);
      return false;
    }

    // Convert all string values to numbers for validation
    const numericInputs = Object.entries(panelInputs).reduce((acc, [key, value]) => {
      acc[key as keyof PanelInputs] = typeof value === 'string' ? parseDecimalInput(value) : value;
      return acc;
    }, {} as Record<string, number>);

    // Valider chaque champ individuellement
    Object.entries(numericInputs).forEach(([field, value]) => {
      if (typeof value !== 'number' || isNaN(value)) {
        newErrors[field as keyof PanelInputs] = t('calculator.validation.required');
        isValid = false;
      } else {
        const error = validateField(field as keyof PanelInputs, value);
        if (error) {
          newErrors[field as keyof PanelInputs] = error;
          isValid = false;
        }
      }
    });

    // Additional cross-field validations
    if (numericInputs.voc && numericInputs.vmpp && numericInputs.voc <= numericInputs.vmpp) {
      newErrors.voc = t('calculator.validation.vocGreaterThanVmpp');
      newErrors.vmpp = t('calculator.validation.vmppLessThanVoc');
      isValid = false;
    }

    if (numericInputs.isc && numericInputs.impp && numericInputs.isc <= numericInputs.impp) {
      newErrors.isc = t('calculator.validation.iscGreaterThanImpp');
      newErrors.impp = t('calculator.validation.imppLessThanIsc');
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const calculateCompatibility = async () => {
    if (!validateForm()) return;
    
    setIsCalculating(true);
    try {
      // Convert string values to numbers and add default temperature values
      const numericInputs = Object.entries(panelInputs).reduce((acc, [key, value]) => {
        acc[key as keyof PanelInputs] = typeof value === 'string' ? parseDecimalInput(value) : value;
        return acc;
      }, {} as Record<string, number>);

      const panelInputsWithTemp = {
        ...numericInputs,
        tmin: -10,
        tmax: 70,
      } as PanelInputs;
      
      // Passer la fonction de traduction aux fonctions de calcul
      const results = filterCompatibleInverters(panelInputsWithTemp, microInverters, t);
      setResults(results);

      // Scroll to results
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error calculating compatibility:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const downloadPDF = () => {
    if (!results || !panelInputs || Object.keys(panelInputs).length < 6) return;

    const doc = new jsPDF();
    let yPos = 20;
    const lineHeight = 7;

    // Add title
    doc.setFontSize(16);
    doc.text(t('calculator.title'), 20, yPos);
    yPos += lineHeight * 2;

    // Add panel characteristics
    doc.setFontSize(12);
    doc.text(t('calculator.fields.title'), 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);

    const characteristics = [
      { label: 'Voc', value: parseDecimalInput(String(panelInputs.voc)), unit: 'V' },
      { label: 'Vmpp', value: parseDecimalInput(String(panelInputs.vmpp)), unit: 'V' },
      { label: 'Isc', value: parseDecimalInput(String(panelInputs.isc)), unit: 'A' },
      { label: 'Impp', value: parseDecimalInput(String(panelInputs.impp)), unit: 'A' },
      { label: t('calculator.fields.coef_voc'), value: parseDecimalInput(String(panelInputs.coef_voc)), unit: '%/°C' },
      { label: t('calculator.fields.coef_isc'), value: parseDecimalInput(String(panelInputs.coef_isc)), unit: '%/°C' }
    ];

    characteristics.forEach(({ label, value, unit }) => {
      doc.text(`${label}: ${value?.toFixed(2)}${unit}`, 30, yPos);
      yPos += lineHeight;
    });
    yPos += lineHeight;

    // Add calculated values
    const numericInputs = Object.entries(panelInputs).reduce((acc, [key, value]) => {
      acc[key as keyof PanelInputs] = typeof value === 'string' ? parseDecimalInput(value) : value;
      return acc;
    }, {} as Record<string, number>);

    const panelInputsWithTemp = {
      ...numericInputs,
      tmin: -10,
      tmax: 70
    } as PanelInputs;
    
    const calculated = calculatePanelParameters(panelInputsWithTemp);
    doc.setFontSize(12);
    doc.text(t('calculator.results.calculatedValues.title'), 20, yPos);
    yPos += lineHeight;
    doc.setFontSize(10);

    const calculatedValues = [
      { label: t('calculator.results.calculatedValues.vmax'), value: calculated.vmax.toFixed(1), unit: 'V' },
      { label: t('calculator.results.calculatedValues.vmin'), value: calculated.vmin.toFixed(1), unit: 'V' },
      { label: t('calculator.results.calculatedValues.vmpp_min'), value: calculated.vmpp_min.toFixed(1), unit: 'V' },
      { label: t('calculator.results.calculatedValues.isc_max'), value: calculated.isc_max.toFixed(1), unit: 'A' }
    ];

    calculatedValues.forEach(({ label, value, unit }) => {
      doc.text(`${label}: ${value}${unit}`, 30, yPos);
      yPos += lineHeight;
    });
    yPos += lineHeight;

    // Add compatible inverters
    if (results.compatible.length > 0) {
      doc.setFontSize(12);
      doc.text(`${t('calculator.results.compatible')} (${results.compatible.length})`, 20, yPos);
      yPos += lineHeight;
      doc.setFontSize(10);
      results.compatible.forEach(inverter => {
        doc.text(`• ${inverter.nom}`, 30, yPos);
        yPos += lineHeight;
        doc.text(`  Tension d'entrée: ${inverter.vmin}V - ${inverter.vmax}V`, 30, yPos);
        yPos += lineHeight;
        doc.text(`  VMPP minimale: ${inverter.vmpp_min}V`, 30, yPos);
        yPos += lineHeight;
        doc.text(`  Courant max (Isc): ${inverter.isc_max}A`, 30, yPos);
        yPos += lineHeight * 1.5;
      });
    }

    // Save the PDF
    doc.save('resultats-compatibilite-solenso.pdf');
  };

  const renderFieldTooltip = (field: keyof PanelInputs) => {
    if (activeTooltip !== field) return null;

    return (
      <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg">
        {FIELD_DESCRIPTIONS[field]}
      </div>
    );
  };

  const renderField = (field: keyof PanelInputs, label: string, unit: string) => (
    <div className="relative">
      <div className="flex justify-between items-start mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {t(`calculator.fields.${field}`)}
        </label>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600"
          onMouseEnter={() => setActiveTooltip(field)}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
      {renderFieldTooltip(field)}
      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={panelInputs[field] ?? ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full px-3 py-2 border rounded-md ${
            formErrors[field] 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          placeholder={`Ex: ${formatDecimalOutput(DEFAULT_PANEL_VALUES[field])}`}
        />
        <span className="absolute right-3 top-2 text-gray-400">
          {unit}
        </span>
      </div>
      {formErrors[field] && (
        <p className="mt-1 text-sm text-red-600">
          {typeof formErrors[field] === 'string' ? t(formErrors[field] as string) : formErrors[field]}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {t('calculator.title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('calculator.subtitle')}
        </p>
      </div>
      
      {!results && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {t('calculator.fields.title')}
            </h2>
            <button
              onClick={() => setShowExampleValues(true)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {t('calculator.example.title')}
            </button>
          </div>

          {showExampleValues && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">{t('calculator.example.title')}</h3>
              <p className="text-sm text-blue-800 mb-4">
                {t('calculator.example.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 mb-4">
                <div>
                  <strong>{t('calculator.example.voltages')}:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Voc = 45,6V</li>
                    <li>• Vmpp = 37,8V</li>
                  </ul>
                </div>
                <div>
                  <strong>{t('calculator.example.currents')}:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Isc = 11,2A</li>
                    <li>• Impp = 10,5A</li>
                  </ul>
                </div>
                <div>
                  <strong>{t('calculator.example.coefficients')}:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Voc = -0,29%/°C</li>
                    <li>• Isc = 0,05%/°C</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={loadExampleValues}
                className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors"
              >
                {t('calculator.example.useValues')}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('voc', t('calculator.fields.voc'), 'V')}
            {renderField('vmpp', t('calculator.fields.vmpp'), 'V')}
            {renderField('isc', t('calculator.fields.isc'), 'A')}
            {renderField('impp', t('calculator.fields.impp'), 'A')}
            {renderField('coef_voc', t('calculator.fields.coef_voc'), '%/°C')}
            {renderField('coef_isc', t('calculator.fields.coef_isc'), '%/°C')}
          </div>

          <button
            onClick={calculateCompatibility}
            disabled={isCalculating || Object.values(formErrors).some(error => error !== undefined)}
            className="mt-6 w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            {isCalculating ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                {t('calculator.calculating')}
              </>
            ) : (
              t('calculator.calculate')
            )}
          </button>
        </div>
      )}

      {results && (
        <div id="results" className="space-y-8">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setResults(null)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center"
            >
              ← {t('calculator.results.backToForm')}
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900"
            >
              <Download className="h-4 w-4 mr-2" />
              {t('calculator.results.downloadPdf')}
            </button>
          </div>

          {results.compatible.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold">
                  {t('calculator.results.compatible')} ({results.compatible.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.compatible.map((inverter) => (
                  <div
                    key={inverter.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={inverter.imageUrl}
                        alt={inverter.nom}
                        className="w-24 h-24 object-contain bg-white"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {inverter.nom}
                        </h3>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Tension d'entrée: {inverter.vmin}V - {inverter.vmax}V</p>
                          <p>VMPP minimale: {inverter.vmpp_min}V</p>
                          <p>Courant max (Isc): {inverter.isc_max}A</p>
                        </div>
                        <div className="mt-3 flex items-center space-x-4">
                          {inverter.ficheTechniqueUrl && (
                            <a
                              href={inverter.ficheTechniqueUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-800"
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              {t('calculator.results.technicalSheet')}
                            </a>
                          )}
                          <a
                            href={inverter.productUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-green-600 hover:text-green-800"
                          >
                            {t('calculator.results.viewProduct')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.incompatible.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold">
                  {t('calculator.results.incompatible')} ({results.incompatible.length})
                </h2>
              </div>

              <div className="space-y-6">
                {results.incompatible.map(({ inverter, reasons }) => (
                  <div
                    key={inverter.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={inverter.imageUrl}
                        alt={inverter.nom}
                        className="w-24 h-24 object-contain grayscale"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {inverter.nom}
                        </h3>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-red-600 mb-1">
                            {t('calculator.results.reasons')}
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {reasons.map((reason, index) => (
                              <li key={index}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.compatible.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-yellow-900 mb-2">
                {t('calculator.results.noResults.title')}
              </h3>
              <p className="text-yellow-700 mb-4">
                {t('calculator.results.noResults.description')}
              </p>
              <a
                href="mailto:contact@solenso.fr?subject=Vérification de compatibilité micro-onduleur"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
              >
                {t('calculator.results.noResults.contact')}
              </a>
            </div>
          )}

          {panelInputs && Object.keys(panelInputs).length >= 6 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t('calculator.results.calculatedValues.title')}
              </h3>
              {(() => {
                const numericInputs = Object.entries(panelInputs).reduce((acc, [key, value]) => {
                  acc[key as keyof PanelInputs] = typeof value === 'string' ? parseDecimalInput(value) : value;
                  return acc;
                }, {} as Record<string, number>);

                const calculated = calculatePanelParameters({
                  ...numericInputs,
                  tmin: -10,
                  tmax: 70
                } as PanelInputs);

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">{t('calculator.results.calculatedValues.vmax')}:</span>
                      <span className="ml-2">{formatDecimalOutput(String(calculated.vmax.toFixed(1)))}V</span>
                    </div>
                    <div>
                      <span className="font-medium">{t('calculator.results.calculatedValues.vmin')}:</span>
                      <span className="ml-2">{formatDecimalOutput(String(calculated.vmin.toFixed(1)))}V</span>
                    </div>
                    <div>
                      <span className="font-medium">{t('calculator.results.calculatedValues.vmpp_min')}:</span>
                      <span className="ml-2">{formatDecimalOutput(String(calculated.vmpp_min.toFixed(1)))}V</span>
                    </div>
                    <div>
                      <span className="font-medium">{t('calculator.results.calculatedValues.isc_max')}:</span>
                      <span className="ml-2">{formatDecimalOutput(String(calculated.isc_max.toFixed(1)))}A</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}