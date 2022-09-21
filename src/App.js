import './App.css';
import { useReducer, useState } from 'react';

function reducer(todos, action) {
  switch (action.type) {
    case 'add':
      return [...todos, newTodo(action.payload.name)];
    case 'complete':
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case 'delete':
      return todos.filter((todo) => todo.id !== action.payload.id);

    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Math.random(), name: name, complete: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    dispatch({ type: 'add', payload: { name: name } });
  };
  return (
    <div className="App">
      UseReducer
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter a name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </form>
      <div>
        {todos.map((todo) => {
          return (
            <div
              style={{ display: 'flex', justifyContent: 'center' }}
              key={todo.id}
            >
              <p
                style={{ color: todo.complete ? '#AAA' : 'black' }}
                id={todo.id}
              >
                {todo.name}
              </p>
              <p>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'complete',
                      payload: { id: todo.id },
                    })
                  }
                >
                  complete
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: 'delete', payload: { id: todo.id } })
                  }
                >
                  delete
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
