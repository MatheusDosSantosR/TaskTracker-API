import { Model, DataTypes, STRING, BOOLEAN, INTEGER } from 'sequelize';
import sequelize from '../config/database';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public userId!: number;
}

Todo.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: STRING(128),
      allowNull: false,
    },
    description: {
      type: STRING(255),
      allowNull: true,
    },
    completed: {
      type: BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'todos',
    sequelize,
  }
);

export default Todo;