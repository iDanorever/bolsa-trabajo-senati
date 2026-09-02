"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function PerfilPage() {
  const [habilidades, setHabilidades] = useState<string[]>(["React", "Node.js", "TypeScript"]);
  const [nuevaHabilidad, setNuevaHabilidad] = useState("");

  const agregarHabilidad = () => {
    if (nuevaHabilidad.trim() && !habilidades.includes(nuevaHabilidad.trim())) {
      setHabilidades([...habilidades, nuevaHabilidad.trim()]);
      setNuevaHabilidad("");
    }
  };

  const eliminarHabilidad = (habilidad: string) => {
    setHabilidades(habilidades.filter(h => h !== habilidad));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Mi Perfil</h1>

      {/* Datos Personales */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input defaultValue="Daniel Marca" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="daniel@senati.pe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input defaultValue="+51 987 654 321" />
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card>
        <CardHeader>
          <CardTitle>Habilidades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {habilidades.map((hab) => (
              <Badge key={hab} variant="secondary" className="px-3 py-1 text-sm">
                {hab}
                <button
                  onClick={() => eliminarHabilidad(hab)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Nueva habilidad..."
              value={nuevaHabilidad}
              onChange={(e) => setNuevaHabilidad(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agregarHabilidad()}
            />
            <Button onClick={agregarHabilidad}>Agregar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}