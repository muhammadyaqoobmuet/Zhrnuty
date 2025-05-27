// create a simple route to send heelo world on get req

export const GET = async () => {
  return new Response("Hello World from UploadThing API Route!");
};
