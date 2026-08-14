import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payload-storage-cloudinary'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Clubs } from './collections/Clubs'
import { Grounds } from './collections/Grounds'
import { Scarves } from './collections/Scarves'
import { Goals } from './collections/Goals'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Clubs, Grounds, Scarves, Goals],
  globals: [Settings],
  plugins: [
    cloudinaryStorage({
      collections: {
        media: true,
      },
      cloudConfig: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder_cloud_name',
        api_key: process.env.CLOUDINARY_API_KEY || 'placeholder_api_key',
        api_secret: process.env.CLOUDINARY_API_SECRET || 'placeholder_api_secret',
      },
    }),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
})
