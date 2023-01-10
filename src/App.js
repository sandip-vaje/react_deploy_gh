import { useEffect, useState } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{

    const fetchItems = async ()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Error : ! Ops did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);

      }catch(err){
        setFetchError(err.message);
      }finally{
        setIsLoading(false);
      }
    }
    // (async ()=> await fetchItems());
    // (async () => await fetchItems())();
    // setTimeout(() => {
      fetchItems();
    // }, 2000);

    // localStorage.setItem('shoppinglist', []);
  },[]);

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
    const myItem = listItems.filter(item=> item.id ===id);

    const updateOption = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const result = await apiRequest(API_URL+"/"+id,updateOption);
    if(result) setFetchError(result); 
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {method:'DELETE'};
    const result = await apiRequest(API_URL+"/"+id,deleteOptions);
    if(result) setFetchError(result);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    const newEntry = { id: getNewItemId(), checked: false, item: newItem };
    let listItems = [...items, newEntry];
    setItems(listItems);
    const postOption = {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newEntry)
    };
    const result = await apiRequest(API_URL,postOption);
    if(result) setFetchError(result);
    setNewItem("");
  }

  const getNewItemId = () => items.length ? items[items.length - 1].id + 1 : 1;

  return (
    <div className="App">
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      
      <main>

      {isLoading && <p>Loading Items...</p>}

      {fetchError && <p style={{color:'red'}}>{fetchError}</p>}

      {!fetchError && !isLoading && <Content
        items={
          items.filter(item =>
            ((item.item).toLowerCase())
              .includes(search.toLowerCase())
          )
        }
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />}
      </main>
      <Footer itemCount={items.length} />
    </div>
  );
}

export default App;