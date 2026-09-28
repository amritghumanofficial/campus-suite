const USERS_KEY = "users";
const LOGIN_KEY = "loggedInUser";

// Get all users
export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);

  if (users) {
    return JSON.parse(users);
  }

  return [];
}


// Register new user
export function registerUser(userData) {
  const users = getUsers();

  // Check email already exists
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === userData.email) {
      return {
        success: false,
        message: "Email already registered!",
      };
    }
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
  };

  // Add user to users array
  users.push(newUser);

  // Save users
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Login user automatically
  localStorage.setItem(LOGIN_KEY, JSON.stringify(newUser));

  return {
    success: true,
    message: "Account created successfully!",
    user: newUser,
  };
}


// Login user
export function loginUser(email, password) {
  const users = getUsers();

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.email === email && user.password === password) {
      // Save logged-in user
      localStorage.setItem(LOGIN_KEY, JSON.stringify(user));

      return {
        success: true,
        message: "Login successful!",
        user: user,
      };
    }
  }

  return {
    success: false,
    message: "Invalid email or password."
  };
}


// Get logged-in user
export function getCurrentUser() {
  const user = localStorage.getItem(LOGIN_KEY);

  if (user) {
    return JSON.parse(user);
  }

  return null;
}


export function isUserLoggedIn() {
  const user = localStorage.getItem(LOGIN_KEY);

  if (user) {
    return true;
  }

  return false;
}


// Logout
export function logoutUser() {
  localStorage.removeItem(LOGIN_KEY);
}
