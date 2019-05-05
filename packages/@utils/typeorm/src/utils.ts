import { ApiOperation } from '@nestjs/swagger'

export function makeRouteOperationId(routes) {
  const operationIds = {
    getManyBase: 'getMany',
    getOneBase: 'getOne',
    createOneBase: 'createOne',
    createManyBase: 'createMany',
    updateOneBase: 'updateOne',
    deleteOneBase: 'deleteOne'
  }
  ;['getManyBase', 'getOneBase', 'createOneBase', 'createManyBase', 'updateOneBase', 'deleteOneBase'].forEach(
    key => {
      if (!routes[key]) {
        routes[key] = {
          allowParamsOverride: true
        }
      }

      routes[key].decorators = (routes[key].decorators || []).concat(
        ApiOperation({
          title: '',
          operationId: operationIds[key]
        })
      )
    }
  )

  return routes
}
