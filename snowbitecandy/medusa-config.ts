import { loadEnv, defineConfig } from '@medusajs/framework/utils'
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL, 
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        backendUrl: process.env.MEDUSA_BACKEND_URL,
        providers: [
          {
            resolve: "./src/modules/gcs-file-provider",
            id: "gcs",
            options: {
              projectId: process.env.GOOGLE_GC_PROJECT_ID,
              keyFilename: process.env.GOOGLE_GC_KEYFILE,
              bucketName: process.env.GOOGLE_GC_BUCKET_NAME,
              // baseUrl optional
            }
          }
        ]
      }
    },
    // ... other modules
  ]
})
