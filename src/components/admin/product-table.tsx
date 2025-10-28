"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductStore {
  id: number;
  active: boolean;
  price: number | null;
  store: { id: number; name: string; code: string };
  product: { id: number; name: string; description?: string; basePrice: number; imageUrl?: string;};
  
}

export default function ProductTable() {
  const [products, setProducts] = useState<ProductStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [createImageUrl, setCreateImageUrl] = useState<string>("");
  const [editOpen, setEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductStore | null>(null);
  const [editForm, setEditForm] = useState({
  name: "",
  description: "",
  basePrice: "",
  imageUrl: "",
});


  // Modal state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    storeOption: "mexico",
  });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/products${selectedStore ? `?store=${selectedStore}` : ""}`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedStore]);

  const toggleActive = async (id: number, active: boolean) => {
    const res = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });

    if (res.ok) {
      toast.success("Estado actualizado");
      fetchProducts();
    } else {
      toast.error("Error al actualizar");
    }
  };

  const handleEdit = (item: ProductStore) => {
  setEditingProduct(item);
  setEditForm({
    name: item.product.name,
    description: item.product.description || "",
    basePrice: String(item.product.basePrice),
    imageUrl: item.product.imageUrl || "",
  });
  setEditOpen(true);
};

const handleUpdate = async () => {
  if (!editingProduct) return;

  const res = await fetch("/api/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: editingProduct.product.id,
      name: editForm.name,
      description: editForm.description,
      basePrice: parseFloat(editForm.basePrice),
      imageUrl: editForm.imageUrl,
    }),
  });

  if (res.ok) {
    toast.success("Producto actualizado");
    setEditOpen(false);
    fetchProducts();
  } else {
    toast.error("Error al actualizar producto");
  }
};


const handleCreateImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });

  if (res.ok) {
    const data = await res.json();
    setCreateImageUrl(data.url);
    toast.success("Imagen subida correctamente");
  } else {
    toast.error("Error al subir la imagen");
  }

  setUploading(false);
};


const handleEditImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });

  if (res.ok) {
    const data = await res.json();
    setEditForm((prev) => ({ ...prev, imageUrl: data.url }));
    toast.success("Imagen actualizada correctamente");
  } else {
    toast.error("Error al subir la imagen");
  }
  setUploading(false);
};


  const handleCreate = async () => {
    const { name, description, basePrice, storeOption } = form;

    if (!name || !basePrice) {
      toast.warning("Por favor completa todos los campos obligatorios");
      return;
    }

    const stores =
      storeOption === "ambas" ? ["mexico", "usa"] : [storeOption];

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        basePrice: parseFloat(basePrice),
        stores,
        imageUrl: createImageUrl,
      }),
    });

    if (res.ok) {
      toast.success("Producto creado correctamente");
      setOpen(false);
      setForm({ name: "", description: "", basePrice: "", storeOption: "mexico" });
      fetchProducts();
    } else {
      toast.error("Error al crear producto");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  return (
    <div>
      {/* Filtro y acciones */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <div className="flex gap-2">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">Todas las tiendas</option>
            <option value="mexico">México</option>
            <option value="usa">USA</option>
          </select>
          <Button onClick={fetchProducts}>Refrescar</Button>

          {/* Modal trigger */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Nuevo producto</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear nuevo producto</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nombre del producto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Descripción del producto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="basePrice">Precio base *</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={form.basePrice}
                    onChange={(e) =>
                      setForm({ ...form, basePrice: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeOption">Tienda</Label>
                  <select
                    id="storeOption"
                    value={form.storeOption}
                    onChange={(e) =>
                      setForm({ ...form, storeOption: e.target.value })
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="mexico">México</option>
                    <option value="usa">USA</option>
                    <option value="ambas">Ambas</option>
                  </select>

                    <div className="grid gap-2">
                      <Label>Imagen del producto</Label>
                      <div className="flex items-center gap-2">
                        <Input type="file" accept="image/*" onChange={handleCreateImageUpload} />
                        {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
                      </div>

                      {createImageUrl ? (
                        <img
                          src={createImageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md mt-2 border"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-md border">
                          Sin imagen
                        </div>
                      )}
                    </div>

                </div>
              </div>
                <DialogFooter>
                  <Button onClick={handleCreate}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
              {/* Modal de edición */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Editar producto</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Nombre</Label>
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>

              <div className="grid gap-2">
                <Label>Descripción</Label>
                <Input
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Precio base</Label>
                <Input
                  type="number"
                  value={editForm.basePrice}
                  onChange={(e) => setEditForm({ ...editForm, basePrice: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Imagen</Label>
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={handleEditImageUpload} />
                  {uploading && <Loader2 className="w-5 h-5 animate-spin" />}
                </div>

                {editForm.imageUrl ? (
                  <img
                    src={editForm.imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md mt-2 border"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded-md border">
                    Sin imagen
                  </div>
                )}
               </div>
              </div>

                  <DialogFooter>
                    <Button onClick={handleUpdate}>Guardar cambios</Button>
                  </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Tienda</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio base</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
            <TableCell>Imagen</TableCell>
          </TableRow>
        </TableHeader>
       <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.product.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-500 text-xs rounded-md border">
                    Sin imagen
                  </div>
                )}
              </TableCell>

              <TableCell>{item.store.name}</TableCell>
              <TableCell>{item.product.name}</TableCell>
              <TableCell>{item.product.description}</TableCell>
              <TableCell>${item.product.basePrice.toFixed(2)}</TableCell>
              <TableCell>
                {item.active ? (
                  <Badge variant="default">Activo</Badge>
                ) : (
                  <Badge variant="destructive">Inactivo</Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleActive(item.id, !item.active)}
                >
                  {item.active ? "Desactivar" : "Activar"}
                </Button>
                <Button size="sm" onClick={() => handleEdit(item)}>
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      </Table>
    </div>
  );
}
