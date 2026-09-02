"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Definir el tipo de una vacante
interface Vacante {
  id: number;
  titulo: string;
  empresa: string;
  descripcion: string;
  calificacion: number;
  dias: number;
}

export default function BolsaTrabajoPage() {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(0);
  const vacantesPorPagina = 3;

  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/vacantes");
        const data = await res.json();
        setVacantes(data);
      } catch (error) {
        console.error("Error al cargar vacantes:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchVacantes();
  }, []);

  // Calcular páginas
  const totalPaginas = Math.ceil(vacantes.length / vacantesPorPagina);
  const vacantesActuales = vacantes.slice(
    pagina * vacantesPorPagina,
    (pagina + 1) * vacantesPorPagina
  );

  if (cargando) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-gray-500">Cargando vacantes...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bolsa de Trabajo</h1>
        <Badge variant="secondary">{vacantes.length} vacantes disponibles</Badge>
      </div>

      {/* Lista de vacantes */}
      <div className="space-y-4">
        {vacantesActuales.map((vacante) => (
          <Card key={vacante.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{vacante.titulo}</CardTitle>
                  <p className="text-sm text-gray-600">{vacante.empresa}</p>
                </div>
                <Badge variant="outline">{vacante.dias} días</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{vacante.descripcion}</p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500">⭐ {vacante.calificacion}</span>
                <Button variant="outline" size="sm">Postular</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina(Math.max(0, pagina - 1))}
            disabled={pagina === 0}
          >
            Anterior
          </Button>
          <span className="px-4 py-2 text-sm">
            Página {pagina + 1} de {totalPaginas}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina(Math.min(totalPaginas - 1, pagina + 1))}
            disabled={pagina >= totalPaginas - 1}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
}