import { Post } from "../components/pages/Blog/post-typings"

declare module "gray-matter" {
  export default function someFunc(a: any): { data: Post; content: any }
}
