import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cloudinaryStorage } from "payload-storage-cloudinary";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Clubs } from "./collections/Clubs";
import { Grounds } from "./collections/Grounds";
import { Scarves } from "./collections/Scarves";
import { Goals } from "./collections/Goals";
import { Settings } from "./globals/Settings";
import { HomePage } from "./globals/HomePage";
import { About } from "./globals/About";
import { GroundsPage } from "./globals/GroundsPage";
import { MapPage } from "./globals/MapPage";
import { ScarvesPage } from "./globals/ScarvesPage";
import { ContactPage } from "./globals/ContactPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  upload: {
    limits: {
      fileSize: 25 * 1024 * 1024,
    },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Clubs, Grounds, Scarves, Goals],
  globals: [
    Settings,
    HomePage,
    About,
    GroundsPage,
    MapPage,
    ScarvesPage,
    ContactPage,
  ],
  plugins: [
    ...(process.env.USE_CLOUDINARY !== "false" &&
    (process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_URL)
      ? [
          (() => {
            let cloud_name = process.env.CLOUDINARY_CLOUD_NAME || "";
            let api_key = process.env.CLOUDINARY_API_KEY || "";
            let api_secret = process.env.CLOUDINARY_API_SECRET || "";
            if (process.env.CLOUDINARY_URL?.startsWith("cloudinary://")) {
              try {
                const parsed = new URL(process.env.CLOUDINARY_URL);
                api_key = decodeURIComponent(parsed.username) || api_key;
                api_secret = decodeURIComponent(parsed.password) || api_secret;
                cloud_name = parsed.hostname || cloud_name;
              } catch {}
            }
            return cloudinaryStorage({
              collections: {
                media: {
                  deleteFromCloudinary: true,
                },
              },
              cloudConfig: {
                cloud_name,
                api_key,
                api_secret,
              },
            });
          })(),
        ]
      : []),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    push: true,
  }),
});
