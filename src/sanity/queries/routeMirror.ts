import { groq } from "next-sanity";

export const routeMirrorByIdQuery = groq`
  *[_id == $id][0]{
    routePayloadJson
  }
`;
