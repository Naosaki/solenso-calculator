import React from 'react';

export function CalculationEngine() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Moteur de calcul
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Formules de calcul</h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-md font-medium mb-2">Tension maximale (Vmax)</h3>
            <code className="block bg-gray-50 p-4 rounded-md">
              Vmax = Voc + [Voc × (Tmin - TSTC) × coef_voc]
            </code>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-md font-medium mb-2">Tension minimale (Vmin)</h3>
            <code className="block bg-gray-50 p-4 rounded-md">
              Vmin = Voc + [Voc × (Tmax - TSTC) × coef_voc]
            </code>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-md font-medium mb-2">Tension Vmpp minimale</h3>
            <code className="block bg-gray-50 p-4 rounded-md">
              Vmpp_min = Vmpp + [Vmpp × (Tmax - TSTC) × coef_voc]
            </code>
          </div>
          
          <div>
            <h3 className="text-md font-medium mb-2">Courant maximal (Isc_max)</h3>
            <code className="block bg-gray-50 p-4 rounded-md">
              Isc_max = Isc + [Isc × (Tmax - TSTC) × coef_isc]
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}