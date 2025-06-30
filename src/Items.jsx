function Items({
  onName,
  onBrand,
  onCategory,
  onQuantity,
  onCriticalLimit,
  onSetName,
  onSetBrand,
  onSetCategory,
  onSetQuantity,
  onSetCriticalLimit,
  onAddEditItem,
  onEditItemID,
  onItemList,
  onStartItemEditing,
  onDeleteItem,
  onCriticalItemList
    }) {

    return (
    <div className="App">
      <div>
        <input type="text" placeholder='Enter Item name...' value={onName} onChange={(e) => onSetName(e.target.value)} />
        <input type="text" placeholder='Enter Item brand...' value={onBrand} onChange={(e) => onSetBrand(e.target.value)} />
        <input type="text" placeholder='Enter Item category...' value={onCategory} onChange={(e) => onSetCategory(e.target.value)} />
        <input type="number" placeholder='Enter Item quantity...' value={onQuantity} onChange={(e) => onSetQuantity(e.target.value)} />
        <input type="number" placeholder='Enter Item critical limit...' value={onCriticalLimit} onChange={(e) => onSetCriticalLimit(e.target.value)} />

        <button onClick={onAddEditItem}>{onEditItemID === null ? 'Add' : 'Update'}</button>
      </div>

      {onItemList.map(item=> (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.brand}</p>
          <p>{item.category}</p>
          <p>{item.quantity}</p>
          <p>{item.criticalLimit}</p>

          {onEditItemID === null && <button onClick={()=>onStartItemEditing(item)}>Edit</button>}
          <button onClick={()=>onDeleteItem(item.id)}>Delete</button>
        </div>
      ))}
      
      <div>
        <h1>Critical items</h1>
        {onCriticalItemList.length === 0 ? <h3>No critical item(s)</h3> :
        onCriticalItemList.map(item => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.brand}</p>
            <p>{item.category}</p>
            <p>{item.quantity}</p>
            <p>{item.criticalLimit}</p>
          </div>
        ))
        }
      </div>
    </div>
  );
}


export default Items;