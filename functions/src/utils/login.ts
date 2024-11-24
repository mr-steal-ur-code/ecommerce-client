import fs from 'fs';

let users: User[] = [];
try {
  const data = fs.readFileSync("./data/users.json", "utf-8");
  users = JSON.parse(data);
} catch (error) {
  console.error("Error reading or parsing users.json:", error);
}

const userLogin = (username: string, password: string): { login: boolean; userObject: User | null } => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    return { login: true, userObject: user };
  }

  return { login: false, userObject: null };
};

export default userLogin;