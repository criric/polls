import fastify from 'fastify';
import {z} from 'zod'
import { prisma } from '../lib/prisma';
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-polls';
import { voteOnPoll } from './routes/vote-on-poll';
import fastifyWebsocket from '@fastify/websocket';
import { pollResult } from './ws/poll-results';

const app = fastify();
app.register(cookie, {
    secret: "polls-app-nlw",
    hook: "onRequest",
})
app.register(fastifyWebsocket)
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResult)
app.listen({ port: 3333 }).then(()=>{
    console.log('Server is running on port 3333')
})