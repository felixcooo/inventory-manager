import { useEffect, useState } from "react";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    model: "",
    condition: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const res = await getItems();
    setItems(res.data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    await addItem(form);
    setForm({ name: "", model: "", condition: "", price: "", stock: "" });
    loadItems();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🎮 Inventory Manager</h1>

      <h2>Add Item</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
        <input placeholder="Condition" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <button type="submit">Add Item</button>
      </form>

      <h2>Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.condition} — ${item.price} — Stock: {item.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
