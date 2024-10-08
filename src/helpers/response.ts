export default function toResponse(message: string, data?: any) {
  return {
    message,
    data: data,
  };
}
