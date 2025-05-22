document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let searchText = '';
    
    // Render initial todos
    renderTodos();
    
    // Event Listeners
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Search functionality event listeners
    searchInput.addEventListener('input', handleSearchInput);
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Add todo function
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            const todo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            todos.push(todo);
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    }
    
    // Toggle todo completion
    function toggleTodo(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        
        saveTodos();
        renderTodos();
    }
    
    // Delete todo
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }
    
    // Render todos to the DOM
    function renderTodos() {
        todoList.innerHTML = '';
        
        // If we have a search term, filter the todos
        const filteredTodos = searchText 
            ? filterTodos(searchText, todos)
            : todos;
        
        // Create a document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.setAttribute('data-id', todo.id);
            if (todo.completed) {
                li.classList.add('completed');
            }
            
            const todoText = document.createElement('span');
            todoText.textContent = todo.text;
            todoText.addEventListener('click', () => toggleTodo(todo.id));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
            
            li.appendChild(todoText);
            li.appendChild(deleteBtn);
            fragment.appendChild(li);
        });
        
        todoList.appendChild(fragment);
        
        // Show message if no todos or no search results
        if (todos.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No todos yet. Add one above!';
            emptyMessage.className = 'empty-message';
            todoList.appendChild(emptyMessage);
        } else if (filteredTodos.length === 0 && searchText) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = `No todos matching "${searchText}"`;
            noResultsMessage.className = 'empty-message';
            todoList.appendChild(noResultsMessage);
        }
    }
    
    /**
     * Filter todos based on search text
     */
    function filterTodos(searchText, todosArray) {
        const lowerCaseSearch = searchText.toLowerCase();
        return todosArray.filter(todo => 
            todo.text.toLowerCase().includes(lowerCaseSearch)
        );
    }
    
    /**
     * Handle search input changes with debounce
     */
    let debounceTimeout;
    function handleSearchInput(e) {
        clearTimeout(debounceTimeout);
        
        debounceTimeout = setTimeout(() => {
            searchText = e.target.value.trim();
            renderTodos();
        }, 300); // 300ms debounce delay
    }
    
    /**
     * Clear search input and show all todos
     */
    function clearSearch() {
        searchInput.value = '';
        searchText = '';
        renderTodos();
        searchInput.focus();
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});