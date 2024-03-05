"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class BudgetItem {
    constructor({ budget_name, amount, generate_by, userContributions, }) {
        this.budget_name = budget_name;
        this.amount = amount;
        this.generate_by = generate_by;
        this.userContributions = userContributions;
        this.createdAt = new Date();
    }
}
exports.BudgetItem = BudgetItem;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BudgetItem.prototype, "budget_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], BudgetItem.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BudgetItem.prototype, "generate_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Map, of: Number }),
    __metadata("design:type", Object)
], BudgetItem.prototype, "userContributions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], BudgetItem.prototype, "createdAt", void 0);
//# sourceMappingURL=budget.schema.js.map