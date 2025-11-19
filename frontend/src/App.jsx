import { useEffect, useState } from "react";
import { getItems, addItem, updateItem, deleteItem } from "./api";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const res = await getItems();
    setItems(res.data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🎮 Inventory Manager</h1>

      <button onClick={loadItems}>Reload Items</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.condition} — ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

