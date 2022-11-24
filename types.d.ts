declare module "unescape" {
  export default function unescape(
    str: string,
    options?: "default" | "extras" | "all"
  ): string
}
