"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

type BookingFormProps = {
  serviceName: string;
};

export default function BookingForm({ serviceName }: BookingFormProps) {
  const [location, setLocation] = useState<"mexico" | "usa" | "">("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const availableHours =
    location === "mexico"
      ? ["9:00 AM", "11:00 AM", "3:00 PM"]
      : location === "usa"
      ? ["10:00 AM", "2:00 PM", "6:00 PM"]
      : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name || !email || !selectedDate || !location) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service: serviceName,
          date: selectedDate.toISOString(),
          message,
          storeCode: location,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar la solicitud");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setSelectedDate(undefined);
      setLocation("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold mb-4">Agenda tu cita</h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">
          Tu cita fue agendada correctamente.
        </p>
      )}

      <div>
        <Label>Nombre completo</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          required
        />
      </div>

      <div>
        <Label>Correo electrónico</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          required
        />
      </div>

      <div>
        <Label>Sede</Label>
        <Select
          value={location}
          onValueChange={(val) => setLocation(val as "mexico" | "usa")}
        >
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
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Quiero agendar una cita para ${serviceName}`}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Enviando..." : "Enviar solicitud"}
      </Button>
    </form>
  );
}
