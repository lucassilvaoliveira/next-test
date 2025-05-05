import * as crypto from "crypto";

export function encrypt(text: string): string {
  if (!process.env.NEXT_PUBLIC_ENCRYPTION_KEY || !process.env.NEXT_PUBLIC_ENCRYPTION_IV) {
    throw new Error(
      "ENCRYPTION_KEY and ENCRYPTION_IV must be defined in environment variables."
    );
  }

  const key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY, "utf8");
  const iv = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_IV, "utf8");

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

export function decrypt(text: string): string {
  if (!process.env.NEXT_PUBLIC_ENCRYPTION_KEY || !process.env.NEXT_PUBLIC_ENCRYPTION_IV) {
    throw new Error(
      "ENCRYPTION_KEY and ENCRYPTION_IV must be defined in environment variables."
    );
  }

  const key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY, "utf8");
  const iv = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_IV, "utf8");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
