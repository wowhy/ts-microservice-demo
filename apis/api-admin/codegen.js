const { codegen } = require('swagger-axios-codegen')

try {
  codegen({
    serviceNameSuffix: 'ServiceProxy',
    methodNameMode: 'operationId',
    remoteUrl: 'http://127.0.0.1:3000/docs/service-user/json',
    outputDir: './src/modules/service-proxy/proxy',
    useStaticMethod: false,
    fileName: 'user.proxy.ts'
  })
} catch (ex) {
  console.log(ex)
}
