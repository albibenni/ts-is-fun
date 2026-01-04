class User {
  #internalId: number; // Private field (ES2022+)
  name: string;

  constructor(id: number, name: string) {
    this.#internalId = id;
    this.name = name;
  }

  // Modern implementation of the passage's logic
  toJSON() {
    return {
      type: "User",
      displayName: this.name.toUpperCase(),
      exportedAt: new Date().toISOString(),
    };
  }
}

const user = new User(101, "Alice");
console.log(JSON.stringify(user));
// Output: {"type":"User","displayName":"ALICE","exportedAt":"2025-..."}
