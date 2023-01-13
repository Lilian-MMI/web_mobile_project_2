import { Channel } from './channel.model';
import { Message } from './message.model';
import { User } from './user.model';

User.hasMany(Message);
Message.belongsTo(User);

Channel.hasMany(Message);
Message.belongsTo(Channel);

export { User, Message };
