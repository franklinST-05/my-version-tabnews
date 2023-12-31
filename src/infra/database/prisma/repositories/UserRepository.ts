import { UserModel } from '@/domain/models/User';
import { CreateUserModel, FindUserByEmailModel, FindUserByEmailOrUsernameModel, FindUserByUsernameModel, UpdateUserModel, UserRepo } from '@/domain/usecases/User';
import client from '../client';

export class UserRepository implements UserRepo {
    
    async create({ name, username, email, password }: CreateUserModel): Promise<UserModel> {
        return await client.user.create({
            data: { name, username, email, password }
        });
    }

    async findByEmail({ email }: FindUserByEmailModel): Promise<UserModel | null> {
        return await client.user.findUnique({
            where: { email }
        });
    }

    async findByUsername({ username }: FindUserByUsernameModel): Promise<UserModel | null> {
        return await client.user.findUnique({
            where: { username }
        });
    }

    async findByEmailOrUsername({ email, username }: FindUserByEmailOrUsernameModel): Promise<UserModel | null> {
        return await client.user.findFirst({
            where: {
                OR: [ { email }, { username } ]
            }
        });
    }

    async update({ id, ...changes }: UpdateUserModel): Promise<UserModel> {
        return await client.user.update({
            where: { id },
            data: { ...changes }
        });
    }

}