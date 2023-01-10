import { useEffect, useState } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';


function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('redbit-list')) || []);

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");
  const [fetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    localStorage.setItem('redbit-list',JSON.stringify(items));
    setIsLoading(false);
  },[items]);

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    const newEntry = { id: getNewItemId(), checked: false, item: newItem };
    let listItems = [...items, newEntry];
    setItems(listItems);
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