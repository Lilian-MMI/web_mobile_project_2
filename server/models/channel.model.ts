import { DataTypes, Model } from 'sequelize';
import sequelize from '../configs/sequelize';

interface ChannelAttributes {
  id: string;
  name: string;
}

interface ChannelInstance extends Model<ChannelAttributes>, ChannelAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Channel = sequelize.define<ChannelInstance>(
  'Channel',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'channels',
  }
);

export { Channel };
