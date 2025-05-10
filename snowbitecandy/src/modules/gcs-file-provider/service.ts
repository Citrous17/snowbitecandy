// src/modules/gcs-file-provider/service.ts
import { AbstractFileProviderService } from "@medusajs/framework/utils"
import {
  ProviderUploadFileDTO,
  ProviderFileResultDTO,
  ProviderDeleteFileDTO,
  ProviderGetFileDTO,
} from "@medusajs/types"
import { Storage, Bucket } from "@google-cloud/storage"
import { MedusaError } from "medusa-core-utils"
import { Logger } from "@medusajs/framework/types"

type InjectedDependencies = {
  logger: Logger
}

type GcsOptions = {
  projectId: string
  keyFilename: string
  bucketName: string
  baseUrl?: string
}

export default class GcsFileProviderService extends AbstractFileProviderService {
  static identifier = "gcs"

  protected logger_: Logger
  protected options_: GcsOptions
  protected bucket: Bucket
  protected baseUrl: string

  constructor(
    { logger }: InjectedDependencies,
    options: GcsOptions
  ) {
    super()
    this.logger_ = logger
    this.options_ = options

    // Validate required options
    GcsFileProviderService.validateOptions(options)

    const { projectId, keyFilename, bucketName, baseUrl } = options
    const storage = new Storage({ projectId, keyFilename })
    this.bucket = storage.bucket(bucketName)
    this.baseUrl = baseUrl ?? `https://storage.googleapis.com/${bucketName}`
  }

  static validateOptions(options: Record<string, any>) {
    console.log("Validating GCS options:", options)
    if (!options.projectId || !options.keyFilename || !options.bucketName) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "GCS provider requires projectId, keyFilename, and bucketName"
      )
    }
  }

  /**
   * Uploads a file buffer to GCS.
   */
  async upload(
    file: ProviderUploadFileDTO
  ): Promise<ProviderFileResultDTO> {
    // file.filename is the key Medusa generated
    const destination = file.filename

    try {
      const blob = this.bucket.file(destination)
    
      // Convert the binary-encoded string into a Buffer
    const buffer =
        typeof file.content === "string"
        ? Buffer.from(file.content, "binary")
        : file.content

    // Upload it
    await blob.save(buffer, {
        metadata: { contentType: file.mimeType },
        resumable: false,
    })

      // Save the Buffer directly
      await blob.save(buffer, {
        metadata: { contentType: file.mimeType },
      })

      console.log("File uploaded successfully")
      console.log(`File URL: ${this.baseUrl}/${destination}`)
      console.log(`File Key: ${destination}`)

      return {
        url: `${this.baseUrl}/${destination}`,
        key: destination,
      }
    } catch (err) {
      this.logger_.error(`GCS upload failed: ${err}`)
      throw err
    }
  }

  /**
   * Deletes a file by its key.
   */
  async delete(
    file: ProviderDeleteFileDTO
  ): Promise<void> {
    // Use file.key instead of file.fileKey
    await this.bucket.file(file.fileKey).delete()
  }

  /**
   * Returns a signed URL for downloading.
   */
  async getPresignedDownloadUrl(
    file: ProviderGetFileDTO
  ): Promise<string> {
    // Use file.key here as well
    const blob = this.bucket.file(file.fileKey)
    const [url] = await blob.getSignedUrl({
      action: "read",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    })
    return url
  }
}
