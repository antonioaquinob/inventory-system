
import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [criticalLimit, setCriticaLimit] = useState('')
  const [itemList, setItemList] = useState([])

  const [username, setUsername] = useState('')
  const [fmlName, setFmlName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [userList, setUserList] = useState([])

  const [editItemID, setEditItemID] = useState(null)
  const [editUserID, setEditUserID] = useState(null)


  const [criticalItemList, setCriticalItemList] = useState([])
  useEffect(() => {
    const criticalItemsFiltered = itemList.filter(item=>item.quantity <= item.criticalLimit)

    setCriticalItemList(criticalItemsFiltered)
  }, [itemList]); // Runs whenever `items` is updated

  const flushItem = ()=>{
    setName('')
    setBrand('')
    setCategory('')
    setQuantity('')
    setCriticaLimit('')
    setEditItemID(null)
  }

  const flushUser = ()=>{
    setUsername('')
    setFmlName('')
    setEmail('')
    setRole('')
    setEditUserID(null)
  }
  
  const startItemEditing = (item)=>{
    setEditItemID(item.id)
    setName(item.name)
    setBrand(item.brand)
    setCategory(item.category)
    setQuantity(item.quantity)
    setCriticaLimit(item.criticalLimit)
  }
  const addEditItem = ()=>{
    if(name.trim() === null || brand.trim() === null || category.trim() === null || quantity === 0 || criticalLimit === 0) return;

    if(editItemID === null){
      // Adding item

      const newItem = {
        id: itemList.length === 0 ? 1 : itemList[itemList.length - 1].id + 1,
        name: name,
        brand:brand,
        category: category,
        quantity: Number(quantity),
        criticalLimit: Number(criticalLimit)
      }

      setItemList([...itemList, newItem])
    }else{
      // Edit item
      const updateItem = itemList.map(item => item.id === editItemID ? 
        {...item, name: name, brand: brand, category: category, quantity: Number(quantity), criticalLimit: Number(criticalLimit)} :
        item
      )

      setItemList(updateItem)
      }
      flushItem()
    }

  const deleteItem = (id)=>{
    const filterItem = itemList.filter(item=> item.id !== id)

    setItemList(filterItem)
  }
  return (
    <div className="App">
      <div>
        <input type="text" placeholder='Enter Item name...' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='Enter Item brand...' value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input type="text" placeholder='Enter Item category...' value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="number" placeholder='Enter Item quantity...' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <input type="number" placeholder='Enter Item critical limit...' value={criticalLimit} onChange={(e) => setCriticaLimit(e.target.value)} />

        <button onClick={addEditItem}>{editItemID === null ? 'Add' : 'Update'}</button>
      </div>

      {itemList.map(item=> (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.brand}</p>
          <p>{item.category}</p>
          <p>{item.quantity}</p>
          <p>{item.criticalLimit}</p>

          {editItemID === null && <button onClick={()=>startItemEditing(item)}>Edit</button>}
          <button onClick={()=>deleteItem(item.id)}>Delete</button>
        </div>
      ))}

      <div>
        <h1>Critical items</h1>
        {criticalItemList.length === 0 ? <h3>No critical item(s)</h3> :
        criticalItemList.map(item => (
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

export default App;
