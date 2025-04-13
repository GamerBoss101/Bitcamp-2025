import { GoogleGenAI, Type } from "@google/genai";

class Gemini {
	ai: GoogleGenAI | null;

	constructor() {
		this.ai = null;
		this.connect();
	}

	connect() {
		this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	}

	fileToGenerativePart(buffer: Buffer) {
		return {
			mimeType: "image/png",
			data: buffer.toString("base64"),
		};
	}

	async generateDescription(
		prompt: string,
		imageBuffer: Buffer
	): Promise<any>  {
		try {
			const imagePart = {
				inlineData: {
					mimeType: "image/jpeg",
					data: imageBuffer.toString("base64"),
				},
			};

			const result = await this.ai?.models.generateContent({
				model: "gemini-2.0-flash", 
				contents: [
					{
						parts: [
							{
								text: prompt,
							},
							imagePart,
						],
					},
				],
				config: {
					responseMimeType: "application/json",
					responseSchema: {
						type: Type.OBJECT,
						properties: {
							description: {
								type: Type.STRING,
								description: "A concise description of the image.",
								nullable: false,
							},
						},
						required: ["description"],
					},
				},
			}) as any;

			if(!result) return null;
			else return JSON.parse(result.candidates[0].content.parts[0].text);
		} catch (error) {
			console.error("Error in generateDescription:", error);
			throw new Error("Failed to generate image description");
		}
	}
}

export const gemini = new Gemini();
