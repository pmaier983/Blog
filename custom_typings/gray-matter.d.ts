import { Post } from "../components/pages/Post/post-typings"

declare module "gray-matter" {
  export default function someFunc(a: any): { data: Post; content: string }
}
