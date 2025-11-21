import { describe, it, expect } from "vitest";
import axios from "axios";

describe("Gemini API Integration", () => {
  it("should successfully call Gemini API with valid key", async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("VITE_GEMINI_API_KEY is not set");
    }

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: "Say 'Hello' in one word only.",
                },
              ],
            },
          ],
        },
        {
          params: {
            key: apiKey,
          },
        }
      );

      expect(response.status).toBe(200);
      expect(response.data.candidates).toBeDefined();
      expect(response.data.candidates[0].content.parts[0].text).toBeDefined();
      expect(response.data.candidates[0].content.parts[0].text.length).toBeGreaterThan(0);
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(
          "Invalid API key or malformed request. Please check your VITE_GEMINI_API_KEY."
        );
      }
      if (error.response?.status === 401) {
        throw new Error(
          "Unauthorized: API key is invalid or expired. Please get a new one from https://aistudio.google.com/app/apikeys"
        );
      }
      throw error;
    }
  });
});
