import React from 'react';

export function Forms() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Gestion des formulaires
      </h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Champs du formulaire</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Tensions</h3>
              <ul className="space-y-2 text-sm">
                <li>• Voc (Tension en circuit ouvert)</li>
                <li>• Vmpp (Tension de fonctionnement optimal)</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Courants</h3>
              <ul className="space-y-2 text-sm">
                <li>• Isc (Courant de court-circuit)</li>
                <li>• Impp (Courant de fonctionnement optimal)</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Coefficients</h3>
              <ul className="space-y-2 text-sm">
                <li>• Coefficient Voc (%/°C)</li>
                <li>• Coefficient Isc (%/°C)</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Températures</h3>
              <ul className="space-y-2 text-sm">
                <li>• Température minimale (°C)</li>
                <li>• Température maximale (°C)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}