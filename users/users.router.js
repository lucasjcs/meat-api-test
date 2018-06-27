"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var model_router_1 = require("../common/model-router");
var users_model_1 = require("./users.model");
var UsersRouter = /** @class */ (function (_super) {
    __extends(UsersRouter, _super);
    function UsersRouter() {
        var _this = _super.call(this, users_model_1.User) || this;
        _this.findByEmail = function (req, resp, next) {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(function (user) { return user ? [user] : []; })
                    .then(_this.renderAll(resp, next, {
                    pageSize: _this.pageSize,
                    url: req.url
                }))["catch"](next);
            }
            else {
                next();
            }
        };
        _this.on('beforeRender', function (document) {
            document.password = undefined;
            //delete document.password
        });
        return _this;
    }
    UsersRouter.prototype.applyRoutes = function (application) {
        application.get({ path: "" + this.basePath, version: '2.0.0' }, [this.findByEmail, this.findAll]);
        application.get({ path: "" + this.basePath, version: '1.0.0' }, this.findAll);
        application.get(this.basePath + "/:id", [this.validateId, this.findById]);
        application.post("" + this.basePath, this.save);
        application.put(this.basePath + "/:id", [this.validateId, this.replace]);
        application.patch(this.basePath + "/:id", [this.validateId, this.update]);
        application.del(this.basePath + "/:id", [this.validateId, this["delete"]]);
    };
    return UsersRouter;
}(model_router_1.ModelRouter));
exports.usersRouter = new UsersRouter();
