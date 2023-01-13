import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/sequelize';

interface MessageAttributes {
  id: string;
  content: string;
  type: string;
  UserId: string;
  ChannelId: string;
}

interface MessageInstance extends Model<MessageAttributes>, MessageAttributes {
  setUser: (userId: string) => void;
  createdAt?: Date;
  updatedAt?: Date;
}

const Message = sequelize.define<MessageInstance>(
  'Message',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ChannelId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'messages',
  }
);

export { Message };
