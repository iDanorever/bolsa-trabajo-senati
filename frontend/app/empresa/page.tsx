"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Empresa {
  id: number;
  razon_social: string;
  direccion: string;
  correo: string;
  telefono: string;
  fecha_inicio: string;
}

export default function EmpresaPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/empresas");
        const data = await res.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error al cargar empresas:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchEmpresas();
  }, []);

  // Empresa actual (la más reciente)
  const empresaActual = empresas.length > 0 ? empresas[0] : null;
  // Empresas previas (las demás)
  const empresasPrevias = empresas.slice(1);

  if (cargando) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-gray-500">Cargando empresas...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Información de Empresa</h1>

      {/* Empresa Actual */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Empresa Actual</CardTitle>
          <p className="text-sm text-gray-600">
            Información de la empresa donde realizas prácticas actualmente
          </p>
        </CardHeader>
        <CardContent>
          {empresaActual ? (
            <div>
              <h3 className="text-xl font-semibold">{empresaActual.razon_social}</h3>
              <p className="text-gray-600">{empresaActual.direccion}</p>
              <p className="text-gray-600">{empresaActual.correo}</p>
              <p className="text-gray-600">{empresaActual.telefono}</p>
              <p className="text-sm text-gray-500 mt-2">
                Inicio: {new Date(empresaActual.fecha_inicio).toLocaleDateString("es-ES")}
              </p>
              <div className="mt-4 flex gap-2">
                <Badge>Activo</Badge>
                <Button variant="outline" size="sm">Ver más</Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No hay empresa registrada</p>
          )}
        </CardContent>
      </Card>

      {/* Empresas Previas */}
      <Card>
        <CardHeader>
          <CardTitle>Empresas Previas</CardTitle>
          <p className="text-sm text-gray-600">
            Historial de empresas donde realizaste prácticas anteriores
          </p>
        </CardHeader>
        <CardContent>
          {empresasPrevias.length > 0 ? (
            <div className="space-y-4">
              {empresasPrevias.map((empresa) => (
                <div
                  key={empresa.id}
                  className="border-b pb-3 last:border-0 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{empresa.razon_social}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(empresa.fecha_inicio).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Continuar práctica
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay empresas previas</p>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Link href="/registrar-empresa">
          <Button>Registrar nueva empresa</Button>
        </Link>
      </div>
    </div>
  );
}