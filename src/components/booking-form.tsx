"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";



type BookingFormProps = {
  serviceName: string;
};

export default function BookingForm({ serviceName }: BookingFormProps) {
  const [location, setLocation] = useState<"mexico" | "usa" | "">("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // 👈 aquí el cambio

  const availableHours =
    location === "mexico"
      ? ["9:00 AM", "11:00 AM", "3:00 PM"]
      : location === "usa"
      ? ["10:00 AM", "2:00 PM", "6:00 PM"]
      : [];

  return (
    <form className="space-y-4">
      <h3 className="text-2xl font-semibold mb-4">Agenda tu cita</h3>

      <div>
        <Label>Nombre completo</Label>
        <Input placeholder="Tu nombre" required />
      </div>

      <div>
        <Label>Correo electrónico</Label>
        <Input type="email" placeholder="tu@correo.com" required />
      </div>

      <div>
        <Label>Sede</Label>
        <Select onValueChange={(val) => setLocation(val as "mexico" | "usa")}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una sede" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mexico">México</SelectItem>
            <SelectItem value="usa">USA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {location && (
        <>
          <div>
            <Label>Fecha disponible</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </div>

          {selectedDate && (
            <div>
              <Label>Hora disponible</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una hora" />
                </SelectTrigger>
                <SelectContent>
                  {availableHours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </>
      )}

      <div>
        <Label>Mensaje (opcional)</Label>
        <Textarea placeholder={`Quiero agendar una cita para ${serviceName}`} />
      </div>

      <Button type="submit" className="w-full">
        Enviar solicitud
      </Button>
    </form>
  );
}
