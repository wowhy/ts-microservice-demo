"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
function makeRouteOperationId(routes) {
    const operationIds = {
        getManyBase: 'getMany',
        getOneBase: 'getOne',
        createOneBase: 'createOne',
        createManyBase: 'createMany',
        updateOneBase: 'updateOne',
        deleteOneBase: 'deleteOne'
    };
    ['getManyBase', 'getOneBase', 'createOneBase', 'createManyBase', 'updateOneBase', 'deleteOneBase'].forEach(key => {
        if (!routes[key]) {
            routes[key] = {
                allowParamsOverride: true
            };
        }
        routes[key].decorators = (routes[key].decorators || []).concat(swagger_1.ApiOperation({
            title: '',
            operationId: operationIds[key]
        }));
    });
    return routes;
}
exports.makeRouteOperationId = makeRouteOperationId;
//# sourceMappingURL=utils.js.map