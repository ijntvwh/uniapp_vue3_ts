import { preview, Project } from 'miniprogram-ci'
import { readProfile } from './profile'

const { appid, projectPath, privateKeyPath, version } = readProfile()

const project = new Project({ appid, type: 'miniProgram', projectPath, privateKeyPath })
const setting = { es6: true, es7: true }
preview({
  project,
  setting,
  version,
  qrcodeFormat: 'image',
  qrcodeOutputDest: './dist/preview.jpg',
})
