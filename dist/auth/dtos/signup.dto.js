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
exports.SignupDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignupDto {
    name;
    email;
    password;
    phone;
    address;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, pattern: "/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&#]{6,}$/" }, phone: { required: false, type: () => String }, address: { required: false, type: () => String } };
    }
}
exports.SignupDto = SignupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format.' }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&#]{6,}$/, {
        message: 'Password must be at least 6 characters long and include both letters and numbers. Symbols are optional.',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('ET', {
        message: 'Phone number must be a valid Ethiopian phone number.',
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignupDto.prototype, "address", void 0);
//# sourceMappingURL=signup.dto.js.map