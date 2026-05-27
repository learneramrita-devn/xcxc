/**
 * Request debouncer to prevent multiple simultaneous requests
 */
class RequestDebouncer {
  constructor() {
    this.pendingRequests = new Map();
  }

  /**
   * Execute request with debouncing
   * @param {string} key - Unique key for the request
   * @param {Function} requestFn - Function that returns a promise
   * @param {number} delay - Debounce delay in ms
   * @returns {Promise} - Request promise
   */
  async execute(key, requestFn, delay = 1000) {
    // If request is already pending, return existing promise
    if (this.pendingRequests.has(key)) {
      console.log(`Request "${key}" already in progress, returning existing promise`);
      return this.pendingRequests.get(key);
    }

    // Create new request promise
    const requestPromise = (async () => {
      try {
        // Add small delay to prevent rapid-fire requests
        await new Promise(resolve => setTimeout(resolve, delay));
        const result = await requestFn();
        return result;
      } finally {
        // Clean up after request completes
        this.pendingRequests.delete(key);
      }
    })();

    // Store pending request
    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  /**
   * Cancel pending request
   */
  cancel(key) {
    this.pendingRequests.delete(key);
  }

  /**
   * Clear all pending requests
   */
  clearAll() {
    this.pendingRequests.clear();
  }

  /**
   * Check if request is pending
   */
  isPending(key) {
    return this.pendingRequests.has(key);
  }
}

export const loginDebouncer = new RequestDebouncer();
