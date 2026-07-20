import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class OllamaService {

    private readonly ollamaUrl = "http://localhost:11434";

    async createEmbedding(text: string): Promise<number[]> {

        const response = await axios.post(
            `${this.ollamaUrl}/api/embed`,
            {
                model: "nomic-embed-text",
                input: text,
            }
        );
        return response.data.embeddings[0];
    }


    async generateAnswer(
        question: string,
        context: string,
    ): Promise<string> {

        const response = await axios.post(
            `${this.ollamaUrl}/api/generate`,
            {
                model: "qwen2.5:1.5b",

                prompt: `
                    You are a company document assistant.

                    Answer only using the provided context.

                    If the question asks for a list, include ALL items from the context.

                    Do not provide only one example.

                    Do not use general knowledge.

                    If the answer is not in the context:
                    "I cannot find this information in the uploaded documents."

                    Context:
                    ${context}

                    Question:
                    ${question}

                    Answer:
                `,

                stream: false,

                options: {
                    num_predict: 1000,
                    temperature: 0.1,
                    top_p: 0.9
                }
            }
        );

        return response.data.response;
    }

}