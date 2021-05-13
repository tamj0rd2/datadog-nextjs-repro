import express from 'express'
import { resolve } from 'path'
import { existsSync } from 'fs'

/**
 * We don't use this server.ts in production. We serve the static files on S3 and
 * have a lambda set up to do the below routing for us. So this server.ts file is
 * just a convenient way to simulate what would happen in production locally.
 */
function getFilePathFromUri(path: string | undefined): string | undefined {
  if (!path) return path

  const hasFileExtension = /.*\.(png|jpg|html|css|js|json|js\.map|css\.map)$/

  if (path && !path.match(hasFileExtension)) {
    path = `${path}.html`
  }

  return path
}

const buildFolder = resolve(process.cwd(), 'dist')
const knownPaths = new Set<string>()

const app = express()
app.use(express.static(buildFolder))
app.use('*', (req, res) => {
  const pathName = req.originalUrl.replace(/\/$/, '')
  const filePath = buildFolder + getFilePathFromUri(pathName)

  if (knownPaths.has(filePath) || existsSync(filePath)) {
    knownPaths.add(filePath)
    return res.sendFile(filePath)
  }

  res.sendFile(buildFolder + '/404.html')
})

app.listen(3000, () => console.log('serving the build folder on http://localhost:3000'))
