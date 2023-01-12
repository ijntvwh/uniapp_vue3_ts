import { Project, upload } from 'miniprogram-ci'
import { readProfile } from './profile'

const { appid, projectPath, privateKeyPath, version } = readProfile()

const project = new Project({ appid, type: 'miniProgram', projectPath, privateKeyPath })
const setting = { es6: true, es7: true }

upload({ project, version, setting })
  .then(res => console.log('上传成功', res))
  .catch(error => console.log('上传失败', error))
