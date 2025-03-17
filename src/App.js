import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from 'react';
import "./App.css";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {

  const API_URL = 'http://localhost:3500/items';




  const [items, setItems] = useState([]);


  const [newItem,setNewItem] = useState('');

  const [search,setSearch] = useState("");

  const [fetchError,setFetchError]=useState(null);

  const [isLoading,setIsLoading]=useState(true);
  
  useEffect(()=>{
    const fetchItems=async()=>{
     try {
      const response=await fetch(API_URL);
      if(!response.ok){
        throw Error('Data not received');
        
      }
      const listItems=await response.json();

      setItems(listItems);
      setFetchError(null);
     } catch (error) {
     setFetchError(error.message);
     }
     finally{
      setIsLoading(false);
     }
    }


      (async()=> await fetchItems())()   
 
    
  },[])

  const addItem=async  (item)=>{
    const id=items.length?items[items.length-1].id+1:1;
    const addNewItem={id,checked:false,content:item}
    const listItems=[...items,addNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL,postOptions);
    if (result) {
      setFetchError(result);
    }
   
  }

  const handleChange = async (id) => {
    const listItems = items.map((item) => item.id == id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
   
    const myItem = listItems.find(item => item.id === id);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: myItem.checked }), // Ensure myItem is defined
    };
    
    const reqUrl = `${API_URL}/${id}`; // Ensure API_URL and id are defined
    
    try {
      const result = await apiRequest(reqUrl, updateOptions); // Assuming apiRequest returns error or null
      if (result) {
        setFetchError(result); // Update error state
      } else {
        setFetchError(null); // Clear error state on success
      }
    } catch (error) {
      console.error('Error making the API request:', error);
      setFetchError(error.message || 'An unexpected error occurred.');
    }    
    
  }

  const handleClick = async (id) => {
    const reqUrl = `${API_URL}/${id}`;
  
    const deleteOptions = {
      method: 'DELETE',
    };
  
    try {
      const result = await apiRequest(reqUrl, deleteOptions);
  
      if (!result) {
        // Update UI only after successful deletion
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setFetchError(null);
      } else {
        setFetchError(result);
      }
    } catch (error) {
      console.error('Error making the API request:', error);
      setFetchError(error.message || 'An unexpected error occurred.');
    }
  };
  

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!newItem){
      return;
    }
  addItem(newItem);
    setNewItem(''); 
  }


  return (
    <div className="App">
      <Header 
      title="To do list"
      />
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
        {isLoading && <p>{`Items loading...`}</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
     {!isLoading && !fetchError && <Content 
      items={items.filter((item)=> item.content.toLowerCase().includes(search.toLowerCase()))}
      handleClick={handleClick}
      handleChange={handleChange}
      />
     }
      </main>
      <Footer 
      length={items.length}
      />
    </div>
  );
}

export default App;
