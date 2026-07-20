import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DocumentChunk, DocumentChunkSchema } from "../admin/schema/chunk.schema";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { OllamaService } from "../ragAi/ollama.service";
import { VectorService } from "../ragAi/vector.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DocumentChunk.name, schema: DocumentChunkSchema }
        ], 'atlas')
    ],

    controllers: [ChatController],
    providers: [ChatService, OllamaService, VectorService],
    exports: [ChatService]
})

export class ChatModule { }