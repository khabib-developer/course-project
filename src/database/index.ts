import { Sequelize, Model, DataTypes } from "@sequelize/core";
import { database } from "../constants";
import { AdditionalFields, initAdditioanlFields } from "./AdditionalFields";
import {
  AdditionalFieldsValue,
  initAdditionalFieldsValue,
} from "./AdditionalFieldsValue";
import { Collection, initCollection } from "./Collection";
import { initComment, Comment } from "./Comment";
import { initItem, Item } from "./Item";
import { initLike, Like } from "./Like";
import { initTag, Tag } from "./Tag";
import { initToken, Token } from "./Token";
import { initUser, User } from "./User";

export const sequelize = new Sequelize(
  database.db_name,
  database.db_user,
  database.db_password,
  {
    dialect: "mysql",
    host: "localhost",
    port: Number(database.port),
  }
);

initUser(sequelize);
initToken(sequelize);
initCollection(sequelize);
initTag(sequelize);
initItem(sequelize);
initLike(sequelize);
initComment(sequelize);
initAdditioanlFields(sequelize);
initAdditionalFieldsValue(sequelize);

User.hasOne(Token, { onDelete: "CASCADE" });

Token.belongsTo(User, { onDelete: "CASCADE" });

User.hasMany(Collection, { onDelete: "CASCADE" });

Collection.belongsTo(User, { onDelete: "CASCADE" });

Collection.hasMany(Item, { onDelete: "CASCADE" });

Item.belongsTo(Collection, { onDelete: "CASCADE" });

Collection.hasOne(AdditionalFields, { onDelete: "CASCADE" });

AdditionalFields.belongsTo(Collection, { onDelete: "CASCADE" });

Item.hasOne(AdditionalFieldsValue, { onDelete: "CASCADE" });

AdditionalFieldsValue.belongsTo(Item, { onDelete: "CASCADE" });

const Tag_Item = sequelize.define("Tag_Item", {}, { timestamps: false });

Item.belongsToMany(Tag, { through: Tag_Item, onDelete: "CASCADE" });
Tag.belongsToMany(Item, { through: Tag_Item, onDelete: "CASCADE" });

User.hasMany(Like, { onDelete: "CASCADE" });

Like.belongsTo(User, { onDelete: "CASCADE" });

User.hasMany(Comment, { onDelete: "CASCADE" });

Comment.belongsTo(User, { onDelete: "CASCADE" });

Item.hasMany(Like, { onDelete: "CASCADE" });

Like.belongsTo(Item, { onDelete: "CASCADE" });

Item.hasMany(Comment, { onDelete: "CASCADE" });

Comment.belongsTo(Item, { onDelete: "CASCADE" });
