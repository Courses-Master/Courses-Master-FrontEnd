import { EncryptStorage } from "encrypt-storage";

export const encryptStorage = new EncryptStorage(
  import.meta.env.VITE_SECRET_KEY,
  {
    storageType: "sessionStorage",
  }
);
