/**
 * Wraps a body of text for an LLM with a surrounding HTML element.
 * @param text The text contained by the element
 * @param tag The HTML tag to use
 */
const wrapSection = (text: string, tag: string) => `<${tag}>${text}</${tag}>`

/**
 * A simple template for an LLM.
 * @param userPrompt The prompt for the user
 */
export const simpleTemplate = (userPrompt: string) => "You are an expert in API documentation. " +
  "You have been tasked with reading the given API documentation and returning a " +
  "JSON object that describes all the details that the user would need to carry out " +
  "the relevant queries they've requested." +
  "\n" +
  "\n" +
  wrapSection(userPrompt, "user-prompt");

