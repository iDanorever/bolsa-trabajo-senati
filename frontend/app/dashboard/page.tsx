"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [vacantes, setVacantes] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [kpis, setKpis] = useState({
    satisfaccion: "85%",
    tiempoRespuesta: "12 min",
    llamadasColgadas: "4%",
    cumplimiento: 87,
    promedio: 19,
    tareasPendientes: 24,
    operacionesCompletadas: 5
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vacantesRes = await fetch("http://localhost:3000/api/vacantes");
        const vacantesData = await vacantesRes.json();
        setVacantes(vacantesData);

        const empresasRes = await fetch("http://localhost:3000/api/empresas");
        const empresasData = await empresasRes.json();
        setEmpresas(empresasData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Bienvenido Aprendiz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Calificación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{kpis.promedio}</p>
            <Badge className="mt-1">Excelente</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Avance PEA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{kpis.cumplimiento}%</p>
            <Progress value={kpis.cumplimiento} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{kpis.tareasPendientes}</p>
            <p className="text-sm text-gray-500">Pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Operaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{kpis.operacionesCompletadas}</p>
            <p className="text-sm text-gray-500">Completadas</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Vacantes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          {vacantes.length > 0 ? (
            <ul className="space-y-2">
              {vacantes.slice(0, 3).map((v: any) => (
                <li key={v.id} className="border-b pb-2 last:border-0">
                  <p className="font-medium">{v.titulo}</p>
                  <p className="text-sm text-gray-600">{v.empresa}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay vacantes</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Empresas Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          {empresas.length > 0 ? (
            <ul className="space-y-2">
              {empresas.slice(0, 3).map((e: any) => (
                <li key={e.id} className="border-b pb-2 last:border-0">
                  <p className="font-medium">{e.razon_social}</p>
                  <p className="text-sm text-gray-600">{e.direccion}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay empresas</p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-wrap gap-4">
        
  <Link href="/bolsa-trabajo">
    <Button>Ver todas las vacantes</Button>
  </Link>
  <Link href="/registrar-empresa">
    <Button variant="outline">Registrar Empresa</Button>
  </Link>
  <Link href="/empresa">
    <Button variant="outline">Mi Empresa</Button>
  </Link>
  <Link href="/seguimiento-pea">
    <Button variant="outline">Seguimiento PEA</Button>
  </Link>

</div>

    </div>
  );
}
