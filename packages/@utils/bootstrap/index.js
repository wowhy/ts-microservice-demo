const fs = require('fs')
const path = require('path')

const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger')

async function bootstrap(app, options) {
  const packageInfo = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'))

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(packageInfo.name)
      .setDescription(packageInfo.description)
      .setVersion(packageInfo.version)
      .build(),
    {
      include: options.documentProviders
    }
  )

  SwaggerModule.setup(`docs/${packageInfo.name}`, app, document)

  await app.listen(options.port || 3000)
}

exports.bootstrap = bootstrap
