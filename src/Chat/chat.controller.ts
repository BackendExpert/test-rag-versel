import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller("api/chat")
export class ChatController {

    constructor(
        private readonly chatService: ChatService
    ) { }

    @Post("ask")
    async AskQuestion(
        @Body("question") question: string
    ) {
        try {
            return await this.chatService.askQuestion(question);
        } catch (error) {
            console.log("CHAT ERROR:", error);
            throw error;
        }
    }
}