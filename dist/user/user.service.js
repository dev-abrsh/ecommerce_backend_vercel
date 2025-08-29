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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./user.model");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAllUsers() {
        return this.userModel.find().select('name email phone address role is_verified createdAt updatedAt');
    }
    async getUserById(id) {
        const user = await this.userModel.findById(id).select('name email phone address role is_verified createdAt updatedAt');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async deleteUser(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }
    async getProfile(userId) {
        const user = await this.userModel
            .findById(userId)
            .select('name email phone address');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async updateProfile(userId, updateData) {
        const user = await this.userModel
            .findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true })
            .select('name email phone address role is_verified createdAt updatedAt');
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async changePassword(userId, dto) {
        const user = await this.userModel.findById(userId);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const hashed = await bcrypt.hash(dto.password, 10);
        user.password = hashed;
        await user.save();
        return { message: 'Password changed successfully' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map