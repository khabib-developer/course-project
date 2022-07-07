export class UserDto {
  name;
  blocked;
  email;
  id;
  theme;
  language;
  admin = false;
  Collections = [];
  Likes = [];
  constructor(model: any) {
    this.name = model.name;
    this.email = model.email;
    this.blocked = model.blocked;
    this.theme = model.theme;
    this.language = model.language;
    this.id = model.id;
    this.Collections = model.Collections || [];
    this.Likes = model.Likes || [];
  }
}
