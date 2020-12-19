import { accounts } from "./data.js";

// LOGIN FUNCTION
export function login(username, pin) {
    return accounts.find((acc) => acc.username === username);
}