import bcrypt from "bcryptjs";

export const validateUsername = (username) => {
  if (!username) {
    return "Username cannot be empty";
  }
};

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  }
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  return emailPattern.test(email) || "Invalid email address";
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return "Password must be 8 characters or more";
  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!passwordPattern.test(password)) {
    return "Password must contain at least one lowercase letter, one uppercase letter, and one number";
  }

  return true;
};

export function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// export function hashPassword(password) {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) return reject(err);

//       bcrypt.hash(password, salt, (err, hash) => {
//         if (err) return reject(err);
//         resolve(hash);
//       });
//     });
//   });
// }

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function verifyPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
