
import './App.css';
import { useState, useEffect } from 'react';
import Items from './Items.jsx'
function App() {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [criticalLimit, setCriticalLimit] = useState('')
  // const [itemList, setItemList] = useState([])
const [itemList, setItemList] = useState(() => {
  const stored = localStorage.getItem("itemList");
  return stored ? JSON.parse(stored).map(item => (
    {...item, quantity: Number(item.quantity), criticalLimit: Number(item.criticalLimit)})) : [];
});

  const [username, setUsername] = useState('')
  const [fmlName, setFmlName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [userList, setUserList] = useState([])

  const [editItemID, setEditItemID] = useState(null)
  const [editUserID, setEditUserID] = useState(null)

  const [criticalItemList, setCriticalItemList] = useState([])

  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));

    const criticalItemsFiltered = itemList.filter(item=>item.quantity <= item.criticalLimit)
    setCriticalItemList(criticalItemsFiltered)
  }, [itemList]);

  const flushItem = ()=>{
    setName('')
    setBrand('')
    setCategory('')
    setQuantity('')
    setCriticalLimit('')
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
    setCriticalLimit(item.criticalLimit)
  }
  const addEditItem = ()=>{
    if (!name.trim() || !brand.trim() || !category.trim() || quantity === '' || criticalLimit === '') return;

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
      <Items
        onName={name}
        onBrand={brand}
        onCategory={category}
        onQuantity={quantity}
        onCriticalLimit={criticalLimit}
        onSetName={setName}
        onSetBrand={setBrand}
        onSetCategory={setCategory}
        onSetQuantity={setQuantity}
        onSetCriticalLimit={setCriticalLimit}
        onAddEditItem={addEditItem}
        onEditItemID={editItemID}
        onItemList={itemList}
        onStartItemEditing={startItemEditing}
        onDeleteItem={deleteItem}
        onCriticalItemList={criticalItemList}
      />

    </div>
  );
}

export default App;
