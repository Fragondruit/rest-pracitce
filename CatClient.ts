import { GenerateImagesResponse, GoogleGenAI } from "@google/genai";

class CatClient {
  private static readonly BASE_URL: string = "https://meowfacts.herokuapp.com/";
  private static readonly GEMINI_API_KEY: string = "AIzaSyAiayTKb72__ltkPq9THmDsYAG7bSuiiKw";
  private static readonly GOOGLE_MODEL_NAME: "gemini-3.1-flash-image-preview";

  private static s_geminiClient: GoogleGenAI;

  static {
    this.s_geminiClient = new GoogleGenAI({
      apiKey: CatClient.GEMINI_API_KEY,
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

  static getFact() {
    this.getBulkFacts(1);
  }

  static getBulkFacts(pageSize: number) {
    this.queryGet(pageSize)
        .then((response) => response.json())
        .then((data) => console.log(data.data));
  }

  static getFactWithImage() {
    this.queryGet()
        .then((response) => response.json())
        .then((data) => this.getImage(data.data[0]))
        .catch((error) => console.error(error));
  }

  private static getImage(prompt: string): Promise<GenerateImagesResponse> {
    return this.s_geminiClient.models.generateImages({
      model: this.GOOGLE_MODEL_NAME,
      prompt: prompt,
    });
  }
}
