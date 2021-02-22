
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { resolvers } from './src/generated/type-graphql';
import { buildSchema } from 'type-graphql';

const prisma = new PrismaClient();



async function main() {
    const schema = await buildSchema({
        resolvers,
        validate: false,
    });

    const server = new ApolloServer({ schema, context: () => ({ prisma }) });

    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });

    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
