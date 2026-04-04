import { GenerateImagesResponse, GoogleGenAI } from "@google/genai";

class CatClient {
  private static readonly BASE_URL: string = "https://meowfacts.herokuapp.com";
  private static readonly GOOGLE_MODEL_NAME: string = "gemini-3.1-flash-image-preview";

  private static s_geminiClient: GoogleGenAI;

  static {
    this.s_geminiClient = new GoogleGenAI({
      apiKey: require("./.env.json").geminiApiKey,
    });
  }

  private static queryGet(numFetch?: number): Promise<Response> {
    return fetch(`${CatClient.BASE_URL}/?count=${numFetch ?? 1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  static getFact(): Promise<string> {
    return this.getBulkFacts(1).then((data) => data[0]);
  }

  static getBulkFacts(pageSize: number): Promise<string[]> {
    return this.queryGet(pageSize)
        .then((response) => response.json())
        .then((data) => data?.data ?? []);
  }

  static getFactWithImage() {
    this.queryGet()
        .then((response) => response.json())
        .then((data) => this.getImage(data.data[0]))
        .catch((error) => console.error(error));
  }

  static getImage(prompt: string): Promise<GenerateImagesResponse> {
    this.s_geminiClient.models.list().then(console.log);
    return this.s_geminiClient.models.generateImages({
      model: this.GOOGLE_MODEL_NAME,
      prompt: prompt,
    });
  }
}

export default CatClient;
