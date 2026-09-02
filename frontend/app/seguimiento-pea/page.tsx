"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Datos simulados (en un futuro vendrán del backend)
const modulos = [
  { nombre: "GESTORES DE ADMINISTRACIÓN WEB", progreso: 76 },
  { nombre: "Administra JSP", progreso: 17 },
  { nombre: "Administra Hibernate", progreso: 0 },
  { nombre: "SERVICIOS WEB", progreso: 7 },
  { nombre: "Administra JPA", progreso: 0 },
  { nombre: "Utilizar Servlets", progreso: 0 },
];

export default function SeguimientoPEAPage() {
  const progresoGeneral = 4;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Seguimiento del Plan Específico de Aprendizaje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Progreso General:</span>
            <Progress value={progresoGeneral} className="flex-1" />
            <Badge variant="outline">{progresoGeneral}% completado</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modulos.map((modulo, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{modulo.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Progress value={modulo.progreso} className="flex-1" />
                <span className="text-sm font-medium">{modulo.progreso}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}