import groq from "groq";

export const routeMirrorByIdQuery = groq`
  *[_id == $id][0]{
    routePayloadJson
  }
`;
