import { useRef } from "react";
import { FaPlus } from "react-icons/fa";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const addItemInputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit} style={{backgroundColor:newItem}}>
      <label htmlFor="addItem">
        Add Item
      </label>
      <input autoFocus
        id="addItem"
        ref={addItemInputRef}
        type='text'
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      <button type="submit" aria-label="Add Item" onClick={()=> addItemInputRef.current.focus()}> <FaPlus aria-label="Add New Item"/> </button>

    </form>
  )
}

export default AddItem