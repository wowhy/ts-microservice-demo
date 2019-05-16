const { codegen } = require('swagger-axios-codegen')
const https = require('https')

https.globalAgent.options.rejectUnauthorized = false

try {
  codegen({
    serviceNameSuffix: 'Service',
    methodNameMode: 'operationId',
    remoteUrl: 'https://127.0.0.1:3000/docs/service-user/json',
    outputDir: './src/modules/service-proxy/proxy',
    useStaticMethod: false,
    fileName: 'user.proxy.ts'
  })
} catch (ex) {
  console.log(ex)
}
