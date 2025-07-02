
import './App.css';
import { useState, useEffect } from 'react';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore'
import {db} from './firebaseConfig.js'
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
  
  const [editItemID, setEditItemID] = useState(null)
  const [criticalItemList, setCriticalItemList] = useState([])

  // const [username, setUsername] = useState('')
  // const [fmlName, setFmlName] = useState('')
  // const [email, setEmail] = useState('')
  // const [role, setRole] = useState('')
  // const [userList, setUserList] = useState([])

  // const [editUserID, setEditUserID] = useState(null)
  useEffect(() => {
    const fetchItems = async () => {
      const firebaseCollection  = await getDocs(collection(db, "items"))
      const items = firebaseCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setItemList(items)  
      setCriticalItemList(items.filter(item => item.quantity <= item.criticalLimit))
    }

  fetchItems()
  }, [])

  useEffect(() => {

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

  // const flushUser = ()=>{
  //   setUsername('')
  //   setFmlName('')
  //   setEmail('')
  //   setRole('')
  //   setEditUserID(null)
  // }
  
  const startItemEditing = (item)=>{
    setEditItemID(item.id)
    setName(item.name)
    setBrand(item.brand)
    setCategory(item.category)
    setQuantity(item.quantity)
    setCriticalLimit(item.criticalLimit)
  }
  const addEditItem = async ()=>{
    if (!name.trim() || !brand.trim() || !category.trim() || quantity === '' || criticalLimit === '') return;

    if(editItemID === null){
      // Adding item
      
      const newItem = {
        name: name,
        brand:brand,
        category: category,
        quantity: Number(quantity),
        criticalLimit: Number(criticalLimit)
      }
      
      const addDocRef = await addDoc(collection(db, "items"), newItem)
      setItemList([...itemList, {...newItem, id: addDocRef.id}])
    }else{
      // Edit item
      const itemRef = doc(db, "items", editItemID)
        const updatedItem = {
                            name,
                            brand,
                            category,
                            quantity: Number(quantity),
                            criticalLimit: Number(criticalLimit),
                          }
      
      const updateData = await updateDoc(itemRef, updatedItem)
      setItemList(itemList.map(
        item=> item.id === editItemID 
        ? { ...updatedItem, id: editItemID } 
        : item
      ))
      }
      flushItem()
    }

  const deleteItem = (id)=>{

    const deleteDoc = (doc(db, "items", id))
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
