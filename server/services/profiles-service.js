const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const ProfilesModel = require("../models/profiles-model");
const ProfilesDto = require("../dtos/profile-dto");

class ProfilesService {
  async registration(login, password) {
    const candidate = await ProfilesModel.findOne({ where: { login } });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с логином ${login} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const profile = await ProfilesModel.create({
      login,
      password: hashPassword,
    });

    const profilesDto = new ProfilesDto(profile);
    const tokens = tokenService.generateTokens({ ...profilesDto });
    await tokenService.saveToken(profilesDto.id, tokens.refreshToken);

    return { ...tokens, profiles: profilesDto };
  }

  async login(login, password) {
    const profiles = await ProfilesModel.findOne({ where: { login } });
    if (!profiles) {
      throw ApiError.BadRequest("Пользователь с таким логином  не найден");
    }
    const isPassEquals = await bcrypt.compare(password, profiles.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const profilesDto = new ProfilesDto(profiles);
    const tokens = tokenService.generateTokens({ ...profilesDto });
    await tokenService.saveToken(profilesDto.id, tokens.refreshToken);

    return { ...tokens, profiles: profilesDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const profileData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!profileData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const profiles = await ProfilesModel.findOne({
      where: {
        id: profileData.id,
      },
    });
    const profilesDto = new ProfilesDto(profiles);
    const tokens = tokenService.generateTokens({ ...profilesDto });
    await tokenService.saveToken(profilesDto.id, tokens.refreshToken);

    return { ...tokens, profiles: profilesDto };
  }
  async getAllUsers() {
    const profiles = await ProfilesModel.findAll();
    return profiles;
  }
}
module.exports = new ProfilesService();
