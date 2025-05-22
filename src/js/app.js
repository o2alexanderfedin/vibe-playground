/**
 * Todo App Main Script
 * Using IndexedDB for data storage
 */

import { 
  initDatabase, 
  addTodo as dbAddTodo, 
  getAllTodos, 
  updateTodo, 
  deleteTodo as dbDeleteTodo 
} from './db.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    // App state
    let todos = [];
    let searchText = '';
    let dbInitialized = false;
    
    // Initialize IndexedDB and load todos
    initDatabase()
        .then(() => {
            dbInitialized = true;
            return loadTodos();
        })
        .catch(error => {
            console.error('Failed to initialize database:', error);
            // Fallback to localStorage if IndexedDB fails
            todos = JSON.parse(localStorage.getItem('todos')) || [];
            renderTodos();
        });
    
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
    
    /**
     * Load todos from IndexedDB
     */
    function loadTodos() {
        return getAllTodos()
            .then(loadedTodos => {
                todos = loadedTodos;
                renderTodos();
                return todos;
            })
            .catch(error => {
                console.error('Error loading todos:', error);
                // Fallback to localStorage
                todos = JSON.parse(localStorage.getItem('todos')) || [];
                renderTodos();
            });
    }
    
    /**
     * Add a new todo
     */
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText) {
            const newTodo = {
                text: todoText,
                completed: false
            };
            
            // Add to database if initialized, otherwise fallback to memory
            if (dbInitialized) {
                dbAddTodo(newTodo)
                    .then(addedTodo => {
                        todos.push(addedTodo);
                        renderTodos();
                        todoInput.value = '';
                    })
                    .catch(error => {
                        console.error('Error adding todo:', error);
                        // Fallback to memory
                        newTodo.id = Date.now();
                        todos.push(newTodo);
                        renderTodos();
                        todoInput.value = '';
                        // Also save to localStorage as backup
                        saveTodosToLocalStorage();
                    });
            } else {
                // No database, use memory and localStorage
                newTodo.id = Date.now();
                todos.push(newTodo);
                saveTodosToLocalStorage();
                renderTodos();
                todoInput.value = '';
            }
        }
    }
    
    /**
     * Toggle todo completion state
     */
    function toggleTodo(id) {
        const todoToUpdate = todos.find(todo => todo.id === id);
        
        if (!todoToUpdate) return;
        
        // Toggle the completed state
        todoToUpdate.completed = !todoToUpdate.completed;
        
        if (dbInitialized) {
            updateTodo(todoToUpdate)
                .then(() => {
                    renderTodos();
                })
                .catch(error => {
                    console.error('Error updating todo:', error);
                    // Fallback to localStorage
                    saveTodosToLocalStorage();
                    renderTodos();
                });
        } else {
            // Update in memory and localStorage
            todos = todos.map(todo => todo.id === id ? todoToUpdate : todo);
            saveTodosToLocalStorage();
            renderTodos();
        }
    }
    
    /**
     * Delete a todo
     */
    function deleteTodo(id) {
        if (dbInitialized) {
            dbDeleteTodo(id)
                .then(() => {
                    todos = todos.filter(todo => todo.id !== id);
                    renderTodos();
                })
                .catch(error => {
                    console.error('Error deleting todo:', error);
                    // Fallback to localStorage
                    todos = todos.filter(todo => todo.id !== id);
                    saveTodosToLocalStorage();
                    renderTodos();
                });
        } else {
            // Delete from memory and localStorage
            todos = todos.filter(todo => todo.id !== id);
            saveTodosToLocalStorage();
            renderTodos();
        }
    }
    
    /**
     * Render todos to the DOM
     */
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

        // Update status indicator in UI
        updateStorageStatusIndicator();
    }
    
    /**
     * Update storage status indicator
     */
    function updateStorageStatusIndicator() {
        const storageType = dbInitialized ? 'IndexedDB' : 'LocalStorage';
        document.querySelector('.footer p').textContent = `Version 1.0.0 (${storageType})`;
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
    
    /**
     * Fallback: Save todos to localStorage
     */
    function saveTodosToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});