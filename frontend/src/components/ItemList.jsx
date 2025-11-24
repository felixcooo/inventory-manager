export default function ItemList({ items, updateItem, deleteItem }) {
    return (
        <div className="item-list">
            {items.map((item) => (
                <div key={item.id} className="item-card">
                    <h3>{item.name}</h3>
                    <p>Condition: {item.condition}</p>
                    <p>Price: ${item.price}</p>
                    <p>Stock: {item.stock}</p>

                    <div className="buttons">
                        <button onClick={() => updateItem(item.id, { ...item, stock: item.stock + 1 })}>
                            + Stock
                        </button>

                        <button onClick={() => deleteItem(item.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
