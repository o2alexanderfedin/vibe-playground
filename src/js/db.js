/**
 * IndexedDB Database Module for Todo App
 * Handles all database operations and migrations
 */

// Database configuration
const DB_CONFIG = {
  name: 'TodoApp',
  version: 1,
  stores: {
    todos: { keyPath: 'id', autoIncrement: true }
  }
};

// Database connection
let db = null;

/**
 * Initialize the database
 * @returns {Promise} Promise resolving to the database instance
 */
function initDatabase() {
  return new Promise((resolve, reject) => {
    // Check if IndexedDB is supported
    if (!window.indexedDB) {
      console.warn('IndexedDB is not supported in this browser');
      reject(new Error('IndexedDB not supported'));
      return;
    }

    // Open database connection
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

    // Handle database upgrade (first time or version change)
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Create todos object store if it doesn't exist
      if (!db.objectStoreNames.contains('todos')) {
        const store = db.createObjectStore('todos', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        
        // Create indexes for searching and filtering
        store.createIndex('text', 'text', { unique: false });
        store.createIndex('completed', 'completed', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    // Handle success
    request.onsuccess = (event) => {
      db = event.target.result;
      console.log('Database initialized successfully');
      
      // Migrate data from localStorage if needed
      migrateFromLocalStorage()
        .then(() => resolve(db))
        .catch(error => {
          console.error('Migration error:', error);
          resolve(db); // Still resolve with DB even if migration fails
        });
    };

    // Handle errors
    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Add a new todo item
 * @param {Object} todo - Todo object to add
 * @returns {Promise} Promise resolving to the added todo with ID
 */
function addTodo(todo) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    // Add timestamp fields
    const todoWithTimestamp = {
      ...todo,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.add(todoWithTimestamp);

    request.onsuccess = (event) => {
      // Get the generated ID and add it to the todo object
      const id = event.target.result;
      const completeTodo = { ...todoWithTimestamp, id };
      resolve(completeTodo);
    };

    request.onerror = (event) => {
      console.error('Error adding todo:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Get all todos
 * @returns {Promise} Promise resolving to array of todos
 */
function getAllTodos() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const transaction = db.transaction(['todos'], 'readonly');
    const store = transaction.objectStore('todos');
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error('Error getting todos:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Update a todo item
 * @param {Object} todo - Todo object with updated properties
 * @returns {Promise} Promise resolving when update is complete
 */
function updateTodo(todo) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    // Update the timestamp
    const updatedTodo = {
      ...todo,
      updatedAt: new Date()
    };

    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.put(updatedTodo);

    request.onsuccess = () => {
      resolve(updatedTodo);
    };

    request.onerror = (event) => {
      console.error('Error updating todo:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Delete a todo item
 * @param {number} id - ID of todo to delete
 * @returns {Promise} Promise resolving when delete is complete
 */
function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error deleting todo:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Clear all todos
 * @returns {Promise} Promise resolving when database is cleared
 */
function clearAllTodos() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.clear();

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error clearing todos:', event.target.error);
      reject(event.target.error);
    };
  });
}

/**
 * Migrate data from localStorage to IndexedDB
 * @returns {Promise} Promise resolving when migration is complete
 */
function migrateFromLocalStorage() {
  return new Promise((resolve, reject) => {
    try {
      // Check if there's data in localStorage
      const localData = localStorage.getItem('todos');
      
      if (!localData) {
        // No data to migrate
        resolve();
        return;
      }

      // Parse localStorage data
      const todos = JSON.parse(localData);
      
      if (!Array.isArray(todos) || todos.length === 0) {
        // No valid data to migrate
        resolve();
        return;
      }

      console.log(`Migrating ${todos.length} todos from localStorage to IndexedDB`);

      // Create a transaction for batch operation
      const transaction = db.transaction(['todos'], 'readwrite');
      const store = transaction.objectStore('todos');
      
      // Counter for completed operations
      let completed = 0;
      
      // Process each todo
      todos.forEach(todo => {
        // Add timestamps if they don't exist
        const todoWithTimestamp = {
          ...todo,
          createdAt: todo.createdAt || new Date(),
          updatedAt: todo.updatedAt || new Date()
        };
        
        const request = store.add(todoWithTimestamp);
        
        request.onsuccess = () => {
          completed++;
          if (completed === todos.length) {
            // All todos migrated, clean up localStorage
            console.log('Migration complete, cleaning up localStorage');
            localStorage.removeItem('todos');
            resolve();
          }
        };
        
        request.onerror = (event) => {
          console.warn('Error migrating todo:', event.target.error);
          // Continue with other todos even if one fails
          completed++;
          if (completed === todos.length) {
            resolve();
          }
        };
      });
      
      transaction.oncomplete = () => {
        console.log('Migration transaction completed');
      };
      
      transaction.onerror = (event) => {
        console.error('Migration transaction error:', event.target.error);
        reject(event.target.error);
      };
      
    } catch (error) {
      console.error('Migration error:', error);
      reject(error);
    }
  });
}

// Export database functions
export {
  initDatabase,
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  clearAllTodos
};