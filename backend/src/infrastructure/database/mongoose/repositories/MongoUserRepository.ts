import { User } from '../../../../core/entities/User';
import { IUserRepository } from '../../../../core/interfaces/repositories/IUserRepository';
import { UserModel } from '../models/UserModel';

export class MongoUserRepository implements IUserRepository {
  
    findByEmail(email: string): Promise<User | null> {
      throw new Error('Method not implemented.');
  }
  
  update(user: User): Promise<User> {
      throw new Error('Method not implemented.');
  }
 
  delete(id: string): Promise<void> {
      throw new Error('Method not implemented.');
  }
 
  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);
    return new User(
      createdUser._id.toString(),
      createdUser.name,
      createdUser.email,
      createdUser.password
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? new User(user._id.toString(), user.name, user.email, user.password) : null;
  }


}